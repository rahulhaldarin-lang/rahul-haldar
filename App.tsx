import React, { useState } from 'react';
import { Profile } from './types';
import ProfileInfo from './components/ProfileInfo';
import ActionButtons from './components/ActionButtons';
import QRGenerator from './components/QRGenerator';
import QRScanner from './components/QRScanner';
import { ScanLine } from 'lucide-react';

const DEFAULT_PROFILE: Profile = {
  name: "Rahul Haldar",
  // Using the specific profile image provided
  photoUrl: "https://i.postimg.cc/7Y2CPn04/20251226-112414.jpg",
  whatsapp: "+91 93325 78394",
  email: "rahulhaldar.In@gmail.com",
  facebook: "https://www.facebook.com/share/1Euw8pyUbF/",
  upiId: "rahulhaldar189941@ybl"
};

function App() {
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [showScanner, setShowScanner] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);

  const handleScan = (data: string) => {
    setScannedData(data);
    setShowScanner(false);
    // In a real app, we might parse this data or add it to contacts
    // For now, we'll just show it in an alert or modal
  };

  return (
    <div className="min-h-screen bg-slate-50 relative">
      {/* Background decoration */}
      <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-700 w-full absolute top-0 left-0 rounded-b-[2.5rem] shadow-lg" />

      <main className="relative z-10 max-w-md mx-auto min-h-screen flex flex-col pt-20 px-4 pb-8">
        
        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-100 p-6 mb-6">
          <ProfileInfo profile={profile} />
          <ActionButtons profile={profile} />
        </div>

        {/* QR Section */}
        <div className="mb-6">
          <QRGenerator profile={profile} />
        </div>

        {/* Floating Scan Button (Sticky) */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20">
          <button
            onClick={() => setShowScanner(true)}
            className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-xl hover:bg-slate-800 hover:scale-105 transition-all active:scale-95 font-semibold"
          >
            <ScanLine className="w-5 h-5" />
            <span>Scan QR</span>
          </button>
        </div>

        {/* Scanner Modal */}
        {showScanner && (
          <QRScanner 
            onScan={handleScan} 
            onClose={() => setShowScanner(false)} 
          />
        )}

        {/* Scanned Result Modal */}
        {scannedData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl scale-100 opacity-100">
              <h3 className="text-xl font-bold mb-4 text-slate-800">Scanned Result</h3>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 mb-6 max-h-60 overflow-y-auto break-words font-mono text-sm text-slate-600">
                {scannedData}
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setScannedData(null)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"
                >
                  Close
                </button>
                <button 
                  onClick={() => {
                    if (scannedData.startsWith('http')) {
                      window.open(scannedData, '_blank');
                    } else {
                      navigator.clipboard.writeText(scannedData);
                      alert('Copied to clipboard!');
                    }
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-medium"
                >
                  {scannedData.startsWith('http') ? 'Open Link' : 'Copy Text'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <footer className="text-center pb-24 text-slate-400 text-sm">
        © {new Date().getFullYear()} Rahul Haldar. All rights reserved.
      </footer>
    </div>
  );
}

export default App;