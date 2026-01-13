import { Profile } from '../types';

export const generateVCard = (profile: Profile): string => {
  return `BEGIN:VCARD
VERSION:3.0
FN:${profile.name}
TEL;TYPE=CELL:${profile.whatsapp}
EMAIL:${profile.email}
URL:${profile.facebook}
NOTE:UPI: ${profile.upiId}
END:VCARD`;
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
};