import React, {useState, useEffect, FC} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Dimensions} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';

const {height, width} = Dimensions.get('screen')

const items = [
  {id: 1, name: 'Rolex'},
  {id: 2, name: 'Omega'},
  {id: 3, name: 'Timex'},
  {id: 4, name: 'Casio'},
  {id: 5, name: 'Timor'},
  {id: 6, name: 'Seiko'},
  {id: 7, name: 'Vostok'},
  {id: 8, name: 'Enicar'},
  {id: 9, name: 'Smiths'},
  {id: 10, name: 'J W Benson'},
];

interface Props {
    sendSelectedWatch: (selectedWatch: any | null) => void;
}

const App : FC <Props> = (props) => {
//   const [serverData, setServerData] = useState([]);
  const [selectedWatch, setSelectedWatch] = useState<any>(null)

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Text style={styles.titleText}>
            Select Details
        </Text>
        <View style={{flexDirection: 'row'}}>
            <SearchableDropdown
            onTextChange={(text) => console.log(text)}
            onItemSelect={(item) => setSelectedWatch(item.name)}
            containerStyle={{padding: 0}}
            textInputStyle={{
                // Inserted text style
                padding: 5,
                paddingLeft: 10,
                borderWidth: 1,
                borderColor: '#ccc',
                backgroundColor: '#FAF7F6',
                width: 150,
                borderRadius: 20,
            }}
            itemStyle={{
                padding: 8,
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
            placeholder="Select Watch"
            resPtValue={false}
            underlineColorAndroid="transparent"
            />
            <Text style={{fontSize: 25}}> : </Text>
            <Text style={{fontSize: 25, paddingTop: 1}}>{selectedWatch ? <Text>{selectedWatch}</Text> : <Text>Select Watch</Text>}</Text>
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
    padding: 2,
  },
});




// import React, { Component, FC, Fragment } from 'react';
// import SearchableDropdown from 'react-native-searchable-dropdown';

// var items = [
//   {
//     id: 1,
//     name: 'JavaScript',
//   },
//   {
//     id: 2,
//     name: 'Java',
//   },
//   {
//     id: 3,
//     name: 'Ruby',
//   },
//   {
//     id: 4,
//     name: 'React Native',
//   },
//   {
//     id: 5,
//     name: 'PHP',
//   },
//   {
//     id: 6,
//     name: 'Python',
//   },
//   {
//     id: 7,
//     name: 'Go',
//   },
//   {
//     id: 8,
//     name: 'Swift',
//   },
// ];
// const App : FC <Props> = (props) =>  {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedItems: [
//         {
//           id: 7,
//           name: 'Go',
//         },
//         {
//           id: 8,
//           name: 'Swift',
//         }
//       ]
//     }
//   }
//   render() {
//   return (
//         <Fragment>
//           {/* Multi */}
//           <SearchableDropdown
//             multi={true}
//             selectedItems={this.state.selectedItems}
//             onItemSelect={(item) => {
//               const items = this.state.selectedItems;
//               items.push(item)
//               this.setState({ selectedItems: items });
//             }}
//             containerStyle={{ padding: 5 }}
//             onRemoveItem={(item, index) => {
//               const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
//               this.setState({ selectedItems: items });
//             }}
//             itemStyle={{
//               padding: 10,
//               marginTop: 2,
//               backgroundColor: '#ddd',
//               borderColor: '#bbb',
//               borderWidth: 1,
//               borderRadius: 5,
//             }}
//             itemTextStyle={{ color: '#222' }}
//             itemsContainerStyle={{ maxHeight: 140 }}
//             items={items}
//             defaultIndex={2}
//             chip={true}
//             resetValue={false}
//             textInputProps={
//               {
//                 placeholder: "placeholder",
//                 underlineColorAndroid: "transparent",
//                 style: {
//                     padding: 12,
//                     borderWidth: 1,
//                     borderColor: '#ccc',
//                     borderRadius: 5,
//                 },
//                 onTextChange: text => alert(text)
//               }
//             }
//             listProps={
//               {
//                 nestedScrollEnabled: true,
//               }
//             }
//           />
//           {/* Single */}
//           <SearchableDropdown
//             onItemSelect={(item) => {
//               const items = this.state.selectedItems;
//               items.push(item)
//               this.setState({ selectedItems: items });
//             }}
//             containerStyle={{ padding: 5 }}
//             onRemoveItem={(item, index) => {
//               const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
//               this.setState({ selectedItems: items });
//             }}
//             itemStyle={{
//               padding: 10,
//               marginTop: 2,
//               backgroundColor: '#ddd',
//               borderColor: '#bbb',
//               borderWidth: 1,
//               borderRadius: 5,
//             }}
//             itemTextStyle={{ color: '#222' }}
//             itemsContainerStyle={{ maxHeight: 140 }}
//             items={items}
//             defaultIndex={2}
//             resetValue={false}
//             textInputProps={
//               {
//                 placeholder: "placeholder",
//                 underlineColorAndroid: "transparent",
//                 style: {
//                     padding: 12,
//                     borderWidth: 1,
//                     borderColor: '#ccc',
//                     borderRadius: 5,
//                 },
//                 onTextChange: text => alert(text)
//               }
//             }
//             listProps={
//               {
//                 nestedScrollEnabled: true,
//               }
//             }
//         />
//       </Fragment>
//   );
//   }
// }