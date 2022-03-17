import React, {useState, useEffect, FC} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Dimensions} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';

const {height, width} = Dimensions.get('screen')

const items = [
  {id: 1, name: '29 mm'},
  {id: 2, name: '30 mm'},
  {id: 3, name: '31 mm'},
  {id: 4, name: '32 mm'},
  {id: 5, name: '33 mm'},
  {id: 6, name: '34 mm'},
  {id: 7, name: '35 mm'},
  {id: 8, name: '36 mm'},
  {id: 9, name: '37 mm'},
  {id: 10, name: '38 mm'},
  {id: 11, name: '39 mm'},
  {id: 12, name: '40 mm'},
  {id: 13, name: '41 mm'},
  {id: 14, name: '42 mm'},
  {id: 15, name: '43 mm'},
  {id: 16, name: '44 mm'},
  {id: 17, name: '45 mm'},
  {id: 18, name: '46 mm'},
  {id: 19, name: '47 mm'},
  {id: 20, name: '48 mm'},
  {id: 21, name: '49 mm'},
  {id: 22, name: '50 mm'},
  {id: 23, name: '51 mm'},
  {id: 24, name: '52 mm'},
];

interface Props {
    sendSelectedCase: (selectedCase: any | null) => void;
}

const App : FC <Props> = (props) => {
  // Data Source for the SearchableDropdown
//   const [serverData, setServerData] = useState([]);
  const [selectedWatch, setSelectedWatch] = useState<any>(null)

  useEffect(() => {
    props.sendSelectedCase(selectedWatch)
  })

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        {/* <Text style={styles.titleText}>
            Select Case Size
        </Text> */}
        <View style={{flexDirection: 'row'}}>
            <SearchableDropdown
                onTextChange={(text) => console.log(text)}
                onItemSelect={(item) => setSelectedWatch(item.name)}
                containerStyle={{padding: 0}}
                textInputStyle={{
                    padding: 5,
                    paddingLeft: 10,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    backgroundColor: '#FAF7F6',
                    width: 150,
                    borderRadius: 20,
                }}
                itemStyle={{
                    padding: 10,
                    marginTop: 2,
                    marginRight: 10,
                    // width: 10,
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
                items={items}
                defaultIndex={2}
                placeholder="Select Case Size"
                resPtValue={false}
                underlineColorAndroid="transparent"
            />
            <Text style={{fontSize: 25}}> : </Text>
            <Text style={{fontSize: 25, paddingTop: 1}}>{selectedWatch ? <Text>{selectedWatch}</Text> : <Text>Select Case Size</Text>}</Text>
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
    // flex: .3,
    backgroundColor: '#E9EBEE',
    paddingVertical: 1,
  },
  titleText: {
    padding: 0,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  headingText: {
    padding: 0,
  },
});
