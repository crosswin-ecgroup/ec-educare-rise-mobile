import { LoadingOverlay } from '@/components/LoadingOverlay';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface StudentModalProps {
    visible: boolean;
    onClose: () => void;
    searchQuery: string;
    onSearchChange: (text: string) => void;
    students: any[];
    onAdd: (studentId: string) => void;
    isLoading: boolean;
}

export const StudentModal = ({
    visible,
    onClose,
    searchQuery,
    onSearchChange,
    students,
    onAdd,
    isLoading
}: StudentModalProps) => {
    const router = useRouter();

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
        >
            <View className="flex-1 bg-gray-50 dark:bg-gray-900">
                <View className="p-4 border-b border-gray-200 dark:border-gray-700 flex-row justify-between items-center">
                    <Text className="text-xl font-bold text-gray-800 dark:text-white">Add Student</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Text className="text-blue-600 font-medium">Close</Text>
                    </TouchableOpacity>
                </View>
                <View className="p-4">
                    <View className="bg-gray-200 dark:bg-gray-800 rounded-xl flex-row items-center px-3 py-2 mb-3">
                        <Ionicons name="search" size={20} color="#9CA3AF" />
                        <TextInput
                            className="flex-1 ml-2 text-gray-800 dark:text-white"
                            placeholder="Search students..."
                            placeholderTextColor="#9CA3AF"
                            value={searchQuery}
                            onChangeText={onSearchChange}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            onClose();
                            router.push('/student/create');
                        }}
                        className="bg-green-600 dark:bg-green-500 rounded-xl p-3 flex-row items-center justify-center active:bg-green-700 dark:active:bg-green-600"
                    >
                        <Ionicons name="add-circle" size={20} color="white" />
                        <Text className="text-white font-bold ml-2">Create New Student</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={students}
                    keyExtractor={item => item.studentId}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => onAdd(item.studentId)}
                            className="flex-row items-center p-4 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900"
                        >
                            <View className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 items-center justify-center mr-3">
                                <Text className="text-green-600 dark:text-green-400 font-bold">
                                    {(item.fullName || 'S')[0].toUpperCase()}
                                </Text>
                            </View>
                            <View>
                                <Text className="text-gray-800 dark:text-white font-medium">{item.fullName}</Text>
                                <Text className="text-gray-500 dark:text-gray-400 text-sm">{item.grade}</Text>
                            </View>
                            <View className="flex-1 items-end">
                                <Ionicons name="add-circle-outline" size={24} color="#10B981" />
                            </View>
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={
                        <View className="p-8 items-center">
                            <Text className="text-gray-500 dark:text-gray-400">No students found</Text>
                        </View>
                    }
                />
                {isLoading && <LoadingOverlay />}
            </View>
        </Modal>
    );
};
