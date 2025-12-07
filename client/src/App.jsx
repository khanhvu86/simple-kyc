import { useRoutes } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context';
import { AppRoutes } from './routes';
import './App.css';

const queryClient = new QueryClient();

function App() {
  const element = useRoutes(AppRoutes);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        {element}
        <ToastContainer position="top-right" autoClose={2000} />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
