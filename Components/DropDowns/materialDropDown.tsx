import React, {useState, useEffect, FC} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Dimensions} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';

const {height, width} = Dimensions.get('screen')

const items = [
  {id: 1, name: 'Steel'},
  {id: 2, name: 'Chrome Plated'},
  {id: 3, name: 'Bronze'},
  {id: 4, name: 'Gold'},
  {id: 5, name: 'Silver'},
  {id: 6, name: 'Nickel'},
  {id: 7, name: 'Platenum'},
  {id: 8, name: 'Alloy'},
  {id: 9, name: 'Plastic'},
  {id: 10, name: 'other'},
];

interface Props {
    sendSelectedMaterial: (selectedMaterial: string | null) => void;
    placeHolder: string;
}

const App : FC <Props> = (props) => {
  // Data Source for the SearchableDropdown
//   const [serverData, setServerData] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState<string>('')
  const [placeholder, setPlaceHolder] = useState<string>(props.placeHolder)


  useEffect(() => {
    props.sendSelectedMaterial(selectedMaterial)
  })

  return (
    <View style={styles.containerOuter}>
      <View style={styles.container}>
        {/* <Text style={styles.titleText}>
            Case Material
        </Text> */}
        <View style={{flexDirection: 'row'}}>
            <SearchableDropdown
            onTextChange={(text) => console.log(text)}
            onItemSelect={(item: { name: React.SetStateAction<string>; }) => (setSelectedMaterial(item.name), setPlaceHolder(item.name))}
            containerStyle={{padding: 0}}
            textInputStyle={{
                padding: 2,
                paddingLeft: 10,
                borderWidth: 1,
                borderColor: '#ccc',
                backgroundColor: '#FAF7F6',
                width: 150,
                borderRadius: 5,
            }}
            itemStyle={{
              padding: 2,
              paddingLeft: 10,
              borderRadius: 5,
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
            // defaultIndex={2}
            placeholder={placeholder}
            resPtValue={false}
            underlineColorAndroid="transparent"
            />
            <Text style={{fontSize: 20}}> : </Text>
            <Text style={{fontSize: 20, paddingTop: 1}}>{selectedMaterial ? <Text>{selectedMaterial}</Text> : <Text>Case Material</Text>}</Text>
        </View>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    // flex: .3,
    backgroundColor: '#E9EBEE',
    // backgroundColor: 'red',
    paddingVertical: 1,
  },
  containerOuter: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '95%'
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
