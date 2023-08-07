import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.facttal.spa',
  appName: 'fracttal-spaid',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
