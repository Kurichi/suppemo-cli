import React, { useEffect } from 'react';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Button } from '@rneui/base';
import { useCardsSelector } from '../features/cards/cardsSlice';
import { useSequencesSelector } from '../features/sequences/sequencesSlice';
//import { FlatList } from 'react-native-gesture-handler';
//import { useCard, getCards } from '../contexts/card';
//import { useTemplates } from '../contexts/template';

export default function CardsFolder(props: { current_ws: number }) {
  const { cards } = useCardsSelector();
  const { sequences } = useSequencesSelector();

  const [current_index, setSelectCard] = useState<number>(0);
  const { current_ws } = props;

  //まだ変更してない
  const folders: folder_interface[] = require('../../default_card_folders.json');

  var ccard_ids: number[] = [];
  for (const _c of cards) if (!_c.isDefault) ccard_ids.push(_c.id);

  const createdCardFolder: folder_interface = {
    id: -1,
    name: 'myCard',
    iconName: "star-o",
    type: 'font-awesome',
    background_color: '#d43ba3',
    cards_ids: ccard_ids,
  }

  useEffect(() => {
    folders.push(createdCardFolder);
  }, [folders])

  return (
    <View style={styles.cardsFolder}>
      <View>
        <ScrollView
          horizontal={true}
          style={styles.scrollBar}
        >
          {folders.map((data, index) => {
            return (
              <View style={[styles.tag, { backgroundColor: data.background_color }]} key={index}>
                <Button
                  type='clear'
                  icon={{
                    name: data.iconName,
                    type: data.type,
                    size: 36,
                    color: 'white',
                  }}
                  onPress={() => {
                    setSelectCard(index);
                  }}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View style={[styles.folderFlame, { backgroundColor: folders[current_index].background_color }]}>
        <View style={styles.folder}>
          <FlatList
            data={getCards(cards, folders[current_index].cards_ids)}
            renderItem={({ item }) =>
              <TouchableOpacity
                onPress={() => { console.log(current_ws); modifyTemplate('add_card', { template_id: current_ws, card_id: item.id }) }}
              >
                {item.exists &&
                  <View style={styles.imageContainer}>
                    <Image source={{ uri: item.uri }} style={styles.card} />
                    <Text style={styles.cardTitle}>{item.name}</Text>
                  </View>}
              </TouchableOpacity>
            }
            numColumns={3}
          />
        </View>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  cardsFolder: {
    width: '100%',
    backgroundColor: '#ffffff',
    flex: 1,
  },
  tag: {
    backgroundColor: '#8BD8A5',
    height: 50,
    width: 90,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  folderFlame: {
    backgroundColor: '#8BD8A5',
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  folder: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    flex: 1,
    borderRadius: 15,
    paddingVertical: 8,
    width: '94%',
    alignItems: 'center',
  },
  scrollBar: {
    backgroundColor: '#FFF8B0',
  },
  card: {
    height: 100,
    width: 100,
    marginHorizontal: 8,
    marginVertical: 8,
  },
  imageContainer: {

  },
  cardTitle: {
    position: 'absolute',
    bottom: 0,
    height: '20%',
    marginHorizontal: 8,
    marginVertical: 8,
    backgroundColor: 'rgba(255,255,255,0.4)',
    fontWeight: 'bold',
    fontSize: 14,
  }
});