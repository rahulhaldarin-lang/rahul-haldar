export interface Profile {
  name: string;
  photoUrl: string;
  whatsapp: string;
  email: string;
  facebook: string;
  upiId: string;
}

export type ViewState = 'profile' | 'scan';

export interface ScanResult {
  data: string;
  timestamp: number;
}