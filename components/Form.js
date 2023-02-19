import React, { useState } from 'react';
import { TextInput, Text, View, Button, StyleSheet, Image,ScrollView } from 'react-native';
import styled from 'react-native-styled-components';
import { Formik } from 'formik';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const MainContainer = styled(View, {
    flex: 1,
    justifyContent: 'space-between'
});

export default function Form({ addArticle }) {
    const [image, setImage] = useState(null);

    const pickImage = async (handleChange) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result)
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            handleChange(result.uri)
        }
    };
    return (
        <MainContainer>
            <ScrollView>
            <Formik
                initialValues={{
                    title: '',
                    createdAt: '',
                    text: '',
                    imageUrl: ''
                }}
                onSubmit={(values, action) => {
                    // console.log(values);
                    addArticle(values);
                    action.resetForm();
                }}>
                {(props) => (
                    <View>
                        <Text style={styles.title}>Название статьи</Text>
                        <TextInput
                            style={styles.input}
                            value={props.values.title}
                            placeholder='Введите название'
                            onChangeText={props.handleChange('title')} />
                        <Text style={styles.title}>Дата</Text>
                        <TextInput
                            style={styles.input}
                            value={props.values.createdAt}
                            multiline
                            placeholder='Введите дату'
                            onChangeText={props.handleChange('createdAt')} />
                        <Text style={styles.title}>Текст статьи</Text>
                        <TextInput
                            style={styles.input}
                            value={props.values.text}
                            multiline
                            placeholder='Введите статью'
                            onChangeText={props.handleChange('text')} />
                        <Text style={styles.title}>Загрузите фото для статьи</Text>
                        <MaterialCommunityIcons
                            style={{ paddingVertical: 15 }}
                            name="file-image-plus"
                            size={50}
                            color="black"
                            onPress={() => { pickImage(props.handleChange('imageUrl')) }}
                        />
                        {image && <Image source={{ uri: image }} style={{ width: 150, height: 150, marginVertical: 15, paddingBottom: 15 }} />}
                        <Button
                            title='Добавить'
                            onPress={props.handleSubmit} />
                    </View>
                )}
            </Formik>
            </ScrollView>
        </MainContainer>
    );
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        marginTop: 10,
        padding: 15,
        borderColor: 'silver',
        borderRadius: 5,
        fontSize: 15,
        marginBottom: 10
    },
    title: {
        marginTop: 10,
        paddingLeft: 5,
        fontSize: 20,
        fontFamily: 'mt-italic'
    }
});
