import React, {useState, useEffect, FC} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Dimensions} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';

const {height, width} = Dimensions.get('screen')

interface Props {
    sendSelected: (selected: any | null) => void;
    placeHolder: string;
    inputData: any;
    title: string;

}

const App : FC <Props> = (props) => {
  // Data Source for the SearchableDropdown
//   const [serverData, setServerData] = useState([]);
  const [selectedWatch, setSelectedWatch] = useState<any>(null)
  const [placeholder, setPlaceHolder] = useState<string>(props.placeHolder)
  


  useEffect(() => {
    props.sendSelected(selectedWatch)
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
                onItemSelect={(item) => (setSelectedWatch(item.name), setPlaceHolder(item.name))}
                containerStyle={{padding: 0}}
                textInputStyle={{
                    padding: 5,
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
                items={props.inputData}
                // defaultIndex={2}
                placeholder={placeholder}
                resPtValue={false}
                underlineColorAndroid="transparent"
            />
            <Text style={{fontSize: 20}}> : </Text>
            <Text style={{fontSize: 20, paddingTop: 1}}>{selectedWatch ? <Text>{selectedWatch}</Text> : <Text>Select Case Size</Text>}</Text>
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
