import React, { FC, useEffect } from "react";
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    UIManager,
    Platform,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { Card } from "react-native-paper";

import { useNavigation } from '@react-navigation/native';

import { StackNavigationProp } from '@react-navigation/stack';

interface Props {
    inportData: any;
    bgcolor: string;
}

type RootStackParamsList = {
    Home: any;
    Timeline: any;
    Add: any;
    Profile: any;
    NestedScreen: {
        id: string,
        name: string,
    };
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

    const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();

    const settingData = async () => {
        await setData(props.inportData)
    }

    const testing = () => {
        console.log('cliock')
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
                            onPress={() => navigation.navigate('NestedScreen', { name: item.name, id: item.followerId })}
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
        height: 20,
        width: 'auto',
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5,
        paddingTop: 1,
    },
    text: { color: "white", fontWeight: 'bold', fontFamily: 'NunitoBold' }
});