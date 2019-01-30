import React, { Component } from 'react'
import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator, createMaterialTopTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation'
import reducers from './reducers'
import { white, purple } from './utils/colors'
import AppStatusBar from './components/AppStatusBar'
import Decks from './components/Decks'

const store = createStore(
	reducers(),
	applyMiddleware(thunk)
)

const Tabs = {
	Decks: {
		screen: Decks,
		navigationOptions: {
			tabBarLabel: 'Decks'
		}
	}
}

const TabNavigationOptions = {
	navigationOptions: {
		header: null
	},
	tabBarOptions: {
		activeTintColor: (Platform.OS === 'ios') ? purple : white,
		style: {
			height: 56,
			backgroundColor: (Platform.OS === 'ios') ? white : purple,
			shadowColor: 'rgba(0, 0, 0, 0.24)',
			shadowOffset: {
				width: 0,
				height: 3
			},
			shadowRadius: 6,
			shadowOpacity: 1
		}
	}
}

const TabsContainer = (Platform.OS === 'ios')
	? createBottomTabNavigator(Tabs, TabNavigationOptions)
	: createMaterialTopTabNavigator(Tabs, TabNavigationOptions)

const AppNavigator = createStackNavigator({
  Home: {
    screen: TabsContainer,
    navigationOptions: {
      header: null
    }
  }
})

const AppNavigatorContainer = createAppContainer(AppNavigator)

export default class App extends Component {
	render() {
    return (
    	<Provider store={store}>
    		<AppStatusBar backgroundColor={purple}/>
	      <AppNavigatorContainer />
	    </Provider>
    );
  }
}
