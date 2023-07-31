import { FuturesSymbolExchangeInfo, SymbolExchangeInfo, SymbolLotSizeFilter } from 'binance';
import Decimal from 'decimal.js';
import { createBinanceClientsInstance } from '.';
import { HedgeableAsset } from '../graphql/generated';

export class ExchangeFetcher {
  private static hedgeableAssets: HedgeableAsset[] = [];

  static getStepSize(symbol: { futures: FuturesSymbolExchangeInfo; spot: SymbolExchangeInfo }) {
    const { stepSize: futuresStepSize } = (symbol.futures.filters.find(
      (filter) => filter.filterType === 'LOT_SIZE'
    ) as SymbolLotSizeFilter) || { stepSize: 1 };
    const { stepSize: spotStepSize } = (symbol.spot.filters.find(
      (filter) => filter.filterType === 'LOT_SIZE'
    ) as SymbolLotSizeFilter) || { stepSize: 1 };
    return Decimal.max(futuresStepSize, spotStepSize).toNumber();
  }

  static async getHedgeableAssets() {
    if (this.hedgeableAssets.length) {
      return this.hedgeableAssets;
    }
    const clients = createBinanceClientsInstance();
    const [futuresExchangeInfo, spotExchangeInfo] = await Promise.all([
      clients.futures.getExchangeInfo(),
      clients.spot.getExchangeInfo(),
    ]);
    const spotExchangeSymbolsMap = new Map<string, SymbolExchangeInfo>();
    spotExchangeInfo.symbols.forEach((symbol) => {
      const { baseAsset, quoteAsset } = symbol;
      spotExchangeSymbolsMap.set(`${baseAsset}/${quoteAsset}`, symbol);
    });
    const assets = futuresExchangeInfo.symbols
      .filter(
        ({ baseAsset, quoteAsset, contractType }) =>
          contractType === 'PERPETUAL' &&
          quoteAsset === 'USDT' &&
          spotExchangeSymbolsMap.get(`${baseAsset}/${quoteAsset}`)
      )
      .map((symbol) => {
        const { baseAsset, quoteAsset } = symbol;
        const spotExchangeSymbol = spotExchangeSymbolsMap.get(
          `${baseAsset}/${quoteAsset}`
        ) as SymbolExchangeInfo;
        const stepSize = this.getStepSize({ spot: spotExchangeSymbol, futures: symbol });
        return { asset: baseAsset, symbol: symbol.symbol, stepSize };
      });
    this.hedgeableAssets = assets;
    return assets;
  }
}
