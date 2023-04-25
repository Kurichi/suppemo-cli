import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import { Navigator } from './src/components/Navigator';
import { Initialize } from './src/screen/Initialize';
import { useAuth } from './src/hooks/auth';

export default function App() {
  const { user } = useAuth();
  const [isInitialize, setIsInitialize] = useState<boolean>(false);

  return (
    <Provider store={store}>
      {!isInitialize ? (
        // 初期化が未終了
        <Initialize
          onChangeStatus={(status) => {
            if (status == 'finish') setIsInitialize(true);
          }}
        />
      ) : (
        // 初期化済み
        <Navigator initialRouteName={user !== null ? 'Tab' : 'SignIn'} />
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
