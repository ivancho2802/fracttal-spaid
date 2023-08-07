

## definition

    this aplication is make with ionic capacitor and reactjs
    https://ionicframework.com/docs/react


## for begin select branch master

> git checkout master

> git pull origin master

## for init project react wth ionic 

> npm i --save

## for make init debug app react and see content in browser

> ionic serve
    * Open meaby in port 8100 [http://localhost:8100](http://localhost:8100) to view it in the browser.

## for make storage local i am use ionic storage

## for deploy in android make this command

> ionic cordova-res
> ionic cap sync android
> ionic cap build android

    * review android studio for config
    * set or install java 17 in android studio from configuration > tools

## for deploy ios

> ionic cordova-res
> ionic cap sync ios
> ionic cap build ios

    * from mac 
    * open project xcode latest from ROOT_FOLDER/ios/xcodeproject.xcode
    * make sugesstions for make correct config project xcode
    * set permission required before of compiler
    * open info.plist and config this permissions
    * iOS requires the following usage description be added and filled out for your app in Info.plist:

        Name: Privacy - Face ID Usage Description
        Key: NSFaceIDUsageDescription

        <config-file parent="NSCameraUsageDescription" platform="ios" target="*-Info.plist">
        <string>You can take photos</string>
        </config-file>
        inside of the <platform name='ios> section 


Do

Doing

Does
    • Crear una App SPA en Reacjts cuya autenticación de usuarios se realice con la herramienta
        nativa Face ID o FingerPrint del celular, 
    • La aplicación debe poder ser instalada en dispositivos móviles (android y iOS)
    * después de autenticado el usuario, la aplicación debe
        permitir adjuntar una fotografia desde la galería del celular o desde la cámara y previsualizar
        esta fotografía, con los recursos del dispositivo.

    • Crear un documento Readme que contenga sus comentarios que cree importante para
    el equipo que revisará tu trabajo
    • Debe tener claramente definida la estructura de carpetas y archivos.
    • El diseño de la app debe ser totalmente responsivo para distintas resoluciones
    Las tecnologías exigidas para esta aplicación es Reactjs, y puedes cualquier otra librería
    de Ionic, Cordova y React Native que te permitan lograr el objetivo
