import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Star, StarFilledBlue} from '../../../assets';

const NoteItem = ({note, onFavorite, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{note.title}</Text>
          <TouchableOpacity onPress={() => onFavorite(note.id)}>
            {note.favorited ? (
              <StarFilledBlue width={20} height={20} />
            ) : (
              <Star width={20} height={20} />
            )}
          </TouchableOpacity>
        </View>
        <Text style={styles.body}>{note.body}</Text>
        <Text style={styles.date}>
          {new Date(note.createdAt).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    elevation: 2,
    width: '100%',
    height: 94,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    color: '#1E80C9',
  },
  body: {
    fontSize: 13,
    fontFamily: 'Roboto-Regular',
    color: '#656565',
  },
  date: {
    fontSize: 8,
    fontFamily: 'Roboto-Medium',
    color: '#AEAEAE',
    marginTop: 8,
  },
});

export default NoteItem;
