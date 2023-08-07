import React from 'react';
import './ExploreContainer.css';
import { camera, folderOutline} from 'ionicons/icons';
import {
  IonAvatar,
  IonFabButton,
  IonIcon,
} from '@ionic/react';

import {
  usePhotoGallery
} from '../services/PicturesService';
import { useState } from 'react';

const ExploreContainer: React.FC = () => {

  const [path, setPath] = useState(process.env.PUBLIC_URL + "/assets/images/shapes.svg")

  async function takePhoto() {

    try {
      usePhotoGallery().takePhoto()
        .then((res: any) => {
          console.log("res", res)
          setPath(res.webPath)
        })

    } catch (error) {
      alert(JSON.stringify(error))
    }

  }

  async function takeFile() {
    
    try {
      usePhotoGallery().takeFile()
        .then((res: any) => {
          console.log("res", res)
          setPath(res.webPath)
        })

    } catch (error) {
      alert(JSON.stringify(error))
    }
  }

  return (
    <div id="container" className="ion-text-center ion-justify-content-center">
      <div className='d-inline-block d-print-inline-block'>

        <IonAvatar className='fracttal-avatar'>
          <img alt="Silhouette of a person's head" src={path} />
        </IonAvatar>
        <IonFabButton onClick={() => takePhoto()}>
          <IonIcon icon={camera}></IonIcon>
        </IonFabButton>
        
        <IonFabButton onClick={() => takeFile()}>
          <IonIcon icon={folderOutline}></IonIcon>
        </IonFabButton>

      </div>

      <p>Name: { } Lastname: { }</p>
    </div>
  );
};

export default ExploreContainer;
