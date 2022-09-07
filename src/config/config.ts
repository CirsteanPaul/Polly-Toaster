import IConfig from '../types/IConfig';
import Environment from './environment';

const Config: IConfig = Environment;
export const isDevelopmentMode = (): boolean => {
  return Config.environment === 'acceptance' || Config.environment === 'testing;';
};

export default Config;
