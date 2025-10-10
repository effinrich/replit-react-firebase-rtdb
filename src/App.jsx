import { UserTable } from './features/users';
import { Toaster } from './components/ui/toaster';

export default function App() {
  return (
    <>
      <UserTable />
      <Toaster />
    </>
  );
}
