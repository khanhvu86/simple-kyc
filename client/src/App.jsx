import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import Router from './routes';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={Router} />
    </QueryClientProvider>
  );
}

export default App;
