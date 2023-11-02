import React from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem } from '../Redux/reducers'; // Import your Redux actions

function ItemListScreen() {
  const shoppingList = useSelector(state => state); // Assuming your shopping list is stored in the Redux store

  const dispatch = useDispatch();

  const handleAddItem = () => {
    // You should implement a form to capture item details, including name, quantity, price, and image.
    // For simplicity, we'll add a hardcoded item here.
    const newItem = {
      id: Date.now().toString(),
      name: 'Sample Item',
      quantity: 1,
      price: 10.0,
      image: 'sample.jpg',
    };

    dispatch(addItem(newItem));
  }

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
  }

  return (
    <View>
      <Text>Shopping List</Text>
      <Button title="Add Item" onPress={handleAddItem} />

      <FlatList
        data={shoppingList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <Text>Price: ${item.price}</Text>
            <Button title="Remove" onPress={() => handleRemoveItem(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

export default ItemListScreen;
