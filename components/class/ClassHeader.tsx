import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface ClassHeaderProps {
    name: string;
    subject: string;
    standard?: string;
}

export const ClassHeader = ({ name, subject, standard }: ClassHeaderProps) => {
    const router = useRouter();

    return (
        <LinearGradient
            colors={['#4F46E5', '#3730A3']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="pt-14 pb-20 px-6 rounded-b-[32px] shadow-lg"
        >
            <TouchableOpacity onPress={() => router.back()} className="mb-6 self-start bg-white/20 p-2 rounded-full">
                <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-3xl font-bold text-white mb-2">
                {name}
            </Text>
            <Text className="text-xl text-blue-100 font-medium">
                {subject}
            </Text>
            {standard && (
                <View className="bg-white/20 px-3 py-1 rounded-full self-start mt-3 border border-white/30">
                    <Text className="text-white font-medium">{standard}</Text>
                </View>
            )}
        </LinearGradient>
    );
};
