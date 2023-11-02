import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import { useDispatch } from "react-redux";
import { addItem } from "../Redux/reducers";
import * as ImagePicker from "expo-image-picker";

function ItemForm({ toggleModal }) {
  const [itemName, setItemName] = useState("");
  const [storeName, setStoreName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("1");

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access image library is required.");
      }
    })();
  }, []);

  const calculateTotalPrice = () => {
    const unitPrice = parseFloat(price);
    const qty = parseInt(quantity);
    if (!isNaN(unitPrice) && !isNaN(qty)) {
      return (unitPrice * qty).toFixed(2);
    }
    return "0.00";
  };

  const handleAddItem = () => {
    const newItem = {
      id: Date.now().toString(),
      name: itemName,
      store: storeName,
      image,
      price: parseFloat(price),
      quantity: parseInt(quantity),
    };

    dispatch(addItem(newItem));
    setItemName("");
    setStoreName("");
    setImage("");
    setPrice("");
    setQuantity("1");
    toggleModal();
  };

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <SafeAreaView style={styles.formContainer}>
      <Text>Add Item</Text>
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={itemName}
        onChangeText={(text) => setItemName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Store Name"
        value={storeName}
        onChangeText={(text) => setStoreName(text)}
      />
     
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={(text) => setPrice(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        value={quantity}
        onChangeText={(text) => setQuantity(text)}
        keyboardType="numeric"
      />
       <TouchableOpacity title="Select Image" onPress={selectImage}> <Text>Upload Image</Text></TouchableOpacity >
      {image ? (
        <Image source={{ uri: image }} style={styles.imagePreview} />
      ) : null}
      <Text>Total Price: R{calculateTotalPrice()}</Text>
      <Button title="Add" onPress={handleAddItem} />
      <Button title="Close" onPress={toggleModal} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    backgroundColor: "#fff",
  },
  imagePreview: {
    width: 100,
    height: 100,
  },
});

export default ItemForm;
