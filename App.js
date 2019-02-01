import React, { Component } from 'react'
import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { Constants } from 'expo'
import { createBottomTabNavigator, createMaterialTopTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation'
import reducers from './reducers'
import { textColorInverse, textColor, pColor, pColorLight, pColorDark, sColor, sColorLight, sColorDark } from './utils/colors'
import AppStatusBar from './components/AppStatusBar'
/* VIEWS */
import Decks from './containers/Decks'
import Deck from './containers/Deck'
import AddDeck from './containers/AddDeck'
import AddCard from './containers/AddCard'
import Quiz from './containers/Quiz'

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
	},
	AddDeck: {
		screen: AddDeck,
		navigationOptions: {
			tabBarLabel: 'New Deck'
		}
	}
}

const TabNavigationOptions = {
	navigationOptions: {
		header: null
	},
	tabBarOptions: {
		activeTintColor: (Platform.OS === 'ios') ? textColorInverse: textColorInverse,
		activeBackgroundColor: pColorDark,
		indicatorStyle: {
			backgroundColor: textColor,
			borderTopWidth: 2
    },
		style: {
			height: 50,
			backgroundColor: pColorDark,
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

const stackNavOptions = (headerColor, backColor, title) => ({
	headerTintColor: headerColor,
  headerStyle: {
  	backgroundColor: backColor,
    marginTop: (- Constants.statusBarHeight)
  }
})

const AppNavigator = createStackNavigator({
  Home: {
    screen: TabsContainer,
    navigationOptions: {
      header: null
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: stackNavOptions(textColorInverse, pColorDark)
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: stackNavOptions(textColorInverse, pColorDark)
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: stackNavOptions(textColorInverse, pColorDark)
  }
})

const AppNavigatorContainer = createAppContainer(AppNavigator)

export default class App extends Component {
	render() {
    return (
    	<Provider store={store}>
    		<AppStatusBar backgroundColor={pColorDark}/>
	      <AppNavigatorContainer />
	    </Provider>
    );
  }
}
