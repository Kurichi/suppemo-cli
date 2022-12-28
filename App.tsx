import { Provider } from 'react-redux';
import { store } from './src/app/store';
import Router from './src/components/Navigator';

export default function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}
