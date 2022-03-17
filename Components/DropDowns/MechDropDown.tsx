import React, {useState, useEffect, FC} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Dimensions} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';

const {height, width} = Dimensions.get('screen')

const items = [
  {id: 1, name: 'Mechanical'},
  {id: 2, name: 'Automatic'},
  {id: 3, name: 'Quartz'},
  {id: 4, name: 'Solar'},
  {id: 5, name: 'Bumper'},
  {id: 6, name: 'Other'},
];

interface Props {
    sendSelectedMech: (selectedMech: any | null) => void;
}

const App : FC <Props> = (props) => {
  // Data Source for the SearchableDropdown
//   const [serverData, setServerData] = useState([]);
  const [selectedMech, setSelectedMech] = useState<any>(null)

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        {/* <Text style={styles.titleText}>
            Select Case Size
        </Text> */}
        <View style={{flexDirection: 'row'}}>
            <SearchableDropdown
                onTextChange={(text) => console.log(text)}
                onItemSelect={(item) => setSelectedMech(item.name)}
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
            <Text style={{fontSize: 25, paddingTop: 1}}>{selectedMech ? <Text>{selectedMech}</Text> : <Text>Select Mechanism</Text>}</Text>
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
