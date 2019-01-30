import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { handleReceiveEntries } from '../actions'
import { gray, lightPurp } from '../utils/colors'

class Decks extends Component {

	static propTypes = {
		handleEntries: PropTypes.func.isRequired,
		decksKeys: PropTypes.array.isRequired,
		decks: PropTypes.object.isRequired
	}

	componentDidMount() {
		const { handleEntries } = this.props
		// handleEntries()
	}

	render() {
		const { decks, decksKeys } = this.props

		return (
			<View style={styles.container}>
				<FlatList
					data={decksKeys}
					style={[styles.container, {marginLeft: 4}]}
					showsVerticalScrollIndicator={false}
          renderItem={
          	({item}) => (
		          <TouchableOpacity style={styles.item}>
		            <Text style={styles.text}>{item}</Text>
		            <Text style={styles.detail}>
		            	{decks[item].questions.length} { decks[item].questions.length === 1 && 'card' } { decks[item].questions.length !== 1 && 'cards' }
		            </Text>
		          </TouchableOpacity>
          	)
          }
          removeClippedSubviews={true}
          keyExtractor={item => item} />
			</View>
		)
	}
}

export const mapStateToProps = (state) => {

	console.log(state)

	const obj = {
		'JavaScript' : {
			title: 'JavaScript',
			questions: [{}]
		},
		'Test1' : {
			title: 'Test1',
			questions: [{},{},{}]
		},
		'Test2' : {
			title: 'Test2',
			questions: []
		},
		'Test3' : {
			title: 'Test3',
			questions: []
		},
		'Test4' : {
			title: 'Test4',
			questions: []
		},
		'Test5' : {
			title: 'Test5',
			questions: []
		}
	}

	return {
		decksKeys: Object.keys(obj),
		decks: obj
	}
}

export const mapDispatchToProps = (dispatch) => {
  return {
    handleEntries: () => dispatch(handleReceiveEntries())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Decks)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },
  item: {
  	flex: 1,
  	flexGrow: 1,
  	alignItems: 'center',
  	justifyContent: 'center',
  	backgroundColor: 'white',
  	marginTop: 2,
  	marginBottom: 2,
  	marginRight: 8,
  	marginLeft: 4,
  	borderRadius: 4,
  	height: 80
  },
  text: {
  	fontSize: 16,
  	fontWeight: 'bold',
  	color: '#333333'
  },
  detail: {
  	fontSize: 12,
  	color: gray
  }
})
