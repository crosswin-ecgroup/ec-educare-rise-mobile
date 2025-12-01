import React from 'react';
import { View } from 'react-native';
import { Skeleton } from '../Skeleton';

export const ClassDetailsSkeleton = () => {
    return (
        <View className="flex-1 bg-gray-50 dark:bg-gray-900">
            {/* Header Skeleton */}
            <View className="pt-14 pb-20 px-6 rounded-b-[32px] bg-gray-200 dark:bg-gray-800">
                <Skeleton width={40} height={40} borderRadius={20} className="mb-6" />
                <Skeleton width="70%" height={32} className="mb-2" />
                <Skeleton width="40%" height={24} />
                <Skeleton width={60} height={24} borderRadius={12} className="mt-3" />
            </View>

            <View className="px-6 -mt-12">
                {/* Stats Cards Skeleton */}
                <View className="flex-row justify-between mb-6">
                    <View className="bg-white dark:bg-gray-800 rounded-2xl p-4 flex-1 mr-3 h-24 justify-between">
                        <Skeleton width={30} height={30} />
                        <Skeleton width={60} height={12} />
                    </View>
                    <View className="bg-white dark:bg-gray-800 rounded-2xl p-4 flex-1 ml-3 h-24 justify-between">
                        <Skeleton width={30} height={30} />
                        <Skeleton width={60} height={12} />
                    </View>
                </View>

                {/* Sessions Button Skeleton */}
                <View className="bg-white dark:bg-gray-800 p-4 rounded-2xl mb-6 h-16" />

                {/* Schedule Skeleton */}
                <View className="bg-white dark:bg-gray-800 p-6 rounded-2xl mb-6">
                    <Skeleton width={100} height={24} className="mb-6" />
                    <Skeleton width="100%" height={40} className="mb-3" />
                    <Skeleton width="100%" height={40} className="mb-3" />
                    <Skeleton width="100%" height={40} />
                </View>

                {/* Teachers Skeleton */}
                <View className="bg-white dark:bg-gray-800 p-6 rounded-2xl mb-6">
                    <View className="flex-row justify-between mb-6">
                        <Skeleton width={120} height={24} />
                        <Skeleton width={32} height={32} borderRadius={16} />
                    </View>
                    <View className="flex-row items-center mb-4">
                        <Skeleton width={48} height={48} borderRadius={24} />
                        <View className="ml-3 flex-1">
                            <Skeleton width="60%" height={20} className="mb-2" />
                            <Skeleton width="40%" height={16} />
                        </View>
                    </View>
                    <View className="flex-row items-center">
                        <Skeleton width={48} height={48} borderRadius={24} />
                        <View className="ml-3 flex-1">
                            <Skeleton width="60%" height={20} className="mb-2" />
                            <Skeleton width="40%" height={16} />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};
