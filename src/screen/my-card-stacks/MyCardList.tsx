import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { useCardsSelector } from '../../features/cards/cardsSlice';
import { useAppDispatch } from '../../app/hooks';

const renderCard = (item: Card) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        //navigation.navigate('EditCard', {card: item});
      }}
    >
      <Image source={{ uri: item.uri }} style={styles.photo} />
      <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default function MyCardList(props: any) {
  const { navigation } = props;

  const [text, setText] = useState<string>('');
  const { cards, numOfCards } = useCardsSelector();

  return (
    <View style={styles.container}>
      <Text style={styles.sceneTitle}>つくったカード</Text>
      <View style={styles.searchBoxContainer}>
        <Feather name='search' size={32} color='black' />
        <View style={styles.searchBox}>
          <TextInput value={text} onChangeText={(text) => setText(text)} />
        </View>
      </View>
      <View style={styles.listContainer}>
        {numOfCards > 0 ? (
          <FlatList data={cards} renderItem={({ item }) => renderCard(item)} numColumns={3} />
        ) : (
          <Text>カードがないよ</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8B0',
  },
  sceneTitle: {
    fontSize: 32,
    marginVertical: 8,
    fontWeight: 'bold',
  },
  searchBoxContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
    borderTopColor: 'rgba(0,0,0,0.2)',
    borderTopWidth: 2,
    paddingTop: 8,
  },
  searchBox: {
    backgroundColor: 'white',
    width: '70%',
    height: 56,
    borderColor: 'rgba(200,200,200,0.4)',
    borderWidth: 4,
    borderRadius: 20,
    justifyContent: 'center',
    paddingLeft: 4,
  },
  photo: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  selectBox: {
    width: '70%',
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderColor: 'rgba(255,255,255,0)',
    height: 40,
    borderRadius: 20,
  },
  dropBoxContainer: {
    alignItems: 'flex-end',
  },
  card: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 16,
    maxWidth: 100,
  },
  searchContainer: {
    backgroundColor: '#FCD12C',
  },
  listContainer: {
    marginBottom: 80,
    alignItems: 'center',
  },
});
