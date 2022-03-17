import React, {useState, useEffect, FC} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Dimensions, Button} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';

const {height, width} = Dimensions.get('screen')

const items = [
  {id: 1, name: 'Intergrated'},
  {id: 2, name: '15 mm'},
  {id: 3, name: '16 mm'},
  {id: 4, name: '17 mm'},
  {id: 5, name: '18 mm'},
  {id: 6, name: '19 mm'},
  {id: 7, name: '20 mm'},
  {id: 8, name: '21 mm'},
  {id: 9, name: '22 mm'},
  {id: 10, name: '23 mm'},
  {id: 11, name: '24 mm'},
  {id: 12, name: '25 mm'},
  {id: 13, name: '26 mm'},
  {id: 14, name: '27 mm'},
  {id: 15, name: '28 mm'},
];

interface Props {
    sendSelectedLug: (selectedLug: string | null) => void;
}

const App : FC <Props> = (props) => {
  // Data Source for the SearchableDropdown
//   const [serverData, setServerData] = useState([]);
  const [selectedLug, setSelectedLug] = useState<any>(null)


  const testing = () => {
    console.log('LUG WIDTH', selectedLug)
  }

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
            <SearchableDropdown
                onTextChange={(text) => console.log(text)}
                onItemSelect={(item) => setSelectedLug(item.name)}
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
            <Text style={{fontSize: 25, paddingTop: 1}}>{selectedLug ? <Text>{selectedLug}</Text> : <Text>Select Lug Width</Text>}</Text>
        </View>
        <Button title='TESTING' onPress={testing} />
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
