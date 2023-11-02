import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ItemListScreen from './Screens/itemsListScreen';


export default function App() {
  return (
    <View style={styles.container}>
      <ItemListScreen/>
      <StatusBar style="auto" />
    </View>
  );
}
