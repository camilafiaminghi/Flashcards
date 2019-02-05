import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { pColorDark } from './utils/colors'
import { setLocalNotification } from './utils/helpers'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'
import AppStatusBar from './components/AppStatusBar'
import AppStackNavigator from './navigation/AppStackNavigator'

export default class App extends Component {
	componentDidMount() {
		setLocalNotification()

		// CLEAN STORAGE
		// persistor.purge()
	}

	render() {
    return (
    	<Provider store={store}>
    			<PersistGate loading={null} persistor={persistor}>
    				<AppStatusBar backgroundColor={pColorDark}/>
		  			<AppStackNavigator />
	  			</PersistGate>
	    </Provider>
    );
  }
}
