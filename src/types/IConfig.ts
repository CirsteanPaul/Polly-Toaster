export interface IFirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}
interface IConfig {
  environment: string;
  contract: string;
  network: number;
  rootLink: string;
  firebase: IFirebaseConfig;
}
export default IConfig;
