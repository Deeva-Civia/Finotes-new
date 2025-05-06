import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Header, TextInput } from '../../components/molecules';
import { Button, Gap } from '../../components/atoms';
import { Profile } from '../../assets';
import { auth, database } from '../../config/Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { showMessage } from 'react-native-flash-message';

const SignUp = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Enhanced initialization check
  useEffect(() => {
    const checkAuthInitialization = async () => {
      try {
        // Add a small delay to ensure Firebase is fully initialized
        await new Promise(resolve => setTimeout(resolve, 100));
        
        if (!auth) {
          throw new Error('Firebase Auth not initialized');
        }
        
        setIsAuthReady(true);
      } catch (error) {
        console.error('Firebase initialization error:', error);
        showMessage({
          message: 'Authentication service unavailable',
          description: 'Please restart the app',
          type: 'danger',
        });
      }
    };

    checkAuthInitialization();
  }, []);

  const onSubmit = async () => {
    if (!isAuthReady) {
      showMessage({
        message: 'Authentication service is initializing',
        type: 'warning',
      });
      return;
    }

    if (!email || !username || !password) {
      showMessage({
        message: 'All fields are required',
        type: 'danger',
      });
      return;
    }

    setIsLoading(true);

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Prepare user data
      const userData = {
        username,
        email,
        createdAt: new Date().toISOString(),
      };

      // Save user data to database
      await set(ref(database, 'users/' + userCredential.user.uid), userData);

      showMessage({
        message: 'Registration successful',
        type: 'success',
      });
      navigation.navigate('LogIn');
    } catch (error: any) {
      let errorMessage = 'Registration failed';
      
      // Enhanced error handling
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Email already in use';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your connection';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many attempts. Try again later';
          break;
        default:
          errorMessage = error.message || errorMessage;
      }

      showMessage({
        message: errorMessage,
        type: 'danger',
      });
    } finally {
      setIsLoading(false);
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
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{'Create New\nAccount'}</Text>
          <View style={styles.imageWrapper}>
            <View style={styles.profileCircle}>
              <Profile width={80} height={80} />
            </View>
          </View>
          <TextInput
            label="Username"
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="words"
            editable={!isLoading}
          />
          <Gap height={14} />
          <TextInput
            label="Email"
            placeholder="Email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!isLoading}
          />
          <Gap height={14} />
          <TextInput
            label="Password"
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            editable={!isLoading}
          />
          <Gap height={25} />
          <View style={styles.buttonWrapper}>
            <Button
              label={isLoading ? 'Processing...' : 'Sign Up'}
              bgColor="#10266F"
              color="#FFFFFF"
              borderColor="#10266F"
              onPress={onSubmit}
              disabled={!isAuthReady || isLoading}
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
  pageContainer: {
    flex: 1,
    backgroundColor: '#EDF3FF',
  },
  scrollContent: {
    flexGrow: 1,
    marginTop: 55,
    paddingBottom: 20,
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
    lineHeight: 40,
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
    backgroundColor: '#FFFFFF',
  },
});