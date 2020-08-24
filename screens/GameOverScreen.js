import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import BodyText from '../components/BodyText';
import Colors from '../constants/colors';
import PrimaryButton from '../components/PrimaryButton';

const GameOverScreen = props => {
    return (
        <ScrollView>
        <View style={styles.screen}>
            <BodyText>The Game is over!</BodyText>
            <View style={styles.imageContainer}>
                <Image 
                    fadeDuration={1000}
                    source={require('../assets/success.png')} 
                    style={styles.image}
                    resizeMode="cover"
                    />
            </View>

            <View style={styles.resultContainer}>
                <BodyText style={styles.resultText}>
                    Your phone needed <Text style={styles.highlight}>{props.rounds}</Text> rounds 
                    to guess the number <Text style={styles.highlight}>{props.userNumber}</Text>
                </BodyText>
            </View>
            
            
            <PrimaryButton onPress={props.onRestart}>
                New Game
            </PrimaryButton>
        </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width:  Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7 ,
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        borderWidth: 3,
        borderColor: '#000',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 30
    },
    image: {
      width: '100%',
      height: '100%'
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    },
    resultContainer: {
        width: '80%',
        marginHorizontal: 30,
        marginVertical: Dimensions.get('window').height / 60
    },
    resultText: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height < 400 ? 16 : 20
    }
});

export default GameOverScreen;