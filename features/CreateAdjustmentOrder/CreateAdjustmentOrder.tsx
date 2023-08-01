import { MutationFunctionOptions, DefaultContext, FetchResult } from '@apollo/client';
import { Title, Stack, NumberInput, Button, Card, Select } from '@mantine/core';
import Decimal from 'decimal.js';
import { useState } from 'react';
import {
  CreateAdjustmentOrderMutation,
  Exact,
  BinanceCredentialsInput,
  useGetHedgeableAssetsQuery,
} from '../../graphql/generated';

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

export function CreateAdjustmentOrder(props: CreateAdjustmentOrderFormProps) {
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

  const canCreateAdjustmentOrder = asset !== undefined && quantity !== 0;

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
            disabled={!canCreateAdjustmentOrder}
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
