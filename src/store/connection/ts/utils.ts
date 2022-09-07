// eslint-disable-next-line import/no-extraneous-dependencies
import { Web3Provider } from '@ethersproject/providers';

export const toHex = (num: number | string) => {
  const val = Number(num);
  return `0x${val.toString(16)}`;
};

interface signProps {
  provider: Web3Provider;
  message: string;
  account: string;
}
interface verifySignProps {
  provider: Web3Provider;
  signedMessage: string;
  signature: string;
  account: string;
}
const signMessage = async (props: signProps) => {
  const { provider, message, account } = props;
  if (!provider) return;
  try {
    const signature: string = await provider.send('personal_sign', [message, account]);
  } catch (error) {
    console.error(error);
  }
};

const verifyMessage = async (props: verifySignProps) => {
  const { provider, signature, signedMessage, account } = props;
  if (!provider) return;
  try {
    const verify: string = await provider.send('personal_ecRecover', [signedMessage, signature]);
    console.log(verify === account.toLowerCase());
    return;
  } catch (error) {
    console.error(error);
  }
};
