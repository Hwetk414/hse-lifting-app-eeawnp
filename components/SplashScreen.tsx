
import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../styles/commonStyles';
import Icon from './Icon';

interface SplashScreenProps {
  onFinish: () => void;
}

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    console.log('SplashScreen: Starting animations');
    
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto-hide splash screen after 3 seconds
    const timer = setTimeout(() => {
      console.log('SplashScreen: Finishing splash screen');
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        onFinish();
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, slideAnim, onFinish]);

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Logo Container */}
        <View
          style={{
            width: 120,
            height: 120,
            backgroundColor: 'white',
            borderRadius: 60,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 40,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
          }}
        >
          <Icon name="shield-checkmark" size={60} color={colors.primary} />
        </View>

        {/* App Title */}
        <Animated.View
          style={{
            transform: [{ translateY: slideAnim }],
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              marginBottom: 8,
            }}
          >
            HSE Guidelines
          </Text>
          
          <Text
            style={{
              fontSize: 16,
              color: 'rgba(255, 255, 255, 0.9)',
              textAlign: 'center',
              fontWeight: '500',
            }}
          >
            Made by HuApp
          </Text>
        </Animated.View>

        {/* Loading indicator */}
        <Animated.View
          style={{
            marginTop: 60,
            opacity: fadeAnim,
          }}
        >
          <View
            style={{
              width: 40,
              height: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <Animated.View
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'white',
                borderRadius: 2,
                transform: [
                  {
                    translateX: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-40, 0],
                    }),
                  },
                ],
              }}
            />
          </View>
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
}
