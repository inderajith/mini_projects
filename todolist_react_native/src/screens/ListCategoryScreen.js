import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper';
import { SimpleLineIcons } from '@expo/vector-icons';

const ListCategoryScreen = ({navigation}) => {    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lists</Text>
            <View style={styles.cardContainer}>
                <View style={styles.card}>
                    <SimpleLineIcons name="notebook" size={30} color="red" />
                    <Text style={styles.cardTitle}>All</Text>
                    <Text style={styles.cardTask}>23 tasks</Text>
                </View>
                <View style={styles.card}>
                    <SimpleLineIcons name="notebook" size={30} color="red" />
                    <Text style={styles.cardTitle}>All</Text>
                    <Text style={styles.cardTask}>23 tasks</Text>
                </View>
                <View style={styles.card}>
                    <SimpleLineIcons name="notebook" size={30} color="red" />
                    <Text style={styles.cardTitle}>All</Text>
                    <Text style={styles.cardTask}>23 tasks</Text>
                </View>
                <View style={styles.card}>
                    <SimpleLineIcons name="notebook" size={30} color="red" />
                    <Text style={styles.cardTitle}>All</Text>
                    <Text style={styles.cardTask}>23 tasks</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal:20,
        marginVertical:30
    },
    cardContainer:{
        marginVertical:30,
        marginHorizontal:20,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        alignContent:'space-between',
        width:500        
        
    },
    card:{
        // borderWidth: 1,
        // marginRight:10,
        borderRadius:5,
        width:120,
        paddingHorizontal:20,
        paddingTop:30,
        paddingBottom:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.15,
        shadowRadius: 0.84,
        elevation: 6,
    },
    title:{
        fontSize:40,
    },
    cardTitle:{
        marginTop:15,
        marginBottom:5,
        fontSize:20
    },
    cardTask:{
        color:'grey'
    }
})

export default ListCategoryScreen
