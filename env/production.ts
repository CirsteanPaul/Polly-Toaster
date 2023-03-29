import IConfig from '../src/types/IConfig';
import { firebaseConfigProduction } from '../src/config/env';

const ProductionEnvironment: IConfig = {
  environment: 'production',
  contract: '0x8E4Fd04e5201c8E29F5A9AfB3bbA27e327CD1196',
  network: 1,
  rootLink: '',
  firebase: firebaseConfigProduction,
};
export default ProductionEnvironment;
