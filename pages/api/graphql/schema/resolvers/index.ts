import { randomUUID } from 'crypto';
import {
  AdjustmentOrder,
  BinanceCredentialsInput,
  Resolvers,
} from '../../../../../graphql/generated';

const adjustmentOrders: Array<AdjustmentOrder & { credentials: BinanceCredentialsInput }> = [];

export const resolvers: Resolvers = {
  Query: {
    adjustmentOrders: (_, { credentials }) => {
      console.log(adjustmentOrders);
      return adjustmentOrders.filter(
        (order) => order.credentials.apiKey === credentials.apiKey && order.credentials.apiSecret
      );
    },
  },
  Mutation: {
    createdAdjustmentOrder: (_, { asset, quantity, maxSpreadRate, credentials }) => {
      const id = randomUUID();
      adjustmentOrders.push({ id, asset, quantity, maxSpreadRate, credentials });
      return { id, asset, quantity, maxSpreadRate };
    },
    canceledAdjustmentOrder: (_, { asset, credentials }) => {
      const adjustmentOrderIndex = adjustmentOrders.findIndex(
        (order) =>
          order.asset === asset &&
          order.credentials.apiKey === credentials.apiKey &&
          order.credentials.apiSecret === credentials.apiSecret
      );
      const adjustmentOrder = adjustmentOrders[adjustmentOrderIndex];
      adjustmentOrders.splice(adjustmentOrderIndex, 1);
      return adjustmentOrder;
    },
  },
};
