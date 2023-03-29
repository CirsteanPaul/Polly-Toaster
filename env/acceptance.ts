import IConfig from '../src/types/IConfig';
import { firebaseConfigAcceptance } from '../src/config/env';

const AcceptanceEnvironment: IConfig = {
  environment: 'acceptance',
  contract: '0x461fAEeb7ddbB78225e872e1dF179d48ea81cAf9',
  network: 4,
  rootLink: '',
  firebase: firebaseConfigAcceptance,
};
export default AcceptanceEnvironment;
