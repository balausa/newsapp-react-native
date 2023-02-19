import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, FlatList, RefreshControl, ActivityIndicator, Alert, Image, Modal, StyleSheet } from 'react-native';
import { gStyle } from '../styles/style';
import { Ionicons } from '@expo/vector-icons';
import Form from './Form';
import axios from 'axios';

export const Main = ({ onLayout, navigation }) => {

    const [modalView, setModalView] = useState(false);
    const [articles, setArticles] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const fetchArticles = () => {
        setIsLoading(true);
        axios.get('https://63ef49ac271439b7fe6b71eb.mockapi.io/api/articles/articles')
            .then(({ data }) => {
                setArticles(data);
            })
            .catch(err => {
                console.log(err);
                Alert('Ошибка', 'Не удалось загрузить данные');
            }).finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(fetchArticles, []);

    const addArticle = (article) => {
        setArticles((list) => {
            // article.id = Math.random().toString();
            return [
                article,
                ...list
            ]
        });
        setModalView(false);
        console.log(article);
        axios.post('https://63ef49ac271439b7fe6b71eb.mockapi.io/api/articles/articles', article)
        .then(res => {
            console.log('res',res);
            console.log(res.data);
        })
    }

    const truncateTitle = (str) => {
        if (str.length > 65) {
            return str.substring(0, 65) + '...';
        }
        return str;
    }

    if (isLoading) {
        return <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <ActivityIndicator size="large" />
            <Text style={{ marginTop: 15 }}>Загрузка...</Text>
        </View>
    }

    return (
        <View style={gStyle.main} onLayout={onLayout}>
            <Modal visible={modalView}>
                <View style={gStyle.main}>
                    <Ionicons name="close" size={34} color="red" style={styles.iconClose} onPress={() => setModalView(false)} />
                    <Text style={styles.title}>Форма добавления статьи</Text>
                    <Form addArticle={addArticle} />
                </View>
            </Modal>
            <Ionicons name="add-circle" size={50} color="green" style={styles.iconAdd} onPress={() => setModalView(true)} />
            <Text style={[gStyle.title, styles.header]}>Каталог статей</Text>
            <FlatList
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchArticles} />}
                data={articles}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('FullInfo', item)}>
                        <Text style={styles.title}>{truncateTitle(item.title)}</Text>
                        <Text style={styles.createdAt}>{item.createdAt}</Text>
                        <Image source={{ uri: item.imageUrl }}
                            style={{ width: '100%', height: 200 }} />
                    </TouchableOpacity>
                )} />
        </View>
    );
}

const styles = StyleSheet.create({
    iconAdd: {
        textAlign: 'center',
        marginBottom: 15
    },
    iconClose: {
        textAlign: 'right'
    },
    header: {
        marginBottom: 10,
        color: 'red'
    },
    item: {
        width: '100%',
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(0,0,0,0.1)',
        borderStyle: 'solid',
        paddingBottom: 20

    },
    title: {
        fontFamily: 'mt-bold',
        fontSize: 25,
        textAlign: 'center',
        marginTop: 20,
        color: '#474747'
    },
    createdAt: {
        fontFamily: 'mt-light',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 5,
        color: '#474747'
    }
});
