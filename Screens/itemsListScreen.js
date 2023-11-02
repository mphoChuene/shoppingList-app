import React, { useState } from "react";
import { View, Text, FlatList, Button, SafeAreaView,Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from "../Redux/reducers";
import ItemForm from "../components/ItemsForm";
import Modal from "react-native-modal";
import home from '../assets/home.jpg'

function ItemListScreen() {
  const shoppingList = useSelector((state) => state);
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
  };

  return (
    <SafeAreaView>
      <Text>Shopping List</Text>
      <Image source={home} style={{height:300,width:'100%', marginTop: 20,alignSelf:'center'}}/>
      <Button title="Create Shopping List" onPress={toggleModal} />

      <FlatList
        data={shoppingList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <Text>Price: R{item.price}</Text>
            <Button title="Remove" onPress={() => handleRemoveItem(item.id)} />
          </View>
        )}
      />

      <Modal isVisible={isModalVisible}>
        <ItemForm toggleModal={toggleModal} />
      </Modal>
    </SafeAreaView>
  );
}

export default ItemListScreen;
