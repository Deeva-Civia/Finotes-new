import {StyleSheet, View, ScrollView} from 'react-native';
import React from 'react';
import {ButtonCategory} from '../../atoms';

export const categories = [
  'All',
  'Favorite',
  'Back-end',
  'Front-end',
  'Software Engineering',
];

const Category = ({activeCategory, setActiveCategory}) => {
  const handlePress = label => {
    setActiveCategory(label);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scroll}>
        {categories.map(item => (
          <ButtonCategory
            key={item}
            label={item}
            isActive={item === activeCategory}
            onPress={() => handlePress(item)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  scroll: {
    borderRadius: 10,
  },
});
