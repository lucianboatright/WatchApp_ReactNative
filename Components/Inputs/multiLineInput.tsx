import React, { FC, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { View, TextInput, TextInputProps } from 'react-native';

interface Props {
    sendMessage: (value: string) => void;
    setHeight: any;
    setBorder: any;
}

const UselessTextInput = (props: JSX.IntrinsicAttributes & JSX.IntrinsicClassAttributes<TextInput> & Readonly<TextInputProps> & Readonly<{ children?: ReactNode; }>) => {
  return (
    <TextInput
    placeholder='Enter Any Extra Info Here'
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={100}
    />
  );
}

const App : FC <Props> = (props) => {
  const [value, onChangeText] = useState<string>('');

  const [styleing, setStyling] = useState<any>(null)
  const [borders, setBorders] = useState<any>(null)

  useEffect(() => {
      props.sendMessage(value)
      setStyling(props.setHeight)
      setBorders(props.setBorder)
  })

  // If you type something in the text box that is a color, the background will change to that
  // color.
  return (
    <View
      style={{
        backgroundColor: value,
        borderBottomColor: 'grey',
        // borderBottomWidth: 1,
        // style={border}
        borderTopColor: '#000000',
        borderTopWidth: 1,

      }}>
      <UselessTextInput
        multiline
        numberOfLines={4}
        onChangeText={(text: SetStateAction<string>) => onChangeText(text)}
        value={value}
        style={[styleing, borders]}
      />
    </View>
  );
}

export default App;