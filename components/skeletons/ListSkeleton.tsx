import React from 'react';
import { View } from 'react-native';
import { Skeleton } from '../Skeleton';

export const ListSkeleton = () => {
    return (
        <View>
            {[1, 2, 3, 4, 5].map((key) => (
                <View key={key} className="flex-row items-center p-4 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                    <Skeleton width={48} height={48} borderRadius={24} className="mr-3" />
                    <View className="flex-1">
                        <Skeleton width="60%" height={20} className="mb-2" />
                        <Skeleton width="40%" height={16} />
                    </View>
                </View>
            ))}
        </View>
    );
};
