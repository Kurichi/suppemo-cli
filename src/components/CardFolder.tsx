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
import { useCardFolderSelector } from '../features/cardFolders/cardFoldersSlice';

export default function CardFolder() {
  const { cards } = useCardsSelector();
  const { cardFolders } = useCardFolderSelector();

  const [current_index, setSelectCard] = useState<number>(0);


  return (
    <View style={styles.cardsFolder}>
      <View>
        <ScrollView horizontal={true} style={styles.scrollBar}>
          {[...cardFolders.entries()].map(([id,folder])=>(
            <View style={[styles.tag, { backgroundColor: folder.backgroundColor }]} key={id}>
                <Button
                  type="clear"
                  icon={{
                    name: folder.iconName,
                    type: folder.iconType,
                    size: 36,
                    color: 'white',
                  }}
                  onPress={() => {
                    setSelectCard(id);
                  }}
                />
              </View>
            ))
          }
        </ScrollView>
      </View>
      <View
        style={[styles.folderFlame, { backgroundColor:  cardFolders.get(current_index)?.backgroundColor }]}
      >
        <View style={styles.folder}>
          <FlatList
            data={cardFolders.get(current_index)?.cardIds}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  console.log('カード追加')
                }}
              >
                <View style={styles.imageContainer}>
                  <Image source={{ uri: cards.get(item)?.uri }} style={styles.card} />
                  <Text style={styles.cardTitle}>{cards.get(item)?.name}</Text>
                </View>
              </TouchableOpacity>
            )}
            numColumns={3}
          />
        </View>
      </View>
    </View>
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
  imageContainer: {},
  cardTitle: {
    position: 'absolute',
    bottom: 0,
    height: '20%',
    marginHorizontal: 8,
    marginVertical: 8,
    backgroundColor: 'rgba(255,255,255,0.4)',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
