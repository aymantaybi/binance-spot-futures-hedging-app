import { useState } from 'react';
import { Container, Grid } from '@mantine/core';
import {
  AdjustmentOrder,
  useGetAdjustmentOrdersLazyQuery,
  useCreateAdjustmentOrderMutation,
  useCancelAdjustmentOrderMutation,
} from '../graphql/generated';
import { CreateAdjustmentOrder } from '../features/CreateAdjustmentOrder/CreateAdjustmentOrder';
import { OpenAdjustmentOrders } from '../features/OpenAdjustmentOrders/OpenAdjustmentOrders';
import { BinanceCredentialsInputs } from '../features/BinanceCredentialsInputs/BinanceCredentialsInputs';

export default function HomePage() {
  const [binanceCredentials, setBinanceCredentials] = useState({ apiKey: '', apiSecret: '' });
  const [adjustmentOrders, setAdjustmentOrders] = useState<AdjustmentOrder[]>([]);

  const [getAdjustmentOrders] = useGetAdjustmentOrdersLazyQuery({
    onCompleted(data) {
      const { adjustmentOrders: orders } = data;
      if (!orders) return;
      setAdjustmentOrders(orders);
    },
  });
  const [createAdjustmentOrder] = useCreateAdjustmentOrderMutation({
    onCompleted(data) {
      const { createdAdjustmentOrder } = data;
      if (!createdAdjustmentOrder) return;
      setAdjustmentOrders((value) => [...value, createdAdjustmentOrder]);
    },
  });
  const [cancelAdjustmentOrder] = useCancelAdjustmentOrderMutation({
    onCompleted(data) {
      const { canceledAdjustmentOrder } = data;
      if (!canceledAdjustmentOrder) return;
      setAdjustmentOrders((value) =>
        value.filter((order) => order.id !== canceledAdjustmentOrder.id)
      );
    },
  });

  return (
    <Container size="xl" p="xl">
      <Grid>
       {/*  <Grid.Col md={3} sm={12}></Grid.Col> */}
        <Grid.Col md={9} sm={12}>
          <Grid>
            <Grid.Col md={8} sm={12}>
              <OpenAdjustmentOrders
                binanceCredentials={binanceCredentials}
                adjustmentOrders={adjustmentOrders}
                cancelAdjustmentOrder={cancelAdjustmentOrder}
              />
            </Grid.Col>
            <Grid.Col md={4} sm={12}>
              <Grid>
                <Grid.Col span={12}>
                  <BinanceCredentialsInputs
                    binanceCredentials={binanceCredentials}
                    setBinanceCredentials={setBinanceCredentials}
                    getAdjustmentOrders={getAdjustmentOrders}
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <CreateAdjustmentOrder
                    createAdjustmentOrder={createAdjustmentOrder}
                    binanceCredentials={binanceCredentials}
                  />
                </Grid.Col>
              </Grid>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
