import { Ionicons } from '@expo/vector-icons';
import NetInfo from '@react-native-community/netinfo';
import React, { useEffect, useState } from 'react';
import { Animated, Text } from 'react-native';

export const NetworkStatus = () => {
    const [isOnline, setIsOnline] = useState(true);
    const [showToast, setShowToast] = useState(false);
    const slideAnim = useState(new Animated.Value(100))[0];

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            const online = state.isConnected ?? true;

            if (online !== isOnline) {
                setIsOnline(online);
                setShowToast(true);

                // Show toast (slide up from bottom)
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }).start();

                // Hide toast after 3 seconds if online, keep visible if offline
                if (online) {
                    setTimeout(() => {
                        Animated.timing(slideAnim, {
                            toValue: 100, // Slide down to hide
                            duration: 300,
                            useNativeDriver: true,
                        }).start(() => setShowToast(false));
                    }, 3000);
                }
            } else if (!online && !showToast) {
                // Always show offline status
                setShowToast(true);
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            }
        });

        return () => unsubscribe();
    }, [isOnline, showToast]);

    if (!showToast) return null;

    return (
        <Animated.View
            style={{
                transform: [{ translateY: slideAnim }],
                position: 'absolute',
                bottom: 0, // Changed from top: 0
                left: 0,
                right: 0,
                zIndex: 9999,
            }}
            className={`${isOnline ? 'bg-green-600' : 'bg-red-600'} px-4 py-3 pb-8 flex-row items-center justify-center shadow-lg`}
        >
            <Ionicons
                name={isOnline ? 'wifi' : 'wifi-outline'}
                size={18}
                color="white"
            />
            <Text className="text-white font-semibold ml-2">
                {isOnline ? 'Back Online' : 'No Internet Connection'}
            </Text>
        </Animated.View>
    );
};
