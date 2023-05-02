import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@rneui/base';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';

interface buttonType {
  title: string;
  iconName: string;
  iconType: string;
  onPress: () => void;
}

export default function MyCardMenu(props: any) {
  const navigation = useNavigation<NavigationScreenProp<NavigationRoute>>();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      allowsMultipleSelection: false,
      exif: false,
      aspect: [1, 1],
    });

    if (!result.canceled) navigation.navigate('Create');
  };

  const selectButton: buttonType[] = [
    {
      title: 'しゃしんをとる',
      iconName: 'camera',
      iconType: 'feather',
      onPress: () => {
        navigation.navigate('Create');
      },
    },
    {
      title: 'しゃしんをつかう',
      iconName: 'picture-o',
      iconType: 'font-awesome',
      onPress: pickImage,
    },
    {
      title: 'つくったしゃしんをみる',
      iconName: 'camera',
      iconType: 'feather',
      onPress: () => {
        navigation.navigate('CardList');
      },
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headlineContainer}>
        <Text style={styles.headline}>自分だけのカードをつくろう！</Text>
      </View>
      <View style={styles.selectButtonContainer}>
        {selectButton.map((value, index) => (
          <View key={index.toString()} style={styles.button}>
            <Button
              title={value.title}
              buttonStyle={{
                height: 100,
                borderColor: 'black',
              }}
              titleStyle={styles.buttonText}
              raised
              type='outline'
              icon={{
                name: value.iconName,
                size: 40,
                color: 'black',
                type: value.iconType,
                iconStyle: styles.iconSpace,
              }}
              radius={20}
              onPress={value.onPress}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8B0',
  },
  headlineContainer: {
    marginTop: 20,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headline: {
    fontSize: 25,
  },
  selectButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#333',
    shadowOffset: { width: 4, height: 4 },
    marginBottom: 240,
  },
  button: {
    width: 350,
    height: 100,
    margin: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
  },
  iconSpace: {
    marginRight: 40,
  },
});
