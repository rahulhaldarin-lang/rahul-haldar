import React, { useState } from 'react';
import { MessageCircle, Mail, Facebook, IndianRupee, Copy, Check } from 'lucide-react';
import { Profile } from '../types';
import { copyToClipboard } from '../utils/vcard';

interface ActionButtonsProps {
  profile: Profile;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ profile }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyUPI = async () => {
    const success = await copyToClipboard(profile.upiId);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatPhoneNumber = (phone: string) => {
    // Remove spaces and special chars for the link
    return phone.replace(/[^0-9]/g, '');
  };

  return (
    <div className="w-full space-y-6">
      {/* Primary Actions Grid */}
      <div className="grid grid-cols-2 gap-4">
        <a 
          href={`https://wa.me/${formatPhoneNumber(profile.whatsapp)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 bg-green-50 text-green-700 rounded-2xl hover:bg-green-100 transition-colors border border-green-100"
        >
          <div className="bg-green-500 text-white p-2 rounded-lg">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium opacity-70">WhatsApp</span>
            <span className="text-sm font-bold">Message</span>
          </div>
        </a>

        <a 
          href={`mailto:${profile.email}`}
          className="flex items-center gap-3 p-4 bg-blue-50 text-blue-700 rounded-2xl hover:bg-blue-100 transition-colors border border-blue-100"
        >
          <div className="bg-blue-500 text-white p-2 rounded-lg">
            <Mail className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium opacity-70">Email</span>
            <span className="text-sm font-bold">Send Mail</span>
          </div>
        </a>

        <a 
          href={profile.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 bg-indigo-50 text-indigo-700 rounded-2xl hover:bg-indigo-100 transition-colors border border-indigo-100"
        >
          <div className="bg-indigo-600 text-white p-2 rounded-lg">
            <Facebook className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium opacity-70">Facebook</span>
            <span className="text-sm font-bold">Connect</span>
          </div>
        </a>

        <button 
           onClick={() => window.location.href = `upi://pay?pa=${profile.upiId}&pn=${encodeURIComponent(profile.name)}`}
           className="flex items-center gap-3 p-4 bg-orange-50 text-orange-700 rounded-2xl hover:bg-orange-100 transition-colors border border-orange-100 text-left"
        >
           <div className="bg-orange-500 text-white p-2 rounded-lg">
            <IndianRupee className="w-5 h-5" />
          </div>
           <div className="flex flex-col">
            <span className="text-xs font-medium opacity-70">Pay</span>
            <span className="text-sm font-bold">Via UPI</span>
          </div>
        </button>
      </div>

      {/* UPI Copy Section */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">UPI ID</span>
          {copied && <span className="text-xs font-medium text-green-600 flex items-center gap-1"><Check className="w-3 h-3"/> Copied</span>}
        </div>
        <div className="flex items-center justify-between gap-2">
          <code className="text-slate-700 font-mono text-sm break-all">{profile.upiId}</code>
          <button 
            onClick={handleCopyUPI}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-700 transition-colors"
            title="Copy UPI ID"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionButtons;