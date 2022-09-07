import IConfig from '../src/types/IConfig';
// import { firebaseConfigProduction } from '../src/env';

const ProductionEnvironment: IConfig = {
  environment: 'production',
  contract: '0xa8f79c6ab5183e9429bd05667d3e0d77caaea225',
  network: 1,
  spliterContract: '0x50B2c150bDA3bEF30373481C464a3a44215dc565',
  currentPeriodValue: 1000,
  totalRoyalties: 2000,
  currentPeriodTime: 'Oct. 1,2022',
  rootLink: '',
};
export default ProductionEnvironment;
