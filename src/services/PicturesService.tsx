import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Chooser } from '@awesome-cordova-plugins/chooser';

export function usePhotoGallery() {
  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
    return photo
  };

  const takeFile = async () => {
    
    const photo:any = await Chooser.getFile();
    return {webPath: photo.dataURI}
  };

  return {
    takePhoto,
    takeFile
  };
}