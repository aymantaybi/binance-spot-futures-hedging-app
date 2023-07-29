import { useEffect, useMemo, useState } from 'react';
import { PasswordInput } from '@mantine/core';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { useGetAdjustmentOrdersQuery } from '../graphql/generated';

export default function HomePage() {
  const [binanceCredentials, setBinanceCredentials] = useState({ apiKey: '', apiSecret: '' });

  return (
    <>
      <ColorSchemeToggle />
      <PasswordInput placeholder="API key" label="API key" withAsterisk />
      <PasswordInput placeholder="Secret key" label="Secret key" withAsterisk />
    </>
  );
}
