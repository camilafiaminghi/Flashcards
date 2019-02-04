import { Platform } from 'react-native'
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation'
import { textColorInverse, textColor, pColorDark } from '../utils/colors'
import Decks from '../containers/Decks'
import AddDeck from '../containers/AddDeck'

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
	initialRouteName: 'Decks',
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

const AppTabs = (Platform.OS === 'ios')
	? createBottomTabNavigator(Tabs, TabNavigationOptions)
	: createMaterialTopTabNavigator(Tabs, TabNavigationOptions)

export default AppTabs
