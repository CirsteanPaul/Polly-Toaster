import ITier from './ITier';

interface IContractData {
  balance: number;
  saleStep: number;
  whitelist1: boolean;
  whitelist2: boolean;
  tier1: ITier;
  tier2: ITier;
  tier3: ITier;
}
export default IContractData;
