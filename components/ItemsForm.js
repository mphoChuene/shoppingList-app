import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from "react-native";
import { useDispatch } from "react-redux";
import { addItem } from "../Redux/reducers";
import add from "../assets/add.jpg";
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
        alert("Permission to access the image library is required.");
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

  // ...

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // Updated to "canceled"
      const selectedImage = result.assets[0];
      setImage(selectedImage.uri);
    }
  };

  // ...

  const handleScroll = () => {
    Keyboard.dismiss(); // Close the keyboard when scrolling
  };

  return (
    <ScrollView
      contentContainerStyle={styles.formContainer}
      onScroll={handleScroll}
      style={styles.modalBackground} // Background color style
    >
      <View style={styles.header}>
        <Text style={{ fontSize: 30, textAlign: "center" }}>Add Item</Text>
        <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
      </View>
      <Image source={add} style={{ height: 300, width: "100%" }} />

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
      <Text style={{ marginVertical: 15 }}>
        Total Price: R{calculateTotalPrice()} &&{" "}
        {image ? (
          <Image source={{ uri: image }} style={styles.imagePreview} />
        ) : null}
      </Text>
      <TouchableOpacity onPress={selectImage} style={styles.uploadButton}>
        <Text style={styles.uploadButtonText}>Upload Image</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleAddItem} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    alignItems: "center",
    flexGrow: 1,
    marginTop: 35,
  },
  modalBackground: {
    backgroundColor: "#fff", // Background color style
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeButton: {
    padding: 10,
    left: 100,
  },
  closeButtonText: {
    fontSize: 24,
    color: "red",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    backgroundColor: "#fff",
    width: "80%",
  },
  uploadButton: {
    height: 30,
    width: "80%",
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadButtonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 26,
  },
  addButton: {
    height: 30,
    width: "80%",
    backgroundColor: "red",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 26,
  },
  imagePreview: {
    width: 100,
    height: 100,
  },
});

export default ItemForm;
