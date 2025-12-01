import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

interface ClassStatsProps {
    teacherCount: number;
    studentCount: number;
}

export const ClassStats = ({ teacherCount, studentCount }: ClassStatsProps) => {
    return (
        <View className="flex-row justify-between mb-6">
            <View className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 flex-1 mr-3 border border-gray-100 dark:border-gray-700">
                <View className="flex-row items-center justify-between">
                    <View>
                        <Text className="text-3xl font-bold text-gray-800 dark:text-gray-100">{teacherCount}</Text>
                        <Text className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mt-1">Teachers</Text>
                    </View>
                    <View className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-xl">
                        <Ionicons name="people" size={24} color="#3B82F6" />
                    </View>
                </View>
            </View>
            <View className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 flex-1 ml-3 border border-gray-100 dark:border-gray-700">
                <View className="flex-row items-center justify-between">
                    <View>
                        <Text className="text-3xl font-bold text-gray-800 dark:text-gray-100">{studentCount}</Text>
                        <Text className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mt-1">Students</Text>
                    </View>
                    <View className="bg-green-50 dark:bg-green-900/30 p-3 rounded-xl">
                        <Ionicons name="school" size={24} color="#10B981" />
                    </View>
                </View>
            </View>
        </View>
    );
};
