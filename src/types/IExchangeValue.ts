interface Rates {
  rates: {
    USD: number;
  };
}
interface IExchangeValue {
  currency: string;
  data: Rates;
}
export default IExchangeValue;
