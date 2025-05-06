import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Header, TextInput} from '../../components/molecules';
import {Button, Gap} from '../../components/atoms/';
import {Profile} from '../../assets';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';
import {getDatabase, ref, set} from 'firebase/database';

const SignUp = ({navigation}) => {
  const [photo, setPhoto] = useState(Profile);
  const [photoBased64, setPhotoBased64] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    const auth = getAuth();
    const db = getDatabase();
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed up
        const user = userCredential.user;
        set(ref(db, 'users/' + user.uid), {
          fullName: fullName,
          email: email,
          photo: photoBased64,
        });
        showMessage({
          message: 'Registration success',
          type: 'success',
        });
        navigation.navigate('SignIn');
      })
      .catch(error => {
        showMessage({
          message: error.message,
          type: 'danger',
        });
      });
  };

  const getImage = async () => {
    const result = await launchImageLibrary({
      maxHeight: 100,
      maxWidth: 100,
      quality: 0.5,
      includeBase64: true,
      mediaType: 'photo',
    });

    if (result.didCancel) {
      showMessage({
        message: 'Pilih foto dibatalkan',
        type: 'danger',
      });
    } else {
      const assets = result.assets[0];
      const base64 = `data:${assets.type};base64, ${assets.base64}`;
      const source = {uri: base64};
      setPhotoBased64(base64);
      setPhoto(source);
    }
  };

  return (
    <View style={styles.pageContainer}>
      <Header
        title="Sign Up"
        titleSize={26}
        displayBackButton
        align="right"
        onPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{'Create New\nAccount'}</Text>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.imageWrapper}
            onPress={getImage}>
            <View style={styles.profileCircle}>
              <Image source={photo} style={styles.avatar} />
            </View>
          </TouchableOpacity>
          <TextInput
            label="Name"
            placeholder="Name"
            onChangeText={e => setFullName(e)}
          />
          <Gap height={14} />
          <TextInput
            label="Username"
            placeholder="Username"
            onChangeText={e => setUsername(e)}
          />
          <Gap height={14} />
          <TextInput
            label="Email"
            placeholder="Email address"
            onChangeText={e => setEmail(e)}
          />
          <Gap height={14} />
          <TextInput
            label="Password"
            placeholder="Password"
            secureTextEntry
            onChangeText={e => setPassword(e)}
          />
          <Gap height={25} />
          <View style={styles.buttonWrapper}>
            <Button
              label="Sign Up"
              bgColor="#10266F"
              color="#FFFFFF"
              borderColor="#10266F"
              onPress={onSubmit}
            />
          </View>
          <Gap height={30} />
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  avatar: {
    width: 80,
    height: 80,
  },
  pageContainer: {
    flex: 1,
    backgroundColor: '#EDF3FF',
  },
  scrollContent: {
    flexGrow: 1,
    marginTop: 55,
  },
  contentContainer: {
    backgroundColor: '#EDF3FF',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#0B1A51',
    textAlign: 'center',
    marginBottom: 44,
  },
  buttonWrapper: {
    marginTop: 8,
  },
  imageWrapper: {
    alignItems: 'center',
    marginBottom: 15,
  },
  profileCircle: {
    width: 125,
    height: 125,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#0B1A51',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
