import React from 'react';
import {
  IonIcon,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonFabButton,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonViewWillEnter
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { useHistory } from "react-router";
import { get, set } from '../data/IonicStorage';
import { power } from 'ionicons/icons';

const Home: React.FC = () => {

  const [presentAlert] = useIonAlert();
  const history = useHistory();
  const checkLoged = async () => {

    const keyloged = await get("keyloged");
    console.log('Got value', keyloged);

    if (keyloged === null) {

      presentAlert({
        header: 'Alert',
        subHeader: 'Lo sentimos',
        message: 'Para continuar debes iniciar Sesión!',
        buttons: ['OK'],
      })
      await set("keyloged", "");

      history.push("/login");
      return
    }

  }

  useIonViewWillEnter(() => {
    console.log('ionViewWillEnter event fired');
    checkLoged();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Fracttal - Spa ID</IonTitle>
          <IonButtons slot="end">
            <IonFabButton color='danger' href="/login">
              <IonIcon icon={power}></IonIcon>
            </IonFabButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;