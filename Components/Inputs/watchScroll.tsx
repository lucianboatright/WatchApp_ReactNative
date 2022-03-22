import React, { FC, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  LayoutAnimation,
  UIManager,
  Platform,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Card } from "react-native-paper";

interface Props {
    sendWatchFilter: (name: string) => void;
}

const { width } = Dimensions.get('window');

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}


const dummyData = [
    {id: 1, name: 'Rolex', color: "orange"},
    {id: 2, name: 'Omega', color: "orange"},
    {id: 3, name: 'Timex', color: "orange"},
    {id: 4, name: 'Casio', color: "orange"},
    {id: 5, name: 'Timor', color: "orange"},
    {id: 6, name: 'Seiko', color: "orange"},
    {id: 7, name: 'Vostok', color: "orange"},
    {id: 8, name: 'Enicar', color: "orange"},
    {id: 9, name: 'Smiths', color: "orange"},
    {id: 10, name: 'J W Benson', color: "orange"},
    {id: 11, name: 'Raketa', color: "orange"},
    {id: 12, name: 'Swatch', color: "orange"},
    {id: 13, name: 'Braun', color: "orange"},
  ];

const App : FC <Props> = (props) =>  {
  const [data, setData] = React.useState(dummyData); 

  return (
    <View style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
        horizontal={true}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.cardContainer}
              onPress={() => props.sendWatchFilter(item.name)}
            >
              <Card style={[styles.card, {backgroundColor: item.color}]}>
                <Text style={styles.text}>{item.name}</Text>
              </Card>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    // paddingTop: 2,
    backgroundColor: "#ecf0f1",
    // padding: 1,
    // margin: 2,
  },
  flatList: {
    // paddingHorizontal: 16,
    // paddingVertical: 16,
  },
  cardContainer: {
    height: 30,
    width: 'auto',
    marginRight: 8,
  },
  card: {
    height: 30,
    width: 'auto',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 12,
    padding: 5,
  },
  text: { color: "white", fontWeight: 'bold' }
});