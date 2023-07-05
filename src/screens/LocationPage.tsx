
import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, Button } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import WrapperView from './WrapperView';

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
                <Button title="Get Current Position" onPress={getCurrentPosition} />
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
});