import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, Gap} from '../../components/atoms/';

const Start = ({navigation}) => {
  return (
    <View style={styles.pageContainer}>
      <View style={styles.contentContainer}>
        <Image
          source={require('../../assets/Start.jpg')}
          style={styles.image}
        />
        <Text style={styles.title}>FiNotes - Filkom Notes</Text>
        <Text style={styles.description}>
          Tempat semua ide dan materi kuliahmu
        </Text>
        <Text style={styles.description}>
          tersimpan dengan rapi. Efisien. Terstruktur.
        </Text>
        <Text style={styles.description}>
          Khusus mahasiswa Fakultas Ilmu Komputer
        </Text>
        <Gap height={50} />
        <View style={styles.footerShadowWrapper}>
          <View style={styles.footerCard}>
            <View style={styles.buttonWrapper}>
              <Button
                label="Sign In"
                bgColor="#10266F"
                color="#FFFFFF"
                borderColor="#10266F"
                onPress={() => navigation.navigate('SignIn')}
              />
              <Gap height={29} />
              <Button
                label="Sign Up"
                bgColor="#FFFFFF"
                color="#10266F"
                borderColor="#10266F"
                onPress={() => navigation.navigate('SignUp')}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Start;

const styles = StyleSheet.create({
  footerShadowWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 10, // for Android
    borderTopLeftRadius: 115,
    borderTopRightRadius: 115,
  },
  pageContainer: {
    flex: 1,
    backgroundColor: '#EDF3FF',
  },
  contentContainer: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    paddingTop: 66,
    alignItems: 'center',
  },
  image: {
    width: 356,
    height: 294,
    marginBottom: 26,
  },
  title: {
    fontSize: 30,
    fontFamily: 'Roboto-Bold',
    color: '#10266F',
    textAlign: 'center',
    marginBottom: 15,
  },
  description: {
    fontFamily: 'Roboto-Reguler',
    textAlign: 'center',
    color: '#656565',
    marginHorizontal: 37,
    marginBottom: 5,
    fontSize: 18,
  },
  footerCard: {
    backgroundColor: '#EDF3FF',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 77,
    alignItems: 'center',
    height: 295,
    overflow: 'hidden', // penting agar radius clean
  },
});
