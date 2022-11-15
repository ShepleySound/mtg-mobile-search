import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  Text,
  Image,
} from 'react-native';
import {
  TextBody1,
  TextBody2,
  TextH1,
  TextH2,
  TextH3,
} from './components/TextStyles';

const Item = ({ item }) => {
  return (
    <View style={styles.item}>
      {item.image_status !== 'missing' && item.image_uris?.small && (
        <Image
          source={{ uri: item.image_uris.small }}
          style={styles.thumbnail}
          resizeMode={'cover'}
        />
      )}
      <View style={{ flex: 1 }}>
        <TextH3>{item.name}</TextH3>
      </View>
    </View>
  );
};

export default function App() {
  const [searchText, setSearchText] = useState(null);
  const [cardData, setCardData] = useState(null);

  const handleCardSearch = async (queryParams) => {
    try {
      const response = await fetch(
        `https://api.scryfall.com/cards/search?` +
          new URLSearchParams({
            ...queryParams,
          })
      );
      const responseJSON = await response.json();
      setCardData(responseJSON);
    } catch (err) {
      console.error(err);
    }
  };

  const renderItem = ({ item }) => {
    return <Item item={item} />;
  };

  return (
    <View style={styles.container}>
      <TextH1>Magic: The Gathering</TextH1>
      <TextInput
        style={styles.input}
        onChangeText={setSearchText}
        value={searchText}
        onSubmitEditing={(event) =>
          handleCardSearch({ q: event.nativeEvent.text })
        }
      />
      {cardData && (
        <View style={styles.imageContainer}>
          <FlatList
            data={cardData.data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12141e',
    alignItems: 'center',
    paddingTop: 58,
  },
  imageContainer: {
    paddingTop: 58,
    width: '100%',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    width: '80%',
    backgroundColor: '#fff',
  },
  item: {
    backgroundColor: '#202020',
    borderRadius: 8,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
    elevation: 1,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
});
