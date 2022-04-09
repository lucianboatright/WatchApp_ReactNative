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
    sendFilter: (name: string) => void;
    inportData: any;
}

const { width } = Dimensions.get('window');

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App : FC <Props> = (props) =>  {
  const [data, setData] = React.useState(props.inportData); 

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
              onPress={() => props.sendFilter(item.name)}
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
    marginLeft: 5,
    // flex: 1,
    justifyContent: "center",
    // paddingTop: 2,
    // backgroundColor: "white",
    // padding: 1,
    // margin: 2,
  },
  flatList: {
    // paddingHorizontal: 16,
    // paddingVertical: 16,
  },
  cardContainer: {
    // height: 28,
    width: 'auto',
    marginRight: 8,
  },
  card: {
    height: 25,
    width: 'auto',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    padding: 3,
  },
  text: { color: "white", fontWeight: 'bold' }
});