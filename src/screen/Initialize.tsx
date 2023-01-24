import { Button } from '@rneui/base';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface InitializeProps {
  onChangeStatus: (status: 'downloading' | 'finish' | 'failed') => void
}

export const Initialize = ({
  onChangeStatus,
}: InitializeProps) => {

  useEffect(() => {
    // TODO:アセットダウンロードの処理
    setTimeout(() => {
      onChangeStatus('finish');
    }, 3000)
  }, [])

  return (
    <View >
      <Text style={styles.downloadingText}>Now downloading...</Text>
    </View >
  )
}

const styles = StyleSheet.create({
  downloadingText: {
    fontSize: 20,
  }
})