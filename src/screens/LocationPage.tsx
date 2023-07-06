
import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, Button } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import WrapperView from './WrapperView';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Position = {
    latitude: number;
    longitude: number;
};

export default function LocationPage() {
    const getCurrentPosition = () => {
        Geolocation.getCurrentPosition(
            (pos) => {
                setPosition({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
            },
            (error) => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
            { enableHighAccuracy: true }
        );
    };

    const [position, setPosition] = useState<Position | null>(null);

    return (
        <WrapperView>
            <View style={styles.container}>
                <Text style={styles.title}>Latitude: {position?.latitude}</Text>
                <Text style={styles.title}>Longitude: {position?.longitude}</Text>
                <TouchableOpacity onPress={getCurrentPosition} style={styles.btn} >
                    <Text style={styles.btnText}>Get Current Position</Text>
                </TouchableOpacity>
            </View>
        </WrapperView>
    );
}

const styles = StyleSheet.create({
    title: {
        fontWeight: '500',
    },
    container: {
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
        marginTop: 16,
        backgroundColor: '#2474a8',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    btnText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold'
    },
});