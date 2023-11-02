import React from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  SafeAreaView,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "../Redux/reducers";
import ItemForm from "../components/ItemsForm";

function ItemListScreen() {
  const shoppingList = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
  };

  return (
    <SafeAreaView>
      <Text>Shopping List</Text>
      <ItemForm />
      <FlatList
        data={shoppingList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            {item.image && (
              <Image
                source={{ uri: item.image }}
                style={{ width: 100, height: 100 }}
              />
            )}
            <Text>{item.name}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <Text>Price: R{item.price}</Text>
            <Button title="Remove" onPress={() => handleRemoveItem(item.id)} />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

export default ItemListScreen;
