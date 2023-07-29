import { BinanceCredentialsInput } from '../graphql/generated';

export function credentialsInput(credentials: BinanceCredentialsInput) {
  return Boolean(credentials.apiKey.length && credentials.apiSecret.length);
}
