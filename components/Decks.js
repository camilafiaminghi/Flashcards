import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function () {
	return (
		<View style={styles.container}>
			<Text>Decks</Text>
		</View>
	)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
