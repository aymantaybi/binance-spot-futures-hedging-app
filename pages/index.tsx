import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { useGetGreetingsQuery } from '../graphql/generated';

export default function HomePage() {
  const { data } = useGetGreetingsQuery({ variables: { name: 'Ayman' } });

  console.log(data?.greetings);

  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
    </>
  );
}
