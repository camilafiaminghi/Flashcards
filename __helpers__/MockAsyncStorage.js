import storage from './entries'

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
