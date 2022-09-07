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
  currentPeriodValue: number;
  spliterContract: string;
  totalRoyalties: number;
  currentPeriodTime: string;
  contract: string;
  network: number;
  rootLink: string;
}
export default IConfig;
