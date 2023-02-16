import React, { useState } from 'react';
import { Text, View, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { gStyle } from '../styles/style';

export const Main = ({ onLayout, navigation }) => {

    const [news, setNews] = useState([
        { name: 'Google', anons: 'Google!', full: 'Google is cool', key: '1', img: require('../assets/google.jpg') },
        { name: 'Apple', anons: 'Apple!', full: 'Apple is cool', key: '2', img: require('../assets/apple.jpg') },
        { name: 'FaceBook', anons: 'FaceBook!', full: 'FaceBook is cool', key: '3', img: require('../assets/facebook.png') },
    ]);

    return (
        <View style={gStyle.main} onLayout={onLayout}>
            <Text style={[gStyle.title, styles.header]}>Главная страница</Text>
            <FlatList data={news} renderItem={({ item }) => (
                <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('FullInfo', item)}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.anons}>{item.anons}</Text>
                    <Image source={item.img}                    
                        style={{ width: '100%', height: 200 }} />
                </TouchableOpacity>
            )} />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        marginBottom: 10,
        color:'red'
    },
    item: {
        width:'100%',
        marginBottom: 30
    },
    title:{
        fontFamily:'mt-bold',
        fontSize:22,
        textAlign: 'center',
        marginTop: 20,
        color: '#474747'
    },
    anons: {
        fontFamily:'mt-light',
        fontSize:16,
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 5,
        color: '#474747'
    }
});
