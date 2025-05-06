import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Gap, SearchButton} from '../../components/atoms';
import {NotesList} from '../../components/molecules';

const Search = ({
  searchQuery,
  setSearchQuery,
  notes,
  onFavorite,
  navigation,
}) => {
  const filteredNotes =
    searchQuery.trim().length === 0
      ? []
      : notes.filter(
          note =>
            note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.body.toLowerCase().includes(searchQuery.toLowerCase()),
        );

  return (
    <View style={styles.pageContainer}>
      <View style={styles.searchRow}>
        <SearchButton
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <Gap height={22} />
      <View style={styles.contentContainer}>
        {searchQuery.trim().length === 0 ? null : filteredNotes.length === 0 ? (
          <Text style={styles.emptyText}>No matching results</Text>
        ) : (
          <NotesList notes={filteredNotes} onFavorite={onFavorite} text={''} />
        )}
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#EDF3FF',
    paddingHorizontal: 15,
  },
  contentContainer: {
    flex: 1,
  },
  button: {
    width: 66,
    height: 40,
    backgroundColor: '#EDF3FF',
    padding: 8,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 15,
  },
  cancelText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 17,
    color: '#10266F',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 50,
  },
});
