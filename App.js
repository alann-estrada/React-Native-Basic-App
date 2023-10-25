import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Button, Alert } from "react-native";
import { TouchableOpacity } from "react-native";
// import image from "./assets/ejemplo.jpeg";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import * as Sharing from "expo-sharing";
import { Platform } from "react-native";

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  let openImagePickerAsync = async () => {
    let persmisionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (persmisionResult.granted === false) {
      alert("Permission to access camera is required");
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.canceled === true) {
      return;
    }
    setSelectedImage({ localUri: pickerResult.assets[0].uri });
  };

  const openShareDialog = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert("Sharing is not available on your plattform");
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {Platform.OS === "web" ? (
        <Text style={styles.title}>not supported for platform :)</Text>
      ) : (
        <>
          <Text style={styles.title}>Pick an image :)</Text>
          <TouchableOpacity onPress={openImagePickerAsync}>
            <Image
              style={styles.image}
              source={{
                uri:
                  selectedImage !== null
                    ? selectedImage.localUri
                    : "https://picsum.photos/200/200",
              }}
            />
          </TouchableOpacity>
        </>
      )}
      {/* <Button
        color="black"
        title="Press Me"
        onPress={() => Alert.alert("Hello!!")}
      /> ejemplos con Alert*/}
      {/* <TouchableOpacity
        onPress={() => console.log("Hello ")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Press Me</Text>
      </TouchableOpacity> Ejemplos con console.log*/}
      {selectedImage ? (
        <TouchableOpacity onPress={openShareDialog} style={styles.button}>
          <Text style={styles.buttonText}>Share this image</Text>
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#292929",
  },
  title: {
    fontSize: 30,
    color: "#fff",
    padding: 10,
    textTransform: "capitalize",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 10,
    resizeMode: "contain",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
  },
});
export default App;
