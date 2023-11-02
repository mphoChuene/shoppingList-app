import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "../Redux/reducers";
import ItemForm from "../components/ItemsForm";
import Modal from "react-native-modal";
import home from "../assets/home.jpg";

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

  // Calculate the total cost
  const totalCost = shoppingList.reduce((total, item) => total + item.price, 0);

  return (
    <SafeAreaView style={{ alignItems: "center" }}>
      <Text style={{ fontSize: 30, fontWeight: "bold", marginVertical: 10 }}>
        Shopping List
      </Text>
      <Image
        source={home}
        style={{
          height: 300,
          width: "100%",
          marginVertical: 20,
          alignSelf: "center",
        }}
      />
      <TouchableOpacity
        title="Create Shopping List"
        onPress={toggleModal}
        style={{
          backgroundColor: "red",
          height: 30,
          width: "80%",
          borderRadius: 10,
          marginVertical: 10,
        }}>
        <Text style={{ color: "#fff", textAlign: "center", fontSize: 26 }}>
          Create list{" "}
        </Text>
      </TouchableOpacity>
      <FlatList
        data={shoppingList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <View style={styles.listItemContainer}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text>{item.name}</Text>
                <Text>Quantity: {item.quantity}</Text>
                <Text>Price: R{item.price}</Text>
              </View>
              <Button title="Remove" onPress={() => handleRemoveItem(item.id)} />
            </View>
          </View>
        )}
      />

      <View style={styles.totalContainer}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>Total Cost:</Text>
        <Text style={{ fontSize: 20 }}>R{totalCost.toFixed(2)}</Text>
      </View>

      <Modal isVisible={isModalVisible}>
        <ItemForm toggleModal={toggleModal} image={home} />
      </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  listItemContainer: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 10,
  },
  textContainer: {},
  image: {
    width: 70,
    height: 70,
    marginHorizontal: 15, // Add some spacing between text and image
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
});

export default ItemListScreen;
