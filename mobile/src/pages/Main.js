import React, { useEffect, useState } from 'react'
import { StyleSheet, Image, View, Text } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'

function Main() {
    const [currentRegion, setCurrentRegion] = useState(null)
    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync()
            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true
                })
                const { latitude, longitude } = coords

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                })

            }
        }
        loadInitialPosition()
    }, [])

    if (!currentRegion) {
        return null
    }
    return (
        <MapView initialRegion={currentRegion} style={styles.map} >
            <Marker coordinate={{ latitude: -20.1909471, longitude: -40.2373469 }}>
                <Image style={styles.avatar} source={{ uri: 'https://avatars1.githubusercontent.com/u/22199210?s=460&v=4' }}></Image>
                <Callout>
                    <View style={styles.callout}>
                        <Text style={styles.devName}>Guilherme Henrique</Text>
                        <Text style={styles.devBio}>Ainda não tem bio</Text>
                        <Text style={styles.devTechs}>ReactJS, NodeJS, React Native</Text>
                    </View>
                </Callout>
            </Marker>
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },

    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF',
    },
    callout:{
        width: 260,
    },
    devName: {
        fontWeight: 'bold',
        fontSize: 16
    },
    devBio:{
        color: '#666',
        marginTop: 5,
    },
    devTechs:{
        marginTop: 5,
    }

})
export default Main