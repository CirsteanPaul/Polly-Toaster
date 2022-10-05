/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import { Web3Provider } from '@ethersproject/providers';
import { switchNetwork } from './switchNetwork';
import { networkId, networkName } from './config';
import { MetamaskData } from './contants';
import alertService from '../../../services/alert-handler';
import { abi, contractAddress } from './contract';

const getProvider = async () => {
  const prov: any = await detectEthereumProvider();
  return prov;
};
const handleEthereum = async () => {
  const { ethereum } = window;
  if (!(ethereum && ethereum.isMetaMask)) {
    alertService.noMetamaskPopup();
  }
};
const tryToConnect = async () => {
  let provider: Web3Provider | null;
  try {
    provider = await getProvider();
  } catch {
    window.addEventListener('ethereum#initialized', handleEthereum, {
      once: true,
    });
    provider = null;
  } finally {
    handleEthereum();
  }
  return provider;
};
const getContract = (provider: ethers.providers.Web3Provider, account: string): ethers.Contract => {
  const acc = provider.getSigner(account);
  const contract = new ethers.Contract(contractAddress, abi, acc);
  contract.connect(acc);
  return contract;
};
export const onClickDisconnect = (): MetamaskData | null => {
  localStorage.setItem('account', '');
  return null;
};
const addListeners = () => {
  // eslint-disable-next-line prefer-destructuring
  const ethereum: any = window.ethereum;
  const provider = new ethers.providers.Web3Provider(ethereum, 'any');
  ethereum.on('accountsChanged', () => {
    onClickDisconnect();
    window.location.reload();
  });
  provider.on('network', (newNetwork: any, oldNetwork: any) => {
    if (oldNetwork) {
      onClickDisconnect();
      window.location.reload();
    }
  });
};
const connectAccount = async (currentAccount: string): Promise<MetamaskData | null> => {
  let balance: number;
  let chainId: number;
  let spliterContract;
  let chainName: string;
  let balanceContract;
  const { ethereum } = window;
  if (!ethereum) return null;
  let provider = new ethers.providers.Web3Provider(ethereum);
  try {
    const response = await provider.getNetwork();
    if (response.chainId !== networkId) {
      await switchNetwork({ provider, network: networkId });
    }
    provider = new ethers.providers.Web3Provider(ethereum);

    chainId = networkId;
    chainName = networkName;
    const result = await provider.getBalance(currentAccount);
    balance = parseInt(result._hex, 16);
    balanceContract = getContract(provider, currentAccount);
    addListeners();
  } catch (e) {
    console.log(e);
    alertService.somethingWentWrongPopup(networkName);
    return null;
  }
  return { currentAccount, balance, chainId, chainName, provider, balanceContract };
};
export const onClickConnect = async (currentAccount: string): Promise<MetamaskData | null> => {
  const provider: any = await tryToConnect();
  if (!provider) return null;
  window.removeEventListener('ethereum#initialized', handleEthereum);
  if (!currentAccount) {
    try {
      const { result } = await provider.send('eth_requestAccounts', []);
      if (result.length > 0) {
        // eslint-disable-next-line prefer-destructuring
        currentAccount = result[0];
        localStorage.setItem('account', result[0]);
      }
    } catch (e: any) {
      console.log(e);
    }
  }
  const props = await connectAccount(currentAccount);
  return props;
};
export const persistConnection = async () => {
  const localAcc: string | null = localStorage.getItem('account');
  if (localAcc) {
    return onClickConnect(localAcc);
  }
  return null;
};
