import React, { useState, useEffect, FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';

interface Props {
  sendSelected: (selected: string | null) => void;
  placeHolder: string;
  inputData: any;
  title: string;

}

const App: FC<Props> = (props) => {
  const [selectedWatch, setSelectedWatch] = useState<any>(null)
  const [placeholder, setPlaceHolder] = useState<string>(props.placeHolder)



  useEffect(() => {
    props.sendSelected(selectedWatch)
  })

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <SearchableDropdown
            onTextChange={(text: any) => console.log(text)}
            onItemSelect={(item: any) => (setSelectedWatch(item.name), setPlaceHolder(item.name))}
            containerStyle={{ padding: 0 }}
            textInputStyle={{
              padding: 3,
              paddingLeft: 10,
              borderWidth: 1,
              borderColor: '#ccc',
              backgroundColor: '#FAF7F6',
              width: 150,
              borderRadius: 5,
              fontFamily: 'NunitoBold',
            }}
            itemStyle={{
              padding: 2,
              paddingLeft: 10,
              borderRadius: 5,
              marginTop: 2,
              marginRight: 10,
              backgroundColor: '#FAF9F8',
              borderColor: '#bbb',
              borderWidth: 1,
            }}
            itemTextStyle={{
              color: '#222',
            }}
            itemsContainerStyle={{
              maxHeight: '60%',
            }}
            items={props.inputData}
            placeholder={placeholder}
            resPtValue={false}
            underlineColorAndroid="transparent"
          />
          <Text style={{ fontSize: 20 }}> : </Text>
          <Text style={{ fontSize: 20, paddingTop: 1, fontFamily: 'NunitoSemiBold', }}>{selectedWatch ? <Text style={styles.blueFont}>{selectedWatch}</Text> : <Text style={styles.blueFont}>{props.title}</Text>}</Text>
        </View>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  outerContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '95%'
  },
  container: {
    paddingVertical: 1,
  },
  titleText: {
    fontFamily: 'NunitoBold',
    padding: 0,
    fontSize: 16,
    textAlign: 'center',
  },
  headingText: {
    padding: 0,
  },
  blueFont: {
    color: '#012A4A'
  },
});
