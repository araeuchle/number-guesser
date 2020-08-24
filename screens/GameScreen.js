import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, Dimensions } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import {  Ionicons  } from '@expo/vector-icons';
import BodyText from '../components/BodyText';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rand = Math.floor(Math.random() * (max - min)) + min; 

    if (rand === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rand;
    }
};

const renderListItem = (listLength, itemData) => {
    return (<View style={styles.listItem}>
            <BodyText># {listLength - itemData.index}</BodyText>
            <BodyText>{itemData.item}</BodyText>
        </View>)
}

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const {userChoice, onGameOver } = props;

    // Runs after rendering component
    useEffect(() => {
            if (currentGuess === userChoice) {
                onGameOver(pastGuesses.length)
            }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = (direction) => {
        if ((direction === 'lower' && currentGuess < props.userChoice) ||  (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Dont cheat!', 'You know that this is wrong...', [{text: 'Sorry!', style: 'cancel'}]);
            return;
        }

        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses])
    };

    return (
        <View style={styles.screen}>
            <Text>Opponent's guess: </Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name="md-remove" size={24} color="#fff" />
                </PrimaryButton>
                <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name="md-add" size={24} color="#fff" />
                </PrimaryButton>
            </Card>
            <View style={styles.listContainer}>
                <FlatList 
                keyExtractor={(item) => item} data={pastGuesses}
                renderItem={renderListItem.bind(this, pastGuesses.length)}
                contentContainerStyle={styles.list}
                  />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
        width: 300,
        maxWidth: '100%'
    },
    listItem: {
        borderColor: '#000',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    listContainer: {
        width: Dimensions.get('window').width > 350 ? '60%' : '100%',
        flex: 1
    },
    list: {
        justifyContent: 'flex-end',
        flexGrow: 1 
    }

});

export default GameScreen;