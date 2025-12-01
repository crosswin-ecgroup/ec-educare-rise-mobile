import React from 'react';
import { View } from 'react-native';
import { Skeleton } from '../Skeleton';

export const ProfileSkeleton = () => {
    return (
        <View className="flex-1 bg-gray-50 dark:bg-gray-900">
            {/* Header Skeleton */}
            <View className="bg-white dark:bg-gray-800 pb-6 pt-12 rounded-b-[32px] shadow-sm items-center">
                <Skeleton width={100} height={100} borderRadius={50} className="mb-4" />
                <Skeleton width={180} height={28} className="mb-2" />
                <Skeleton width={120} height={20} />
            </View>

            <View className="p-6">
                {/* Account Details Skeleton */}
                <View className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm mb-6">
                    <Skeleton width={150} height={24} className="mb-4" />
                    <View className="flex-row items-center py-3 border-b border-gray-100 dark:border-gray-700">
                        <Skeleton width={24} height={24} borderRadius={12} className="mr-3" />
                        <View className="flex-1">
                            <Skeleton width={60} height={12} className="mb-1" />
                            <Skeleton width="80%" height={16} />
                        </View>
                    </View>
                    <View className="flex-row items-center py-3">
                        <Skeleton width={24} height={24} borderRadius={12} className="mr-3" />
                        <View className="flex-1">
                            <Skeleton width={60} height={12} className="mb-1" />
                            <Skeleton width="80%" height={16} />
                        </View>
                    </View>
                </View>

                {/* Telegram Status Skeleton */}
                <View className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm mb-6">
                    <Skeleton width={150} height={24} className="mb-4" />
                    <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center">
                            <Skeleton width={40} height={40} borderRadius={20} className="mr-3" />
                            <View>
                                <Skeleton width={100} height={20} className="mb-1" />
                                <Skeleton width={80} height={16} />
                            </View>
                        </View>
                        <Skeleton width={80} height={28} borderRadius={14} />
                    </View>
                </View>
            </View>
        </View>
    );
};
