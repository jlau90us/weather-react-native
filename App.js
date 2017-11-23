// Weather Native
//
// 1. Create a TextInput to enter a city name. Hook up an event handler to store
//    the value inputted into this.state.locationInputText (remember BookFace?)
// 2. Create a button (e.g. "Get the weather!") that, when pressed, calls
//    the getWeather() function.
// 3. Retrieve the values from the API call, and create the UI components
//    necessary to display them on-screen. Succesfully implement the current
//    weather first, then the forecast.
//
// HINTS
// - Use the this.state.forecast array as provided, to hold the entirety of what comes
//   back from the Dark Sky API, i.e. response.weather.daily.data. Loop through
//   that to create the forecast on-screen.
// - Occasionally, you'll want to conditionally display a component, i.e. only
//   when it actually has a value to show. You'll need to do this with the
//   current icon, like this:
//   {this.state.currentIcon && <Icon name={this.state.currentIcon} size={100} color="#181818" /> }

import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput, Button, StyleSheet, Text, View } from 'react-native';
import { geocodeAndGetWeather, icon } from './Helpers';
import styles from './styles';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      locationInputText: "",
      locationName: "",
      currentTemperature: "",
      currentSummary: "",
      currentIcon: "",
      forecast: []
    };
  }
  locationInputChanged(text) {
    this.setState({
      locationInputText: text
    });
  }
  async getWeather() {
    // Call the geocoding and weather API, get back a location and weather object
    const response = await geocodeAndGetWeather(this.state.locationInputText);

    // Try the following, to see what they contain
    console.log(response.location);
    console.log(response.weather);

    // manipulate state
    this.setState({
      locationText: response.location,
      currentTemperature: Math.round(response.weather.currently.temperature),
      currentSummary: response.weather.currently.summary,
      currentIcon: icon(response.weather.currently.icon),
      forecast: response.weather.daily.data
    });
  }
  render() {
    // Three Views inside the parent view
    // 1. TextInput and Button for city name and to call getWeather()
    // 2. Current weather conditions (styles provided with currentIcon, locationText,
    //    currentTemperature, currentSummary)
    // 3. Forecast (forecastDay, forecastIcon, forecastTemperature)
    //
    // Refer to styles.js to see styles that are already provided.
    let forecast = [];

    if (this.state.forecast.length > 0) {
      for(let i=1; i<=5; i++) {
        forecast.push(
          <View key={i} style={styles.forecastDay}>
            <Text style={styles.forecastIcon}>
              <Icon name={icon(this.state.forecast[i].icon)} size={40} />
            </Text>
            <Text style={styles.forecastTemperature}>
              {Math.round(this.state.forecast[i].apparentTemperatureHigh)}
            </Text>
          </View>
        );
      }
    }

    return (
      <View style={styles.container}>
        <View>
          <TextInput style={styles.inputBox}
                     placeholder="Enter a city"
                     onChangeText={(text) => this.locationInputChanged(text)} />
          <Button onPress={() => this.getWeather()}
                  title="Get the weather!" />
        </View>
        <View style={styles.currentWeather}>
          {/* Current weather conditions */}
          <Text style={styles.currentIcon}>
            {this.state.currentIcon && <Icon name={this.state.currentIcon} size={100} color="#181818" /> }
          </Text>
          <Text style={styles.locationText}>{this.state.locationText}</Text>
          <Text style={styles.currentTemperature}>{this.state.currentTemperature}</Text>
          <Text style={styles.currentSummary}>{this.state.currentSummary}</Text>
        </View>
        <View style={styles.forecast}>
          {forecast}
        </View>
      </View>
    );
  }
}
