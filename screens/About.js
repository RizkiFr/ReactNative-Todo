import React from 'react'
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native'
import { Icon } from 'native-base';

export default class About extends React.Component{
    static navigationOptions = {
        title: "About",
        headerStyle:{
            backgroundColor: '#03A9F4'
        },
        headerTintColor: '#fff'
    }

    render(){
        return(
            <View style={styles.container}>
                <View>
                    <Text style={styles.title} onPress={()=>Linking.openURL('intent://instagram.com/_u/rizki.frr/#Intent;package=com.instagram.android;scheme=https;end')}>Made with <Icon name="heart" style={styles.title} /> &amp; <Icon name="cafe" style={styles.title} /> by Rizki Fr.</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title:{
        fontSize: 18,
        color: 'grey'
    },
    container:{
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        
    }
})