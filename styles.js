import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  // TextInput for the city name
  inputBox: {
    width: 300,
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 20,
    padding: 5,
    textAlign: 'center'
  },
  // View for current weather conditions
  currentWeather: {
    alignItems: 'center'
  },
  // The Icon can't be used by itself, it needs to be wrapped in a Text component.
  // This is that component.
  currentIcon: {
    marginBottom: 20
  },
  // Text to hold this.state.locationName
  locationText: {
    fontSize: 24
  },
  // Text for current temperature
  currentTemperature: {
    fontSize: 50
  },
  // Text for current summary
  currentSummary: {
    fontSize: 16
  },
  // View for 5-day forecast
  forecast: {
    flexDirection: 'row'
  },
  // View for each day of the forecast
  forecastDay: {
    margin: 10,
    alignItems: 'center'
  },
  // Icon for each day of the forecast
  forecastIcon: {
    marginBottom: 20
  },
  // Text for the temperature for each day of the forecast
  forecastTemperature: {
    fontSize: 30
  },
  // Text for the summary for each day of the forecast
  forecastSummary: {
    fontSize: 12
  }
});

export default styles;
