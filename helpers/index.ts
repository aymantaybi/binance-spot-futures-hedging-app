import { MainClient, USDMClient } from 'binance';

export * as inputValidation from './validation';

export function createBinanceClientsInstance(apiKey?: string, apiSecret?: string) {
  const spot = new MainClient({
    api_key: apiKey,
    api_secret: apiSecret,
  });
  const futures = new USDMClient({
    api_key: apiKey,
    api_secret: apiSecret,
  });
  return { spot, futures };
}
