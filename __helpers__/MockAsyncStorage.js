import storage from './entries'

export default {
	mergeItem: jest.fn(
    item =>
      new Promise((resolve, reject) => {
      	// resolve({ [FLASHCARDS_STORAGE_KEY]: JSON.stringify(storage) })
      	resolve(JSON.stringify(storage))
      })
  ),

  getItem: jest.fn(
    item =>
      new Promise((resolve, reject) => {
        // resolve({ [FLASHCARDS_STORAGE_KEY]: JSON.stringify(storage) })
        resolve(JSON.stringify(storage))
      })
  ),
}
