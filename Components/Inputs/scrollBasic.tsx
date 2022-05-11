import React, { FC, useEffect, useState } from "react";
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
  Pressable,
} from "react-native";
import { Card } from "react-native-paper";

interface Props {
  sendFilter: (name: string) => void;
  inportData: any;
  bgcolor: string;
}

const { width } = Dimensions.get('window');

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App: FC<Props> = (props) => {
  const [data, setData] = React.useState<any>(null);

  const settingData = async () => {
    await setData(props.inportData)
  }


  useEffect(() => {
    settingData()
  }, [props.inportData])

  return (
    <View style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
        horizontal={true}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.cardContainer}
              onPress={() => props.sendFilter(item.name)}
            >
              <Card style={[styles.card, { backgroundColor: props.bgcolor }]}>
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
    justifyContent: "center",
  },
  flatList: {
  },
  cardContainer: {
    width: 'auto',
    marginRight: 8,
  },
  card: {
    marginBottom: 1,
    height: 17,
    width: 'auto',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    // paddingTop: 1,
  },
  text: {
    color: "white",
    fontWeight: 'bold',
    fontFamily: 'NunitoBold',
    fontSize: 13,
  }
});