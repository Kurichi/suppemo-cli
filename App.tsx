import { getAuth } from 'firebase/auth';
import { useState } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import { Router, SignIn } from './src/components/Navigator';

export default function App() {
  const auth = getAuth();
  const [isInitialize, setInitialize] = useState<boolean>(false);

  return (
    <Provider store={store}>
      {auth.currentUser !== null
        ? <Router />
        : <SignIn />
      }
    </Provider>
  );
}
