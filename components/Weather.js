import { View, Text, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'

const api = {
    url: 'https://api.openweathermap.org/data/2.5/weather?',
    key: ' ',
    icons: 'https://openweathermap.org/img/wn/'
}

export default function Weather(props) {

    const [temp, setTemp] = useState(0)
    const [description, setDescription] = useState('')
    const [icon, setIcon] = useState('')


    useEffect(() => {
        const url = api.url +
            'lat=' + props.latitude +
            '&lon=' + props.longitude +
            '&units=metric' +
            '&appid=' + api.key

        fetch(url)
            .then(res => res.json())
            .then((json) => {
                console.log(json)
                setTemp(json.main.temp)
                setDescription(json.weather[0].description)
                setIcon(api.icons + json.weather[0].icon + '@2x.png')
            })
            .catch((error) => {
                setDescription('Error retrieving weather information')
                console.log(error)
            })
    }, [])

    return (
        <View>
            <Text style={styles.temp}>{temp}</Text>
            {icon &&
                <Image source={{uri: icon}} style={{ width: 100, height: 100 }} />
            }
            <Text>{description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    temp: {
        fontSize: 16,
        fontWeight: 'normal' ,
        marginTop: 8,
        marginBottom: 8,
    },

})