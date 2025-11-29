import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useCreateTeacherMutation } from '../../services/classes.api';
import { LoadingOverlay } from '../../components/LoadingOverlay';
import { PrimaryButton } from '../../components/PrimaryButton';
import { CustomAlert } from '../../components/CustomAlert';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreateTeacher() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [subject, setSubject] = useState('');
    const [qualification, setQualification] = useState('');
    const [experience, setExperience] = useState('');
    const [address, setAddress] = useState('');
    const [showSubjectPicker, setShowSubjectPicker] = useState(false);
    const [showQualificationPicker, setShowQualificationPicker] = useState(false);

    const SUBJECTS = [
        'Mathematics', 'Science', 'English', 'History', 'Geography',
        'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Art',
        'Music', 'Physical Education'
    ];

    const QUALIFICATIONS = [
        'B.Ed', 'M.Ed', 'B.Sc', 'M.Sc', 'B.A', 'M.A',
        'Ph.D', 'Diploma', 'Other'
    ];

    const [alertConfig, setAlertConfig] = useState({
        visible: false,
        title: '',
        message: '',
        type: 'success' as 'success' | 'error'
    });

    const showAlert = (title: string, message: string, type: 'success' | 'error') => {
        setAlertConfig({ visible: true, title, message, type });
    };

    const hideAlert = () => {
        setAlertConfig({ ...alertConfig, visible: false });
        if (alertConfig.type === 'success') {
            router.back();
        }
    };

    const [createTeacher, { isLoading }] = useCreateTeacherMutation();

    // ... existing state ...

    const handleCreate = async () => {
        // Validation
        if (!name.trim()) {
            showAlert('Validation Error', 'Please enter teacher name', 'error');
            return;
        }
        if (!email.trim()) {
            showAlert('Validation Error', 'Please enter teacher email', 'error');
            return;
        }

        try {
            await createTeacher({
                fullName: name,
                email,
                mobileNumber: phone || undefined,
                password: 'DefaultPassword123!',
            }).unwrap();
            showAlert('Success', 'Teacher created successfully!', 'success');
        } catch (error: any) {
            console.error('Failed to create teacher:', error);
            showAlert('Error', 'Failed to create teacher. Please try again.', 'error');
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900" edges={['top']}>
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            >
                {isLoading && <LoadingOverlay message="Creating Teacher..." />}
                <CustomAlert
                    visible={alertConfig.visible}
                    title={alertConfig.title}
                    message={alertConfig.message}
                    type={alertConfig.type}
                    onClose={hideAlert}
                />

                <View className="bg-white dark:bg-gray-800 p-4 pt-4 shadow-sm flex-row items-center border-b border-gray-100 dark:border-gray-700">
                    <TouchableOpacity onPress={() => router.back()} className="mr-4">
                        <Ionicons name="arrow-back" size={24} color="#4F46E5" />
                    </TouchableOpacity>
                    <Text className="text-xl font-bold text-gray-800 dark:text-gray-100">Create Teacher</Text>
                </View>

                <ScrollView
                    className="flex-1 p-4"
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm mb-6">
                        <Text className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Teacher Information</Text>

                        <Text className="text-gray-600 dark:text-gray-400 mb-1">Full Name *</Text>
                        <TextInput
                            className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mb-4 text-gray-800 dark:text-gray-100"
                            placeholder="Enter teacher name"
                            placeholderTextColor="#9CA3AF"
                            value={name}
                            onChangeText={setName}
                        />



                        // ... existing code ...

                        <Text className="text-gray-600 dark:text-gray-400 mb-1">Email *</Text>
                        <TextInput
                            className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mb-4 text-gray-800 dark:text-gray-100"
                            placeholder="teacher@example.com"
                            placeholderTextColor="#9CA3AF"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />

                        <Text className="text-gray-600 dark:text-gray-400 mb-1">Phone Number</Text>
                        <TextInput
                            className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mb-4 text-gray-800 dark:text-gray-100"
                            placeholder="+1 234 567 8900"
                            placeholderTextColor="#9CA3AF"
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                        />

                        <Text className="text-gray-600 dark:text-gray-400 mb-1">Subject Specialization *</Text>
                        <TouchableOpacity
                            onPress={() => {
                                setShowSubjectPicker(!showSubjectPicker);
                                setShowQualificationPicker(false);
                            }}
                            className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mb-2 flex-row justify-between items-center"
                        >
                            <Text className={subject ? "text-gray-800 dark:text-gray-100" : "text-gray-400"}>
                                {subject || 'Select subject'}
                            </Text>
                            <Ionicons name="chevron-down" size={20} color="#3B82F6" />
                        </TouchableOpacity>
                        {showSubjectPicker && (
                            <View className="bg-gray-100 dark:bg-gray-700 rounded-lg mb-4" style={{ maxHeight: 200 }}>
                                <ScrollView nestedScrollEnabled={true}>
                                    {SUBJECTS.map((s) => (
                                        <TouchableOpacity
                                            key={s}
                                            onPress={() => {
                                                setSubject(s);
                                                setShowSubjectPicker(false);
                                            }}
                                            className="p-3 border-b border-gray-200 dark:border-gray-600"
                                        >
                                            <Text className="text-gray-800 dark:text-gray-100">{s}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        )}

                        <Text className="text-gray-600 dark:text-gray-400 mb-1">Qualification</Text>
                        <TouchableOpacity
                            onPress={() => {
                                setShowQualificationPicker(!showQualificationPicker);
                                setShowSubjectPicker(false);
                            }}
                            className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mb-2 flex-row justify-between items-center"
                        >
                            <Text className={qualification ? "text-gray-800 dark:text-gray-100" : "text-gray-400"}>
                                {qualification || 'Select qualification'}
                            </Text>
                            <Ionicons name="chevron-down" size={20} color="#3B82F6" />
                        </TouchableOpacity>
                        {showQualificationPicker && (
                            <View className="bg-gray-100 dark:bg-gray-700 rounded-lg mb-4" style={{ maxHeight: 200 }}>
                                <ScrollView nestedScrollEnabled={true}>
                                    {QUALIFICATIONS.map((q) => (
                                        <TouchableOpacity
                                            key={q}
                                            onPress={() => {
                                                setQualification(q);
                                                setShowQualificationPicker(false);
                                            }}
                                            className="p-3 border-b border-gray-200 dark:border-gray-600"
                                        >
                                            <Text className="text-gray-800 dark:text-gray-100">{q}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        )}

                        <Text className="text-gray-600 dark:text-gray-400 mb-1">Years of Experience</Text>
                        <TextInput
                            className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mb-4 text-gray-800 dark:text-gray-100"
                            placeholder="Enter years of experience"
                            placeholderTextColor="#9CA3AF"
                            value={experience}
                            onChangeText={setExperience}
                            keyboardType="numeric"
                        />

                        <Text className="text-gray-600 dark:text-gray-400 mb-1">Address</Text>
                        <TextInput
                            className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mb-4 text-gray-800 dark:text-gray-100"
                            placeholder="Enter address"
                            placeholderTextColor="#9CA3AF"
                            value={address}
                            onChangeText={setAddress}
                            multiline
                            numberOfLines={3}
                        />
                    </View>

                    <PrimaryButton title="Create Teacher" onPress={handleCreate} />
                    <View className="h-8" />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
