import React from 'react';
import { Text, View, Image, StyleSheet,ScrollView } from 'react-native';
import { gStyle } from '../styles/style';
import styled from 'react-native-styled-components';

const ArticleImage = styled(Image, {
    borderRadius: 10,
    width: '100%',
    height: 200,
    marginBottom: 20
});

export const FullInfo = ({ route }) => {
    return (
        <View style={{ padding: 10 }}>
            <ScrollView> 
            <ArticleImage  source={{ uri: route.params.imageUrl }} />
            <Text style={[gStyle.title, styles.header]}>{route.params.title}</Text>
            <Text style={styles.text}>{route.params.text}</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'mt-italic',
        fontSize: 16,
        textAlign: 'justify',
        marginTop: 20
    },
    header: {
        fontSize: 20,
        marginTop: 5,
        textAlign:'center',        
    }
});
