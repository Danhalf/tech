import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import './_metronic/assets/fonticon/fonticon.css';
import './_metronic/assets/keenicons/duotone/style.css';
import './_metronic/assets/keenicons/outline/style.css';
import './_metronic/assets/keenicons/solid/style.css';
import './_metronic/assets/sass/style.scss';
import './_metronic/assets/sass/plugins.scss';
import './_metronic/assets/sass/style.react.scss';
import { QueryClient, QueryClientProvider } from 'react-query';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const queryClient = new QueryClient();

root.render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </QueryClientProvider>
);
