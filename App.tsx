import { getAuth } from 'firebase/auth';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import { Router, SignIn } from './src/components/Navigator';
import { Initialize } from './src/screen/Initialize';
import { auth } from './src/services/filebase';

export default function App() {
  // const auth = getAuth();
  const [isInitialize, setInitialize] = useState<boolean>(false);

  return (
    <Provider store={store}>
      {!isInitialize ? (
        // 初期化が未終了
        <Initialize
          onChangeStatus={(status) => {
            setInitialize(true);
          }}
        />
      ) : // 初期化済み
      auth.currentUser !== null ? (
        <Router />
      ) : (
        <SignIn />
      )}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#FFF8B0',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
