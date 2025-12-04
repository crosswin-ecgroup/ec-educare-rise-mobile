import React, { useEffect } from 'react';
import { Animated, View } from 'react-native';

export const CalendarSkeleton = () => {
    const animatedValue = new Animated.Value(0);

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(animatedValue, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    const opacity = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 0.7],
    });

    return (

        <View className="flex-1">
            {/* Calendar Placeholder */}
            <View className="mx-4 mt-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 border border-gray-100 dark:border-gray-700 h-80">
                <View className="flex-row justify-between mb-4">
                    <Animated.View className="w-32 h-6 rounded bg-gray-200 dark:bg-gray-700" style={{ opacity }} />
                    <View className="flex-row gap-2">
                        <Animated.View className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" style={{ opacity }} />
                        <Animated.View className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" style={{ opacity }} />
                    </View>
                </View>
                <View className="flex-row justify-between mb-4">
                    {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                        <Animated.View key={i} className="w-8 h-4 rounded bg-gray-200 dark:bg-gray-700" style={{ opacity }} />
                    ))}
                </View>
                <View className="flex-1 flex-row flex-wrap justify-between gap-y-4">
                    {Array.from({ length: 30 }).map((_, i) => (
                        <Animated.View key={i} className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" style={{ opacity }} />
                    ))}
                </View>
            </View>

            {/* Class List Placeholder */}
            <View className="px-6 mt-6">
                <Animated.View className="w-48 h-6 rounded bg-gray-200 dark:bg-gray-700 mb-4" style={{ opacity }} />

                {[1, 2, 3].map((i) => (
                    <View key={i} className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm mb-4 border border-gray-100 dark:border-gray-700 h-32">
                        <View className="flex-row justify-between items-start mb-4">
                            <View className="flex-row items-center flex-1 mr-2">
                                <Animated.View className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-gray-700 mr-3" style={{ opacity }} />
                                <View>
                                    <Animated.View className="w-32 h-5 rounded bg-gray-200 dark:bg-gray-700 mb-2" style={{ opacity }} />
                                    <Animated.View className="w-20 h-3 rounded bg-gray-200 dark:bg-gray-700" style={{ opacity }} />
                                </View>
                            </View>
                            <Animated.View className="w-12 h-6 rounded-lg bg-gray-200 dark:bg-gray-700" style={{ opacity }} />
                        </View>
                        <View className="pt-4 border-t border-gray-50 dark:border-gray-700/50">
                            <Animated.View className="w-24 h-4 rounded bg-gray-200 dark:bg-gray-700" style={{ opacity }} />
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};
