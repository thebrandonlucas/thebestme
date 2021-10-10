import { useNavigation } from '@react-navigation/native';
import * as Contacts from 'expo-contacts';
import * as React from 'react';
import { memo, useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, TextInput } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { connect, useDispatch } from 'react-redux';
import { Text, View } from '../components/Themed';
import { setMyCircleFriends } from '../redux/actions/MyCircleActions';
import { MyCircleFriend } from '../types';

type MyCircleFriendChecked = MyCircleFriend & { checked?: boolean };
type MyCircleFriendDict = { [id: string]: MyCircleFriendChecked };

export function ConfigureMyCircleScreen({ myCircleReducer, setMyCircleFriends }) {
  const navigation = useNavigation();
  const [contacts, setContacts] = useState<MyCircleFriendChecked[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<
    MyCircleFriendChecked[]
  >([]);
  const [selectedContacts, setSelectedContacts] = useState<MyCircleFriend[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    loadContacts();
    setSelectedContacts(myCircleReducer.myCircle);
  }, []);

  const loadContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      // TODO: research hasNextPage and hasPreviousPage
      const { data, hasNextPage, hasPreviousPage } =
        await Contacts.getContactsAsync({
          // TODO: What if the friend has multiple phone numbers?
          // Fixme: For some reason this returns all info, not just only that listed
          fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Name],
        });
      let tempData: MyCircleFriendChecked[] = [];
      for (let i = 0; i < data.length; i++) {
        const currentContact = data[i];
        // Skip contacts without phone numbers
        if (currentContact.phoneNumbers === undefined) {
          continue;
        }
        tempData.push({
          id: currentContact.id,
          name: currentContact.name,
          phoneNumber: currentContact.phoneNumbers[0].digits,
          checked: false,
        });
      }
      setContacts(tempData);
      setFilteredContacts(tempData);
      setLoading(false);
    }
  };

  const searchContacts = useCallback((value) => {
    // Isn't this O(n^2)? How to make more efficient?
    const searchTermLowerCase = value.toLowerCase();
    const tempFilteredContacts = contacts.filter((contact) => {
      const contactLowerCase = contact.name.toLowerCase();
      return contactLowerCase.indexOf(searchTermLowerCase) > -1;
    });
    setFilteredContacts(tempFilteredContacts);
  }, []);

  const addSelectedContact = useCallback(
    (newContact) => {
      // Remove from array if exists already
      // TODO: optimize? (double loop)
      const contactIndex = filteredContacts.findIndex(
        (contact) => contact.id === newContact.id
      );
      let tempContacts = [...filteredContacts];
      for (let i = 0; i < selectedContacts.length; i++) {
        if (selectedContacts[i].id === newContact.id) {
          setSelectedContacts(
            selectedContacts.filter((contact) => contact.id !== newContact.id)
          );
          tempContacts[contactIndex] = {
            ...tempContacts[contactIndex],
            checked: false,
          };
          setFilteredContacts(tempContacts);
          return;
        }
      }

      // Else, add
      setSelectedContacts((prevState) => [...prevState, { ...newContact }]);
      tempContacts[contactIndex] = {
        ...tempContacts[contactIndex],
        checked: true,
      };
      setFilteredContacts(tempContacts);
    },
    [filteredContacts]
  );

  const SelectedContacts = ({ selectedContacts }) => (
    <View>
      {selectedContacts.map((contact) => {
        return <Text key={contact.id}>{contact.name}</Text>;
      })}
    </View>
  );

  const renderItem = useCallback(
    ({ item }) => {
      const { id, name, phoneNumber } = item;
      return (
        <TouchableOpacity
          onPress={() => addSelectedContact({ id, name, phoneNumber })}
          style={
            item.checked ? [styles.item, styles.selectedItem] : styles.item
          }
        >
          <Text style={styles.title}>{item.name}</Text>
        </TouchableOpacity>
      );
    },
    [filteredContacts]
  );

  const keyExtractor = useCallback((item) => item.id, []);

  const submitMyCircleFriends = () => {
    setMyCircleFriends(selectedContacts);
    navigation.navigate('Home')
  };

  // FIXME: Figure out why this is causing choppy behavior
  // const ITEM_HEIGHT = 200;
  // // NOTE: used for performance boost, since the height of the list item is static
  // // this removes the need for flatlist to measure the list item layout itself
  // const getItemLayout = useCallback((data, index) => ({
  //   length: ITEM_HEIGHT,
  //   offset: ITEM_HEIGHT * index,
  //   index,
  // }), []);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search"
        placeholderTextColor="#444"
        style={{
          color: 'white',
        }}
        onChangeText={(value) => searchContacts(value)}
      />
      <View lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <SelectedContacts selectedContacts={selectedContacts} />
      <Button title="Submit" onPress={() => submitMyCircleFriends()} />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={filteredContacts}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          // getItemLayout={getItemLayout}
          // ItemSeparatorComponent={}
          ListEmptyComponent={<Text>No Contacts</Text>}
          initialNumToRender={30}
          maxToRenderPerBatch={20}
        />
      )}
    </View>
  );
}

const mapStateToProps = (state) => {
  const { myCircleReducer } = state;
  return { myCircleReducer };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMyCircleFriends: (input) => {
      dispatch(setMyCircleFriends(input));
    },
    // Can add more functions to dispatch if necessary
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(ConfigureMyCircleScreen));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#222',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  selectedItem: {
    backgroundColor: 'green',
  },
  title: {
    fontSize: 32,
  },
});
