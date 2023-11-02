import React, { useState } from "react";
import { View, Text, FlatList, Button, SafeAreaView,Image,TouchableOpacity } from "react-native";
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
    <SafeAreaView style={{ alignItems:'center'}}>
      <Text style={{fontSize:30, fontWeight:'bold',marginVertical:10}}>Shopping List</Text>
      <Image source={home} style={{height:300,width:'100%', marginVertical: 20, alignSelf:'center'}}/>
      <TouchableOpacity title="Create Shopping List" onPress={toggleModal} style={{backgroundColor:'red', height:30, width:'80%', borderRadius:10, marginVertical:10}} >
        <Text style={{color:'#fff', textAlign:'center',fontSize:26}}>Create list </Text>
      </TouchableOpacity>

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
