/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'

import { composeAPI } from '@iota/core'
import { attachToTangle } from '@iota/pearl-diver-react-native'

// Creates an iota API object which uses our native module
const iota = composeAPI({
    provider: 'http://localhost:14265', // Replace this with your node
    attachToTangle,
})

const depth = 3
const minWeightMagnitude = 9

const sendTransaction = () =>
    iota
        .prepareTransfers(
            '9'.repeat(81), // test seed
            [
                {
                    address: 'A'.repeat(81), // test transfer
                    value: 0,
                },
            ]
        )
        // sendTrytes now calls attachToTangle from native module
        .then(trytes => iota.sendTrytes(trytes, depth, minWeightMagnitude))
        .then(transactions => {
            console.log('Tail transaction hash:', transactions[0].hash)
        })
        .catch(err => {
            console.log('Something went wrong:', err.stack || error)
        })

sendTransaction()

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
})

type Props = {}
export default class App extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.welcome}>
                    This is an example app demonstrating transaction issuance with native PoW. Check the logs to see
                    your transaction!
                </Text>
                <Text style={styles.instructions}>Check App.js to see how it works!</Text>
                <Text style={styles.instructions}>{instructions}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
})
