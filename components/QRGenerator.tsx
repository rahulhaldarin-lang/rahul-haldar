import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Profile } from '../types';
import { generateVCard } from '../utils/vcard';
import { Share2, Download } from 'lucide-react';

interface QRGeneratorProps {
  profile: Profile;
}

const QRGenerator: React.FC<QRGeneratorProps> = ({ profile }) => {
  const vCardData = generateVCard(profile);

  const downloadQR = () => {
    const svg = document.getElementById("profile-qr");
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = "rahul_haldar_qr.png";
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      img.src = "data:image/svg+xml;base64," + btoa(svgData);
    }
  };

  const shareProfile = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Rahul Haldar Profile',
          text: 'Check out my digital profile!',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center gap-6 border border-slate-100">
      <div className="text-center">
        <h3 className="text-lg font-bold text-slate-800">Scan to Connect</h3>
        <p className="text-sm text-slate-500 mt-1">Use your camera to save my contact</p>
      </div>

      <div className="p-4 bg-white rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.05)] border border-slate-100">
        <QRCodeSVG
          id="profile-qr"
          value={vCardData}
          size={200}
          level="H"
          includeMargin={true}
          fgColor="#1e293b"
        />
      </div>

      <div className="flex gap-4 w-full">
        <button 
          onClick={shareProfile}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors"
        >
          <Share2 className="w-4 h-4" /> Share
        </button>
        <button 
          onClick={downloadQR}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors"
        >
          <Download className="w-4 h-4" /> Save
        </button>
      </div>
    </div>
  );
};

export default QRGenerator;