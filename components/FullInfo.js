import React from 'react';
import { Text, View, Image, StyleSheet} from 'react-native';
import { gStyle } from '../styles/style';


export const FullInfo = ({ route }) => {
    return (
        <View style={gStyle.main}>
            <Image source={route.params.img}
                style={{ width: '100%', height: 200}} />
            <Text style={[gStyle.title, styles.header]}>{route.params.name}</Text>
            <Text style={styles.full}>{route.params.full}</Text>
        </View>
    );
}

const styles = StyleSheet.create({   
    full: {
        fontFamily:'mt-light',
        fontSize:20,
        textAlign: 'center',
        marginTop: 20,
        color: 'green'
    },
    header:{
        fontSize: 50,
        marginTop:25
    }
});
