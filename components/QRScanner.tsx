import React, { useEffect, useRef, useState, useCallback } from 'react';
import jsQR from 'jsqr';
import { Camera, XCircle, AlertCircle } from 'lucide-react';

interface QRScannerProps {
  onScan: (data: string) => void;
  onClose: () => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScan, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [scanning, setScanning] = useState(true);
  const animationFrameRef = useRef<number>();

  const scanFrame = useCallback(() => {
    if (!scanning || !videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (video.readyState === video.HAVE_ENOUGH_DATA && ctx) {
      canvas.height = video.videoHeight;
      canvas.width = video.videoWidth;
      
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });

      if (code) {
        setScanning(false);
        onScan(code.data);
        return; // Stop scanning
      }
    }
    
    animationFrameRef.current = requestAnimationFrame(scanFrame);
  }, [scanning, onScan]);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          // Required for iOS to play video inline
          videoRef.current.setAttribute("playsinline", "true");
          videoRef.current.play();
          animationFrameRef.current = requestAnimationFrame(scanFrame);
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setError("Unable to access camera. Please ensure you have granted permission.");
      }
    };

    startCamera();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [scanFrame]);

  return (
    <div className="fixed inset-0 z-50 bg-black text-white flex flex-col">
      <div className="flex justify-between items-center p-4 bg-black/50 backdrop-blur-sm absolute top-0 w-full z-10">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Camera className="w-5 h-5" /> Scan QR Code
        </h2>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <XCircle className="w-8 h-8 text-white" />
        </button>
      </div>

      <div className="flex-1 relative flex items-center justify-center bg-black">
        {error ? (
          <div className="text-center p-6 text-red-400">
            <AlertCircle className="w-12 h-12 mx-auto mb-4" />
            <p>{error}</p>
          </div>
        ) : (
          <>
            <video 
              ref={videoRef} 
              className="absolute inset-0 w-full h-full object-cover" 
              playsInline 
              muted
            />
            <canvas ref={canvasRef} className="hidden" />
            
            {/* Scan Overlay UI */}
            <div className="relative w-64 h-64 border-2 border-white/50 rounded-lg overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-green-500 shadow-[0_0_10px_#22c55e] animate-[scan_2s_ease-in-out_infinite]" />
               <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-green-500 rounded-tl-lg" />
               <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-green-500 rounded-tr-lg" />
               <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-green-500 rounded-bl-lg" />
               <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-green-500 rounded-br-lg" />
            </div>
            
            <p className="absolute bottom-20 text-center text-white/80 text-sm px-4">
              Point your camera at a QR code to scan instantly.
            </p>
          </>
        )}
      </div>
      
      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(250px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default QRScanner;