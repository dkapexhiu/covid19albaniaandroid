import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';

import DataList from './DataList.js';
import colors from './config/colors.js';

export default class HomeData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: '',
      currentTotal: 0,
      currentRecovered: 0,
      currentDeceased: 0,
      newDayTotal: 0,
      newDayRecovered: 0,
      newDayDeceased: 0
    };
  }

fetchUsers(){
  fetch("https://raw.githubusercontent.com/dkapexhiu/covid19albaniaandroid/master/covidData.json")
    .then(response => response.json())
    .then((responseJson)=> {
      this.setState({
       loading: false,
       dataSource: responseJson
      })
      
    })
    .catch(error=>console.log(error)) //to catch the errors if any
    // console.log(responseJson)
    // this.calculateCount();
  
}

fetchTotal(){
  fetch("https://raw.githubusercontent.com/dkapexhiu/covid19albaniaandroid/master/total.json")
    .then(response => response.json())
    .then((responseTot)=> {
      this.setState({
        currentTotal: responseTot[0].Konfirmuar,
        currentRecovered: responseTot[0].Sheruar,
        currentDeceased: responseTot[0].Vdekje
      })
    })
    .catch(error=>console.log(error)) //to catch the errors if any
    // console.log(responseJson)
    // this.calculateCount();
  
}

  componentDidMount() {
    this.fetchUsers();
    this.fetchTotal();
  }

  /* componentDidUpdate(){
    this.calculateCount();
  } */

  handleUpdatedData() {}

  handleDataList = () => {
    // console.log("asdasd", this.state.dataSource.length)
    if (this.state.dataSource.length > 0) {
      return this.state.dataSource.map(function(element) {
        // console.log(element);
        return (
          <View key={element.id}>
            <DataList
              key={element.id}
              state={element.state}
              recovered={element.recovered}
              deceased={element.deaths}
              total={
                element.confirmed +
                element.recovered +
                element.deaths
              }
              recoveredChanges={element.rChanges}
              deceasedChanges={element.dChanges}
              heading={false}
              active={element.active}
            />
          </View>
        );
      });
    }

    /* 
      console.log("asdasd", this.state.dataSource.length)
      if(this.state.dataSource.length > 0){
        this.state.dataSource.forEach(function(element){
          console.log(element);
          return (
          <View>
          <DataList 
            state={element.state} 
            recovered={element.recovered} 
            Deceased={element.deaths} 
            total= {element.confirmed+element.recovered+element.deaths+element.active}
            heading={true}
            />
            </View>
            );
      });
      } */
  };

  render() {
    // console.log("erer", this.state.dataSource)
    // console.log("erer", this.state.currentRecovered)
    // console.log("erer", JSON.stringify(dataCovid) )
    const upArrow = '↑';
    if (this.state.currentActive == 0) {
      this.calculateCount();
    }
    return (
      <View style={styles.container}>
        {/* <ScrollView> */}
        <View style={styles.containerTop}>
          <View style={styles.totalContainerOne}>
            <Text style={[styles.textStyle, styles.textTotal]}>Total</Text>
            <Text>
              {this.state.currentTotal}
            </Text>
          </View>
          <View style={styles.totalContainerTwo}>
            <View style={styles.recoveredContainer}>
              <Text style={[styles.textStyle, styles.textRecovered]}>
                Sheruar
              </Text>
              <Text>
                {this.state.currentRecovered}
              </Text>
            </View>
            <View style={styles.DeceasedContainer}>
              <Text style={[styles.textStyle, styles.textDeceased]}>
                Vdekje
              </Text>
              <Text>
                {this.state.currentDeceased}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.containerBottom}>
          <DataList
            key="heading"
            state="Qyteti"
            active="Aktiv"
            heading={true}
          />
          {/* <DataList state="State" total="Total" recovered="Recovered" Deceased="Deceased" heading={true}/> */}

          {this.handleDataList()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // width : '100%',
    // flex: 1,
    // height : '100%',
    // height: 1500,
    // flexDirection : 'row',
    // backgroundColor: 'blue',
    // alignItems: 'center',
    // justifyContent: 'space-evenly',
    // marginTop : Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    // elevation : 5,
    marginBottom: 5,
  },

  containerTop: {
    // flex: 0.3,
    // height : '15%',
    height: Dimensions.get('window').height / 3,
    // flexDirection : 'row',
    // backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    // marginTop : Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    // elevation : 5
  },
  totalContainerOne: {
    height: '45%',
    // flex: 0.8,
    width: '90%',
    backgroundColor: '#eeeeee',
    elevation: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  textTotal: {
    color: colors.totalColor,
  },
  totalContainerTwo: {
    // flex: 0.8,
    width: '100%',
    height: '45%',
    // backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  recoveredContainer: {
    // flex: 1,
    width: '42%',
    // height : '45%',
    backgroundColor: '#eeeeee',
    elevation: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  textRecovered: {
    color: colors.recoveredColor,
  },
  DeceasedContainer: {
    // flex: 1,
    width: '42%',
    // height : '45%',
    backgroundColor: '#eeeeee',
    elevation: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  textDeceased: {
    color: colors.DeceasedColor,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: '700',
  },

  containerBottom: {
    position: 'relative',
    paddingTop: 10,
    // flex: 0.4,
    // height:'85%',
    // flexDirection : 'row',
    // backgroundColor: 'blue',
    // alignItems: 'center',
    // justifyContent: 'space-evenly',
    // marginTop : Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    // elevation : 5
  },
});
