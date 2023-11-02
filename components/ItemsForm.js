import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import { useDispatch } from "react-redux";
import { addItem } from "../Redux/reducers";
import * as ImagePicker from 'expo-image-picker';

function ItemForm() {
  const [itemName, setItemName] = useState("");
  const [storeName, setStoreName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access image library is required.");
      }
    })();
  }, []);

  const handleAddItem = () => {
    const newItem = {
      id: Date.now().toString(),
      name: itemName,
      store: storeName,
      image,
      price: parseFloat(price),
    };

    dispatch(addItem(newItem));
    setItemName("");
    setStoreName("");
    setImage("");
    setPrice("");
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
      <Button title="Select Image" onPress={selectImage} />
      {image ? (
        <Image source={{ uri: image }} style={styles.imagePreview} />
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={(text) => setPrice(text)}
        keyboardType="numeric"
      />
      <Button title="Add" onPress={handleAddItem} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
  imagePreview: {
    width: 100,
    height: 100,
  },
});

export default ItemForm;
