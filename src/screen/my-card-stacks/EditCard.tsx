import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, Alert, TextInput } from 'react-native';
import { Button } from '@rneui/base';

import { useCardsSelector, remove, edit } from '../../features/cards/cardsSlice';
import { useAppDispatch } from '../../app/hooks';

export default function EditCard(props: any) {
  const { navigation, route } = props;
  const targetIndex = route.params;
  const { cards } = useCardsSelector();
  const dispatch = useAppDispatch();

  const targetCard = cards[targetIndex];

  const [attentionText, setText] = useState<string>('');
  const textInputRef = useRef<TextInput>(null);

  const alert = () => {
    Alert.alert('本当に消しますか？', '', [
      {
        text: 'はい',
        onPress: () => {
          dispatch(remove(targetCard.id));
          navigation.goBack();
        },
      },
      { text: 'やめる' },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={{ width: '94%' }}>
        <Button
          type='clear'
          buttonStyle={styles.backButton}
          titleStyle={{ color: 'black' }}
          title='もどる'
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={{ flex: 1, alignItems: 'center', width: '94%' }}>
        <Text style={styles.titleText}>カードのへんしゅう</Text>

        {/* cancel button */}
        <View style={[styles.shadow, { width: '50%' }]}>
          <Button
            type='clear'
            icon={{
              name: 'cancel',
              type: 'material',
            }}
            buttonStyle={styles.removeButton}
            titleStyle={styles.buttonText}
            onPress={alert}
          />
        </View>

        {/* reject box */}
        <View style={styles.rejectContainer}>
          <Text style={{ fontSize: 20, marginLeft: 4 }}>なまえをかえる</Text>
          <View style={styles.nameChangeTextBox}>
            <Text>{attentionText}</Text>
            <TextInput
              defaultValue={targetCard.name}
              style={{ fontSize: 30 }}
              maxLength={8}
              ref={textInputRef}
            />
          </View>
          <View style={styles.shadow}>
            <Button
              type='clear'
              title='へんこうする'
              buttonStyle={styles.changeButton}
              titleStyle={styles.buttonText}
              onPress={() => {
                const newTitle = textInputRef.current?.props.value;
                if (newTitle) {
                  setText('なまえがないよ');
                } else {
                  targetCard.name = newTitle ? newTitle : targetCard.name;
                  dispatch(edit(targetCard));
                }
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF8B0',
    flex: 1,
    alignItems: 'center',
  },
  titleContainer: {
    paddingTop: 15,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  backButton: {
    width: 100,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    borderBottomWidth: 2,
  },
  nameChangeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 15,
    paddingTop: 20,
  },
  nameChangeTextBox: {
    width: '100%',
    height: 60,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    borderColor: 'rgba(100,100,100,0.2)',
    borderWidth: 2,
    justifyContent: 'center',
    paddingLeft: 4,
  },
  changeButton: {
    width: '100%',
    backgroundColor: '#FC6A2C',
    borderRadius: 15,
  },
  removeButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
    flexDirection: 'row',
    paddingBottom: 8,
    width: '94%',
  },
  removeButton: {
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  image: {
    height: 200,
    width: 200,
  },
  rejectContainer: {
    width: '100%',
    marginVertical: 24,
  },
  shadow: {
    shadowColor: '#333',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
});
