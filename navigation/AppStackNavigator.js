import { Platform } from 'react-native'
import { Constants } from 'expo'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { textColorInverse, pColorDark } from '../utils/colors'
import AppTabs from './AppTabs'
import Deck from '../containers/Deck'
import AddCard from '../containers/AddCard'
import Quiz from '../components/Quiz'

const stackNavOptions = (headerColor, backColor, title) => ({
	headerTintColor: headerColor,
  headerStyle: {
  	backgroundColor: backColor,
    marginTop: (- Constants.statusBarHeight)
  }
})

const AppStackNavigator = createStackNavigator({
  Home: {
    screen: AppTabs,
    navigationOptions: {
      header: null
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: stackNavOptions(textColorInverse, pColorDark)
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: stackNavOptions(textColorInverse, pColorDark)
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: stackNavOptions(textColorInverse, pColorDark)
  }
})

export default createAppContainer(AppStackNavigator)
