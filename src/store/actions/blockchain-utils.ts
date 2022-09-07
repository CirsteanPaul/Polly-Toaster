import IContractData from '../../types/IContractData';
import MintingPhase from '../../types/MintingPhase';
import IMintRequest from '../../types/requests/IMintRequests';

export const validateNftAction = (data: IMintRequest, contractData: IContractData): boolean => {
  switch (data.id) {
    case 1:
      return data.amount + contractData.tier1.supply + data.amount <= contractData.tier1.totalSupply;
    case 2:
      return data.amount + contractData.tier2.supply + data.amount <= contractData.tier2.totalSupply;
    case 3:
      return data.amount + contractData.tier3.supply + data.amount <= contractData.tier3.totalSupply;
    default:
      return false;
  }
};
export const validateMintingStep = (contractData: IContractData): string => {
  if (contractData.saleStep > 3 || contractData.saleStep <= 0) {
    return MintingPhase.Closed;
  }
  if (contractData.saleStep === 1 && !contractData.whitelist1) {
    return MintingPhase.Whitelsit1;
  }
  if (contractData.saleStep === 2 && !contractData.whitelist2) {
    return MintingPhase.Whitelsit1;
  }
  return MintingPhase.PublicSale;
};
