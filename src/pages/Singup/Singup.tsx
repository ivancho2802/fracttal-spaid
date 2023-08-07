import React from 'react';
import {
  IonAvatar,
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonRow,
  IonCol,
  IonInput,
  IonButtons,
  IonBackButton
} from '@ionic/react';
import './Singup.css';
import { send } from 'ionicons/icons';
import { set } from '../../data/IonicStorage';
import { useHistory } from "react-router";
import { useState } from 'react';

interface FormState {
  username?: string
  password?: string
}

const SingupPage: React.FC = () => {
  const history = useHistory();
  const [path, setPath] = useState(process.env.PUBLIC_URL + "/assets/icon/icon.png")

  const [inputValues, setInputValues] = useState<FormState>({
    username: '',
    password: ''
  })

  const validSesion = async () => {
    set("keyloged", JSON.stringify(inputValues));
    history.push("/home");
    return
  };

  const handeChange = (e: Event) => {
    const value = (e.target as HTMLIonInputElement).value as string;
    const name = (e.target as HTMLIonInputElement).name as string;

    setInputValues({
      ...inputValues,
      [name]: value
    })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Fracttal - Spa ID - Sing Up</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Sing Up</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className='ion-text-center ion-justify-content-center'>
          <IonAvatar className='fracttal-avatar d-inline-block d-print-inline-block'>
            <img alt="Silhouette of a person's head" src={path} />
          </IonAvatar>
        </div>

        <form onSubmit={validSesion} className="needs-validation" >
          <h4 className="ion-margin-buttom ion-text-center">Registro</h4>

          <IonRow className=''>
            <IonCol>
              <IonInput
                className="form-control"
                name="username"
                placeholder="username"
                type="text"
                value={inputValues.username}
                onIonInput={handeChange}
              />

              <IonInput
                className="form-control"
                name="password"
                placeholder="password"
                type="password"
                value={inputValues.password}
                onIonInput={handeChange}
              />
            </IonCol>
          </IonRow>

          <IonRow className='ion-text-center'>
            <IonCol>
              <IonButton color="primary"  type="submit">
                Sing Up
                <IonIcon icon={send}></IonIcon>
              </IonButton>
            </IonCol>
          </IonRow>

        </form>

      </IonContent>
    </IonPage>
  );
};

export default SingupPage;
