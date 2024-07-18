import { Image, Modal, PermissionsAndroid, Platform, Pressable, Text, View } from "react-native";
import { StyleSheet, TextInput } from 'react-native';
import React from 'react';
import * as ImagePicker from 'react-native-image-picker';

export type AddUserModalProps = {
    name: string;
    visible: boolean;
    onSubmit: Function;
};

const options: ImagePicker.CameraOptions = {
    mediaType: "photo",
    saveToPhotos: true
}

export function AddUserModal({
    visible,
    onSubmit,
    name
}: AddUserModalProps) {
    const [playerName, onChangePlayerName] = React.useState('');
    const [playerImage, OnChangePlayerImage] = React.useState<string>()
    var handleCamerClick = () => {
        ImagePicker.launchCamera(options, (response) => {
            response.assets?.forEach((asset) => {
                OnChangePlayerImage(asset.uri);
                console.log(asset.uri);
            })
            console.log(response);
        })
    }

    const onSavePress = () => {
        onSubmit(playerName, playerImage);

        name = playerName;
    };

    return <View >
        <Modal
            animationType="slide"
            style={styles.modal}
            transparent={true}
            visible={visible}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Create player</Text>
                    <View style={styles.formView}>
                        <Pressable style={styles.circleView} onPress={handleCamerClick}>
                            {
                                (playerImage === undefined) ? 
                                    (<Text>Upload Image</Text>) :
                                     (<Image source={{ uri: playerImage,}}
                                resizeMode='contain'></Image>)
                            }
                            </Pressable>
                        <TextInput placeholder="Name"
                            value={playerName} autoFocus={true} onChangeText={onChangePlayerName} style={styles.textInput}></TextInput>
                    </View>
                    <View style={styles.saveView}>
                        <Pressable onPress={onSavePress}><Text style={styles.saveText}>Save</Text></Pressable>
                    </View>

                </View>

            </View>
        </Modal>
    </View>;
}

const styles = StyleSheet.create({
    modal: {
        fontSize: 28,
        lineHeight: 32,
        marginTop: -6,
        padding: 10
    },
    textInput: {
        fontSize: 14,
        lineHeight: 32,
        width: 300,
        borderColor: '#6750A4',
        marginTop: 40,
        borderRadius: 6,
        borderWidth: 2,
        paddingLeft: 10,
    },
    circleView: {
        width: 80,
        height: 80,
        backgroundColor: "#E8E8E8",
        borderRadius: 1000, // High value
        borderColor: '#FFC700',
        borderStyle: 'solid',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    circleViewText: {

    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
    },
    modalView: {
        margin: 20,
        backgroundColor: '#F7F7F7',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    formView: {
        alignItems: 'center',
    },
    saveView: {
        alignItems: 'center',
    },
    saveText: {
        marginTop: 40,
        fontSize: 18,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: '#FFC700'
    }
});