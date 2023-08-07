import React from 'react';
import { IonAvatar, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonFooter } from '@ionic/react';
import './LoginPage.css';
import { BiometricWrapper } from '@awesome-cordova-plugins/biometric-wrapper';
import { fingerPrintOutline, eye } from 'ionicons/icons';
import { set } from '../../data/IonicStorage';
import { useHistory } from "react-router";
import { NativeBiometric, BiometryType } from "capacitor-native-biometric";
import { FingerprintAIO } from '@awesome-cordova-plugins/fingerprint-aio';
import { Plugins, PluginResultError } from '@capacitor/core';
const { FaceId } = Plugins;
import { useState } from 'react';

const LoginPage: React.FC = () => {
  const history = useHistory();
  const [path, setPath] = useState(process.env.PUBLIC_URL + "/assets/icon/icon.png")

  const openBiometricIris = async () => {
    try {
      const data: any = await BiometricWrapper.activateIris({ 'PID_XML': '&lt;pid-xml/>' });
      console.log(`Barcode data: ${data.text}`);
      set("keyloged", data.text);
      history.push("/home");
      return
    } catch (error) {

      const result = await NativeBiometric.isAvailable();

      if (!result || !result.isAvailable) {
        alert("faceid no habilitado Intentando con otro metodo" + JSON.stringify(result));

        if(!FaceId?.isAvailable()){
          alert("Lo sentimos no hay autenticacion biometrica en este disposito ");
          
          history.push("/singup");

          return
        }

        // check if device supports Face ID or Touch ID
        const checkResult: any = await FaceId.isAvailable()

        if (checkResult.value) {
          FaceId.auth().then(() => {
            console.log('authenticated');
            set("keyloged", checkResult.value);
            history.push("/home");
          }).catch((error: PluginResultError) => {
            // handle rejection errors
            console.error(error.message);
            alert("Error auth" + JSON.stringify(error))
          });
        } else {
          // use custom fallback authentication here
          alert("No avalilable FaceId")
        }

        return
      }

      const isFaceID = result.biometryType == BiometryType.FACE_ID;

      if (!isFaceID) {
        alert("Face ID no disponible vamos a continuar con Login con Huella digital")
      }

      NativeBiometric.setCredentials({
        username: "username",
        password: "password",
        server: "www.example.com",
      }).then();

      const verified = await NativeBiometric.verifyIdentity({
        reason: "App Spa",
        title: "Log in",
        subtitle: "",
        description: "Esta accion e necesaria",
      })
        .then(() => true)
        .catch(() => false);

      if (!verified) {
        alert("El rostro no coincide intentalo otra vez")
        return
      }

      const credentials = await NativeBiometric.getCredentials({
        server: "www.example.com",
      });

      set("keyloged", JSON.stringify(credentials));
      history.push("/home");

    }




  };

  const openBiometricFinger = async () => {

    FingerprintAIO.isAvailable().then(() => {

      //alert("ngerprintAIO.isAvailab succes " + JSON.stringify(checkResult));

      FingerprintAIO.loadBiometricSecret({
        description: "Inicia sesion en la App",
        disableBackup: true, // always disabled on Android
      })
        .then((secret) => {
          //alert("registerBiometricSecret Authentication secret" + JSON.stringify(secret));
          set("keyloged", JSON.stringify(secret));
          history.push("/home");

        }, (error) => {
          alert("registerBiometricSecret Authentication error" + JSON.stringify(error));
        })

    }, (eeeecheckResult: any) => {

      let msg = '';
      const responseError = JSON.stringify(eeeecheckResult);

      if (responseError.includes("BIOMETRIC_NOT_ENROLLED")) {
        msg = 'Debes registrar tu huella digital en el equipo para continuar'
      } else if (responseError.includes("BIOMETRIC_UNAVAILABLE")) {
        msg = 'Debes habilitr tu huella digital en el equipo para continuar esta desactivo'
      } else if (responseError.includes("BIOMETRIC_AUTHENTICATION_FAILED")) {
        msg = 'Fallo la autenticacion tal vez tu huella no esta registrada en el equipo'
      } else if (responseError.includes("BIOMETRIC_SDK_NOT_SUPPORTED")) {
        msg = 'Tal vez este equipo no soporta lector de huella para esta app contacte soporte'
      } else if (responseError.includes("BIOMETRIC_HARDWARE_NOT_SUPPORTED")) {
        msg = 'Tal vez este equipo no soporta lector de huella '
      } else if (responseError.includes("BIOMETRIC_INTERNAL_PLUGIN_ERROR")) {
        msg = 'Hubo un error en la aplicacion contacte soporte '
      } else if (responseError.includes("BIOMETRIC_DISMISSED") || responseError.includes("BIOMETRIC_PIN_OR_PATTERN_DISMISSED")) {
        msg = 'Operacion cancelada por el usuario '
      } else if (responseError.includes("BIOMETRIC_SECRET_NOT_FOUND")) {
        msg = 'No coincide los datos de acceso con el registro guardado en la app contacte soporte '
      } else {
        msg = 'No definido ' + responseError
      }

      alert("Lo sentimos hubo un error debido a " + msg);
    });


  };

  const openBiometricFingerRegister = async () => {

    FingerprintAIO.isAvailable().then((checkResult: any) => {

      alert("ngerprintAIO.isAvailab succes " + JSON.stringify(checkResult));

      FingerprintAIO.registerBiometricSecret({
        description: "Some biometric description",
        secret: "my-super-secret",
        invalidateOnEnrollment: true,
        disableBackup: true, // always disabled on Android
      }).then((response) => {
        alert("registerBiometricSecret Authentication successful" + JSON.stringify(response));

        set("keyloged", JSON.stringify(response));
        history.push("/home");

      }, (eerrr) => {
        alert("registerBiometricSecret Authentication eerrr" + JSON.stringify(eerrr));

      });

    }, (eeeecheckResult) => {

      let msg = '';
      const responseError = JSON.stringify(eeeecheckResult);

      if (responseError.includes("BIOMETRIC_NOT_ENROLLED")) {
        msg = 'Debes registrar tu huella digital en el equipo para continuar'
      } else if (responseError.includes("BIOMETRIC_UNAVAILABLE")) {
        msg = 'Debes habilitr tu huella digital en el equipo para continuar esta desactivo'
      } else if (responseError.includes("BIOMETRIC_AUTHENTICATION_FAILED")) {
        msg = 'Fallo la autenticacion tal vez tu huella no esta registrada en el equipo'
      } else if (responseError.includes("BIOMETRIC_SDK_NOT_SUPPORTED")) {
        msg = 'Tal vez este equipo no soporta lector de huella para esta app contacte soporte'
      } else if (responseError.includes("BIOMETRIC_HARDWARE_NOT_SUPPORTED")) {
        msg = 'Tal vez este equipo no soporta lector de huella '
      } else if (responseError.includes("BIOMETRIC_INTERNAL_PLUGIN_ERROR")) {
        msg = 'Hubo un error en la aplicacion contacte soporte '
      } else if (responseError.includes("BIOMETRIC_DISMISSED") || responseError.includes("BIOMETRIC_PIN_OR_PATTERN_DISMISSED")) {
        msg = 'Operacion cancelada por el usuario '
      } else if (responseError.includes("BIOMETRIC_SECRET_NOT_FOUND")) {
        msg = 'No coincide los datos de acceso con el registro guardado en la app contacte soporte '
      } else {
        msg = 'No definido ' + responseError
      }

      alert("Lo sentimos hubo un error debido a " + msg);
    });

  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Fracttal - Spa ID - Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Login</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className='ion-text-center ion-justify-content-center'>
          <IonAvatar className='fracttal-avatar d-inline-block d-print-inline-block'>
            <img alt="Silhouette of a person's head" src={path} />
          </IonAvatar>

        </div>
      </IonContent>

      <IonFooter className='ion-text-center'>
        <section>
          <IonButton color="primary" onClick={openBiometricIris}>
            Log In FaceId
            <IonIcon icon={eye}></IonIcon>
          </IonButton>
        </section>
        <section>

          <IonButton color="warning" onClick={openBiometricFinger}>
            Log In Huellas
            <IonIcon icon={fingerPrintOutline}></IonIcon>
          </IonButton>

          <IonButton color="warning" onClick={openBiometricFingerRegister}>
            Log Up Huellas
            <IonIcon icon={fingerPrintOutline}></IonIcon>
          </IonButton>

        </section>
      </IonFooter>
    </IonPage>
  );
};

export default LoginPage;
