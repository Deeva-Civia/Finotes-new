import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import React from 'react';
import {BgQuote, Lamp} from '../../../assets';

const quotesArray = [
  'Clean code is better than clever code',
  'First, solve the problem. Then, write the code.',
  "Code is like humor. When you have to explain it, it's bad.",
  'Programs must be written for people to read, and only incidentally for machines to execute.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  "Clean code is not written by following rules. It's written by following understanding.",
  'The best error message is the one that never shows up.',
  'Simplicity is the soul of efficiency. — Austin Freeman',
  'A good programmer looks both ways before crossing a one-way street.',
  'First, solve the problem. Then, write the code. — John Johnson',
  "Code is like humor. When you have to explain it, it's bad. — Cory House",
  'Software is a great combination between artistry and engineering. — Bill Gates',
  'Talk is cheap. Show me the code. — Linus Torvalds',
  "Programming isn't about what you know; it's about what you can figure out.",
];

const Quotes = () => {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today - new Date(today.getFullYear(), 0, 1)) / 1000 / 60 / 60 / 24,
  );
  const quoteOfTheDay = quotesArray[dayOfYear % quotesArray.length];

  const fontSize = Math.max(16, 30 - Math.floor(quoteOfTheDay.length / 10));

  return (
    <View>
      <ImageBackground source={BgQuote} style={styles.imageBg}>
        <View style={styles.overlay} />
        <View style={styles.content}>
          <View style={styles.header}>
            <Lamp style={styles.icon} />
            <Text style={styles.subTitle}>Quote of the Day</Text>
          </View>
          <Text style={[styles.quote, {fontSize}]}>{`"${quoteOfTheDay}"`}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Quotes;

const styles = StyleSheet.create({
  imageBg: {
    width: '100%',
    height: 149,
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 19,
  },
  icon: {
    width: 21,
    height: 21,
  },
  subTitle: {
    fontFamily: 'Roboto-Regular',
    color: 'white',
    fontSize: 15,
  },
  quote: {
    fontFamily: 'ShareTechMono-Regular',
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
});
