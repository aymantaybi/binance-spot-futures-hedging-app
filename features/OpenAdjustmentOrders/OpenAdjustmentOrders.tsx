import { MutationFunctionOptions, DefaultContext, FetchResult } from '@apollo/client';
import { Button, Card, Table, Title } from '@mantine/core';
import {
  AdjustmentOrder,
  CancelAdjustmentOrderMutation,
  Exact,
  BinanceCredentialsInput,
} from '../../graphql/generated';

interface OpenAdjustmentOrdersProps {
  binanceCredentials: { apiKey: string; apiSecret: string };
  adjustmentOrders: AdjustmentOrder[];
  cancelAdjustmentOrder: (
    options?:
      | MutationFunctionOptions<
          CancelAdjustmentOrderMutation,
          Exact<{
            asset: string;
            credentials: BinanceCredentialsInput;
          }>,
          DefaultContext
        >
      | undefined
  ) => Promise<FetchResult<CancelAdjustmentOrderMutation>>;
}

export function OpenAdjustmentOrders(props: OpenAdjustmentOrdersProps) {
  const { binanceCredentials, adjustmentOrders, cancelAdjustmentOrder } = props;

  const rows = adjustmentOrders.map((element) => (
    <tr key={element.asset}>
      <td>{element.asset}</td>
      <td>{element.quantity}</td>
      <td>{element.maxSpreadRate}</td>
      <td>
        <Button
          size="xs"
          variant="subtle"
          color="red"
          onClick={() => {
            cancelAdjustmentOrder({
              variables: { asset: element.asset, credentials: binanceCredentials },
            });
          }}
        >
          Cancel
        </Button>
      </td>
    </tr>
  ));

  return (
    <>
      <Title mb={5} order={5}>
        Open Adjustment Orders
      </Title>
      <Card mih="90vh" shadow="sm" padding="md" radius="md" withBorder>
        <Table>
          <thead>
            <tr>
              <th>Asset</th>
              <th>Quantity</th>
              <th>Max Spread Rate</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Card>
    </>
  );
}
