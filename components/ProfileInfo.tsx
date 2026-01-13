import React from 'react';
import { Profile } from '../types';

interface ProfileInfoProps {
  profile: Profile;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ profile }) => {
  return (
    <div className="flex flex-col items-center justify-center -mt-16 mb-6">
      <div className="relative">
        <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-slate-200">
          <img 
            src={profile.photoUrl} 
            alt={profile.name} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <div className="text-center mt-5 px-6">
        <h1 className="text-3xl text-slate-900 font-['Playfair_Display'] font-bold tracking-normal leading-tight">
          {profile.name}
        </h1>
        <div className="w-12 h-1 bg-blue-600 mx-auto my-3 rounded-full opacity-80"></div>
        <p className="text-slate-600 font-medium text-sm italic leading-relaxed">
          "A person who believes in himself cannot be stopped by any force in the world"
        </p>
      </div>
    </div>
  );
};

export default ProfileInfo;