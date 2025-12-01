import { LoadingOverlay } from '@/components/LoadingOverlay';
import { useGetSessionsQuery } from '@/services/sessions.api';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native';

export default function ClassSessions() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { data: sessions, isLoading, refetch, isFetching } = useGetSessionsQuery(id || '');

    if (isLoading) {
        return <LoadingOverlay />;
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    };

    const getStatusColor = (status?: string) => {
        switch (status?.toLowerCase()) {
            case 'completed': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
            case 'cancelled': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
            case 'ongoing': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
            default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800';
        }
    };

    return (
        <View className="flex-1 bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <LinearGradient
                colors={['#4F46E5', '#3730A3']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="pt-14 pb-6 px-6 rounded-b-[32px] shadow-lg mb-4"
            >
                <View className="flex-row items-center">
                    <TouchableOpacity onPress={() => router.back()} className="bg-white/20 p-2 rounded-full mr-4">
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Text className="text-2xl font-bold text-white">Class Sessions</Text>
                </View>
            </LinearGradient>

            <FlatList
                data={sessions}
                keyExtractor={(item) => item.classSessionId}
                contentContainerStyle={{ padding: 16 }}
                refreshControl={
                    <RefreshControl refreshing={isFetching} onRefresh={refetch} tintColor="#4F46E5" />
                }
                ListEmptyComponent={
                    <View className="items-center justify-center py-20">
                        <Ionicons name="calendar-outline" size={64} color="#9CA3AF" />
                        <Text className="text-gray-500 dark:text-gray-400 mt-4 text-lg">No sessions found</Text>
                    </View>
                }
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => router.push(`/class/${id}/session/${item.classSessionId}`)}
                        className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm mb-4 border border-gray-100 dark:border-gray-700"
                    >
                        <View className="flex-row justify-between items-start mb-2">
                            <View className="flex-1 mr-2">
                                <Text className="text-lg font-bold text-gray-800 dark:text-gray-100" numberOfLines={1}>
                                    {item.title || 'Untitled Session'}
                                </Text>
                                <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    {formatDate(item.scheduledDateTime)} • {formatTime(item.scheduledDateTime)}
                                </Text>
                            </View>
                            <View className={`px-3 py-1 rounded-full ${getStatusColor(item.status).split(' ')[1]}`}>
                                <Text className={`text-xs font-bold uppercase ${getStatusColor(item.status).split(' ')[0]}`}>
                                    {item.status || 'Scheduled'}
                                </Text>
                            </View>
                        </View>

                        {item.description && (
                            <Text className="text-gray-600 dark:text-gray-300 text-sm mb-3" numberOfLines={2}>
                                {item.description}
                            </Text>
                        )}

                        <View className="flex-row items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                            <View className="flex-row items-center">
                                <Ionicons name="time-outline" size={16} color="#6B7280" />
                                <Text className="text-gray-500 dark:text-gray-400 text-xs ml-1">
                                    {item.durationMinutes} mins
                                </Text>
                            </View>
                            <View className="flex-row items-center">
                                <Text className="text-blue-600 dark:text-blue-400 font-medium text-sm mr-1">View Details</Text>
                                <Ionicons name="chevron-forward" size={16} color="#3B82F6" />
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
