import IConfig from '../src/types/IConfig';
// import { firebaseConfigDevelop } from '../src/env';

const AcceptanceEnvironment: IConfig = {
  environment: 'acceptance',
  contract: '0xA1Feb625e6d48b66519236f7183cbBb55A969528',
  network: 3,
  currentPeriodValue: 1000,
  totalRoyalties: 200000,
  spliterContract: '0xB094cce8dBC669381155bc2dA93b7B6d23A22135',
  currentPeriodTime: 'Oct. 1,2022',
  rootLink: '',
};
export default AcceptanceEnvironment;
