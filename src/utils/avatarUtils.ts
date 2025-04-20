
export const avatarImages = {
    'avatar-1': require('../img/avatar/avatar-1.jpg'),
    'avatar-2': require('../img/avatar/avatar-2.jpg'),
    'avatar-3': require('../img/avatar/avatar-3.jpg'),
    'avatar-4': require('../img/avatar/avatar-4.jpg'),
    'avatar-5': require('../img/avatar/avatar-5.jpg'),
    'avatar-6': require('../img/avatar/avatar-6.jpg'),
    'avatar-7': require('../img/avatar/avatar-7.jpg'),
    'avatar-8': require('../img/avatar/avatar-8.jpg'),
    'avatar-9': require('../img/avatar/avatar-9.jpg'),
  };
  
  export const getAvatarImage = (avatarKey: string) => avatarImages[avatarKey as keyof typeof avatarImages] || avatarImages['avatar-1']; // Fallback to 'avatar-1'
  