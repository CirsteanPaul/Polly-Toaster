interface IContractData {
  totalSupply: number;
  maxSupply: number;
  paused: boolean;
  whitelistStatus: boolean;
  presaleStatus: boolean;
  presalePrice: string;
  publicPrice: string;
}
export default IContractData;
