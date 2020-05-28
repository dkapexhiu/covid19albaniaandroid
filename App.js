import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Button, TouchableOpacity } from 'react-native';
import Header from './components/Header'
import HomeData from './components/HomeData'
import { useState, useEffect } from "react";

import colors from './components/config/colors.js'
import { Updates } from 'expo';


export default function App() {

  const [dta, setDt] = useState(new Date().toLocaleString());

  useEffect(() => {
      let secTimer = setInterval( () => {
        setDt(new Date().toLocaleString())
      },1000)

      return () => clearInterval(secTimer);
  }, []);

  // console.log("hi")
  return (
      <View style={styles.container}>
    <ScrollView>
        <Header/>
        <View style={styles.dateTimeStyle}>
        <Text style={styles.dateTimeTextStyle}>•{dta}•</Text>
        </View>
        <TouchableOpacity
                style ={{
                    height: 40,
                    width:160,
                    borderRadius:20,
                    backgroundColor : "transparent",
                    marginLeft :'auto',
                    marginRight:'auto',
                    marginTop :0
                }}>
        <Button onPress={() => Updates.reload() }           
            title="Refresh"
          />
        </TouchableOpacity>
        <HomeData/>
        {/* <Text>Open up App.js to start working on your app test best !</Text> */}
        
    </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // position : 'absolute',
    height : '100%',
    // flex: 1,
    backgroundColor: colors.primary,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  dateTimeStyle: {
    // position : 'absolute',
    // height : '100%',
    height: Dimensions.get('window').height/15,
    // flex: 1,
    // backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateTimeTextStyle: {
    fontSize : 15,
    fontWeight : '700',
    color : colors.timeColor,
  },
  button: {
    color: colors.white,
  }
});
