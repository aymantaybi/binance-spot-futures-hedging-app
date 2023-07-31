import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import {
  Button,
  Card,
  Container,
  Grid,
  PasswordInput,
  Stack,
  Title,
  Table,
  NumberInput,
  Select,
} from '@mantine/core';
import {
  DefaultContext,
  FetchResult,
  LazyQueryExecFunction,
  MutationFunctionOptions,
} from '@apollo/client';
import Decimal from 'decimal.js';
import { inputValidation } from '../helpers';
import {
  AdjustmentOrder,
  BinanceCredentialsInput,
  Exact,
  GetAdjustmentOrdersQuery,
  useGetAdjustmentOrdersLazyQuery,
  useCreateAdjustmentOrderMutation,
  CreateAdjustmentOrderMutation,
  useCancelAdjustmentOrderMutation,
  CancelAdjustmentOrderMutation,
  useGetHedgeableAssetsQuery,
} from '../graphql/generated';

interface CreateAdjustmentOrderFormProps {
  binanceCredentials: {
    apiKey: string;
    apiSecret: string;
  };
  createAdjustmentOrder: (
    options?:
      | MutationFunctionOptions<
          CreateAdjustmentOrderMutation,
          Exact<{
            asset: string;
            maxSpreadRate: number;
            quantity: number;
            credentials: BinanceCredentialsInput;
          }>,
          DefaultContext
        >
      | undefined
  ) => Promise<FetchResult<CreateAdjustmentOrderMutation>>;
}

function CreateAdjustmentOrderForm(props: CreateAdjustmentOrderFormProps) {
  const { binanceCredentials, createAdjustmentOrder } = props;
  const [asset, setAsset] = useState<string | undefined>();
  const [quantity, setQuantity] = useState(0);
  const [maxSpreadRate, setMaxSpreadRate] = useState(0);

  const handleAssetChange = (value: string) => setAsset(value);
  const handleQuantityChange = (value: number | '') => setQuantity(Number(value));
  const handleMaxSpreadRateChange = (value: number | '') => setMaxSpreadRate(Number(value));

  const resetInputs = () => {
    setAsset(undefined);
    setQuantity(0);
    setMaxSpreadRate(0);
  };

  const { data } = useGetHedgeableAssetsQuery();

  const items = data
    ? data.hedgeableAssets.map((item) => ({ value: item.asset, label: item.asset }))
    : [];

  const { stepSize } = (data?.hedgeableAssets || []).find((item) => item.asset === asset) || {
    stepSize: 1,
  };

  const precision = new Decimal(stepSize).decimalPlaces();

  return (
    <>
      <Title mb={5} order={5}>
        Create Adjustment Order
      </Title>
      <Card shadow="sm" padding="md" radius="md" withBorder>
        <Stack align="stretch" spacing="xs">
          <Select
            label="Asset"
            size="xs"
            value={asset}
            withAsterisk
            onChange={handleAssetChange}
            data={items}
            searchable
            nothingFound="No options"
          />
          <NumberInput
            label="Quantity"
            size="xs"
            withAsterisk
            value={quantity}
            precision={precision}
            step={stepSize}
            onChange={handleQuantityChange}
          />
          <NumberInput
            label="Max Spread Rate"
            size="xs"
            withAsterisk
            value={maxSpreadRate}
            step={0.01}
            precision={2}
            onChange={handleMaxSpreadRateChange}
          />
          <Button
            disabled={asset === undefined}
            size="xs"
            maw={100}
            sx={{ alignSelf: 'center' }}
            onClick={() => {
              if (!asset) return;
              createAdjustmentOrder({
                variables: {
                  asset,
                  quantity,
                  maxSpreadRate,
                  credentials: binanceCredentials,
                },
              }).then(resetInputs);
            }}
          >
            Create
          </Button>
        </Stack>
      </Card>
    </>
  );
}

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

function OpenAdjustmentOrders(props: OpenAdjustmentOrdersProps) {
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

interface BinanceCredentialsInputsProps {
  binanceCredentials: {
    apiKey: string;
    apiSecret: string;
  };
  setBinanceCredentials: Dispatch<
    SetStateAction<{
      apiKey: string;
      apiSecret: string;
    }>
  >;
  getAdjustmentOrders: LazyQueryExecFunction<
    GetAdjustmentOrdersQuery,
    Exact<{
      credentials: BinanceCredentialsInput;
    }>
  >;
}

function BinanceCredentialsInputs(props: BinanceCredentialsInputsProps) {
  const { binanceCredentials, setBinanceCredentials, getAdjustmentOrders } = props;

  const makeBinanceCredentialsChangeHandler =
    (key: keyof typeof binanceCredentials) => (event: ChangeEvent<HTMLInputElement>) =>
      setBinanceCredentials((value) => ({ ...value, [key]: event.target.value }));

  return (
    <>
      <Title mb={5} order={5}>
        Credentials
      </Title>
      <Card shadow="sm" padding="md" radius="md" withBorder>
        <Stack align="stretch" spacing="xs">
          <PasswordInput
            size="xs"
            placeholder="API key"
            label="API key"
            withAsterisk
            value={binanceCredentials.apiKey}
            onChange={makeBinanceCredentialsChangeHandler('apiKey')}
          />
          <PasswordInput
            size="xs"
            placeholder="API secret"
            label="API secret"
            withAsterisk
            value={binanceCredentials.apiSecret}
            onChange={makeBinanceCredentialsChangeHandler('apiSecret')}
          />
          <Button
            disabled={!inputValidation.credentialsInput(binanceCredentials)}
            size="xs"
            maw={100}
            sx={{ alignSelf: 'center' }}
            onClick={() => {
              getAdjustmentOrders({
                variables: { credentials: binanceCredentials },
                fetchPolicy: 'no-cache',
              });
            }}
          >
            Check
          </Button>
        </Stack>
      </Card>
    </>
  );
}

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
    <>
      <Container p="xl">
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
                <CreateAdjustmentOrderForm
                  createAdjustmentOrder={createAdjustmentOrder}
                  binanceCredentials={binanceCredentials}
                />
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
}
