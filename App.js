import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { pColorDark } from './utils/colors'
import { setLocalNotification } from './utils/helpers'
import store from './store'
import AppStatusBar from './components/AppStatusBar'
import AppStackNavigator from './navigation/AppStackNavigator'

export default class App extends Component {
	componentDidMount() {
		setLocalNotification()
	}

	render() {
    return (
    	<Provider store={store}>
    		<AppStatusBar backgroundColor={pColorDark}/>
	      <AppStackNavigator />
	    </Provider>
    );
  }
}
