import './App.css';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './layout/layout';
import Routes from './routes';
import UserProvider from './context/UserContext';

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <BrowserRouter>
          <Layout>
            <Routes />
            <ToastContainer />
          </Layout>
        </BrowserRouter>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
