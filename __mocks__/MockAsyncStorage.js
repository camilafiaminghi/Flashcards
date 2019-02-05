import storage from './decks'

export default {
	mergeItem: jest.fn(
    item =>
      new Promise((resolve, reject) => {
      	resolve(JSON.stringify(storage))
      })
  ),

  getItem: jest.fn(
    item =>
      new Promise((resolve, reject) => {
        resolve(JSON.stringify(storage))
      })
  ),
}
