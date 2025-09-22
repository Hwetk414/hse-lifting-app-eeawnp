
import React, { useEffect, useRef, useState } from 'react';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';
import { colors } from '../styles/commonStyles';

interface SimpleBottomSheetProps {
  children?: React.ReactNode;
  isVisible?: boolean;
  onClose?: () => void;
}

const SNAP_POINTS = [0.1, 0.5, 0.9];

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: colors.backgroundAlt,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: '50%',
    maxHeight: '90%',
    boxShadow: `0px -4px 20px ${colors.shadow}`,
    elevation: 10,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  content: {
    flex: 1,
  },
});

export default function SimpleBottomSheet({ children, isVisible = false, onClose }: SimpleBottomSheetProps) {
  const translateY = useRef(new Animated.Value(Dimensions.get('window').height)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setModalVisible(true);
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: Dimensions.get('window').height,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setModalVisible(false);
      });
    }
  }, [isVisible, translateY, backdropOpacity]);

  const handleBackdropPress = () => {
    if (onClose) {
      onClose();
    }
  };

  const snapToPoint = (point: number) => {
    const screenHeight = Dimensions.get('window').height;
    const targetY = screenHeight * (1 - point);
    
    Animated.spring(translateY, {
      toValue: targetY,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  };

  const getClosestSnapPoint = (currentY: number, velocityY: number): number => {
    const screenHeight = Dimensions.get('window').height;
    const currentProgress = 1 - (currentY / screenHeight);
    
    if (velocityY > 500) return SNAP_POINTS[0];
    if (velocityY < -500) return SNAP_POINTS[SNAP_POINTS.length - 1];
    
    let closest = SNAP_POINTS[0];
    let minDistance = Math.abs(currentProgress - closest);
    
    for (const point of SNAP_POINTS) {
      const distance = Math.abs(currentProgress - point);
      if (distance < minDistance) {
        minDistance = distance;
        closest = point;
      }
    }
    
    return closest;
  };

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      const { translationY, velocityY } = event.nativeEvent;
      const closestPoint = getClosestSnapPoint(translationY, velocityY);
      
      if (closestPoint === SNAP_POINTS[0] && onClose) {
        onClose();
      } else {
        snapToPoint(closestPoint);
      }
    }
  };

  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="none"
      onRequestClose={handleBackdropPress}
    >
      <Animated.View style={[styles.overlay, { opacity: backdropOpacity }]}>
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <View style={{ flex: 1 }} />
        </TouchableWithoutFeedback>
        
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}
        >
          <Animated.View
            style={[
              styles.container,
              {
                transform: [{ translateY }],
              },
            ]}
          >
            <View style={styles.handle} />
            <View style={styles.content}>
              {children}
            </View>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </Modal>
  );
}
