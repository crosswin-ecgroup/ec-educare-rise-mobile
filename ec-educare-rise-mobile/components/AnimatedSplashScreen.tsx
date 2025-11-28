import React, { useCallback, useEffect, useState } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    runOnJS,
    withSequence,
    withSpring,
    Easing
} from 'react-native-reanimated';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

interface AnimatedSplashScreenProps {
    children: React.ReactNode;
    image: any;
}

export function AnimatedSplashScreen({ children, image }: AnimatedSplashScreenProps) {
    const [isAppReady, setAppReady] = useState(false);
    const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

    const opacity = useSharedValue(1);
    const scale = useSharedValue(1);

    useEffect(() => {
        async function prepare() {
            try {
                // Artificially delay for a moment to show the splash (optional, remove in production if not needed)
                // await new Promise(resolve => setTimeout(resolve, 1000));
            } catch (e) {
                console.warn(e);
            } finally {
                setAppReady(true);
            }
        }

        prepare();
    }, []);

    const onImageLoaded = useCallback(async () => {
        try {
            await SplashScreen.hideAsync();
            // Start animation
            scale.value = withSequence(
                withTiming(1.1, { duration: 200 }),
                withTiming(0, { duration: 400, easing: Easing.in(Easing.exp) })
            );
            opacity.value = withTiming(0, { duration: 400 }, (finished) => {
                if (finished) {
                    runOnJS(setAnimationComplete)(true);
                }
            });
        } catch (e) {
            // handle errors
        }
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [{ scale: scale.value }],
        };
    });

    if (!isAppReady) {
        return null;
    }

    return (
        <View style={{ flex: 1 }}>
            {isSplashAnimationComplete && children}
            {!isSplashAnimationComplete && (
                <View style={[StyleSheet.absoluteFill, { backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' }]}>
                    <Animated.Image
                        source={image}
                        style={[
                            { width: 200, height: 200, resizeMode: 'contain' },
                            animatedStyle,
                        ]}
                        onLoadEnd={onImageLoaded}
                    />
                </View>
            )}
        </View>
    );
}
