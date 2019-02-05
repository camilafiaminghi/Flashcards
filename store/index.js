import { createStore, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import middleware from '../middleware';
import reducers from '../reducers'; // COMBINED REDUCERS


const persistConfig = {
	key: 'root',
	storage,
	stateReconciler: autoMergeLevel2
}

export const store = createStore(
	persistReducer(persistConfig, reducers),
	compose(middleware)
)

export const persistor = persistStore(store)
