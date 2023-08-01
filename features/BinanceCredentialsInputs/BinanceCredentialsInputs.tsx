import { LazyQueryExecFunction } from '@apollo/client';
import { Title, Stack, PasswordInput, Button, Card } from '@mantine/core';
import { Dispatch, SetStateAction, ChangeEvent } from 'react';
import { GetAdjustmentOrdersQuery, Exact, BinanceCredentialsInput } from '../../graphql/generated';
import { inputValidation } from '../../helpers';

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

export function BinanceCredentialsInputs(props: BinanceCredentialsInputsProps) {
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
