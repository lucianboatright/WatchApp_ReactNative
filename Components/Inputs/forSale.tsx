import React, { FC, useEffect, useState } from "react";
import { View, Switch, StyleSheet, Text, TextInput } from "react-native";

interface Props {
    sendCost: (cost: string | null) => void
}

const App: FC<Props> = (props) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const [cost, setCost] = useState<string>('Not for sale')

    useEffect(() => {
        props.sendCost(cost)
    })

    return (
        <View style={styles.container}>
            <View>
                <Text style={{ color: '#012A4A', fontSize: 20, paddingTop: 2 }}>For Sale?</Text>
            </View>
            <View>
                <Switch
                    trackColor={{ false: "#767577", true: "#90EE90" }}
                    thumbColor={isEnabled ? "green" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    style={{ marginHorizontal: 4 }}
                />
            </View>
            <View>
                {isEnabled ?
                    <View style={{ flexDirection: 'row' }}><Text style={{ color: '#012A4A', fontSize: 18, fontFamily: 'NunitoSemiBold', }}> :  </Text><TextInput style={styles.forSale} placeholder=" Insert Value in £" onChangeText={setCost} /></View>
                    :
                    <View style={{ flexDirection: 'row' }}><Text style={{ color: '#012A4A', fontSize: 20, fontFamily: 'NunitoBold', }}> : </Text><Text style={{ color: '#012A4A', fontSize: 20, paddingTop: 2, fontFamily: 'NunitoSemiBold', }}> Not For sale</Text></View>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        marginHorizontal: "15%",
        marginTop: 5,
        width: '95%'
    },
    forSale: {
        borderWidth: 1,
        padding: 5,
        borderRadius: 10,
        width: '60%',
        marginTop: 3,
        alignSelf: 'flex-start',
        color: '#012A4A',
    }
});
export default App;