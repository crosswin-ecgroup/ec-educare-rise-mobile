import { CustomAlert } from '@/components/CustomAlert';
import { LoadingOverlay } from '@/components/LoadingOverlay';
import {
    useAddStudentToClassMutation,
    useAssignTeacherMutation,
    useGetClassByIdQuery
} from '@/services/classes.api';
import { useGetStudentsQuery } from '@/services/students.api';
import { useGetTeachersQuery } from '@/services/teachers.api';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Linking, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ClassDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const insets = useSafeAreaInsets();

    // Queries
    const { data: classData, isLoading } = useGetClassByIdQuery(id || '');
    const { data: allTeachers } = useGetTeachersQuery();
    const { data: allStudents } = useGetStudentsQuery();

    // Mutations
    const [assignTeacher, { isLoading: isAssigningTeacher }] = useAssignTeacherMutation();
    const [addStudent, { isLoading: isAddingStudent }] = useAddStudentToClassMutation();

    // State
    const [showTeacherModal, setShowTeacherModal] = useState(false);
    const [showStudentModal, setShowStudentModal] = useState(false);
    const [teacherSearch, setTeacherSearch] = useState('');
    const [studentSearch, setStudentSearch] = useState('');
    const [alertConfig, setAlertConfig] = useState({
        visible: false,
        title: '',
        message: '',
        type: 'error' as 'error' | 'success' | 'info'
    });

    if (isLoading) {
        return <LoadingOverlay />;
    }

    if (!classData) {
        return (
            <View className="flex-1 bg-gray-50 dark:bg-gray-900 items-center justify-center">
                <Ionicons name="alert-circle-outline" size={64} color="#9CA3AF" />
                <Text className="text-gray-500 dark:text-gray-400 mt-4 text-lg">Class not found</Text>
                <TouchableOpacity onPress={() => router.back()} className="mt-4 bg-blue-600 px-6 py-3 rounded-lg">
                    <Text className="text-white font-bold">Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const formatDate = (dateString: string) => {
        const [year, month, day] = dateString.split('T')[0].split('-');
        return `${day}/${month}/${year}`;
    };

    const formatTime = (timeSpan: any) => {
        if (!timeSpan) return 'N/A';
        const hours = Math.floor(timeSpan.totalHours || 0);
        const minutes = Math.floor((timeSpan.totalMinutes || 0) % 60);
        return `${hours}h ${minutes}m`;
    };

    const handleAssignTeacher = async (teacherId: string) => {
        try {
            await assignTeacher({ classId: id!, teacherId }).unwrap();
            setShowTeacherModal(false);
            setTeacherSearch('');
            setAlertConfig({ visible: true, title: 'Success', message: 'Teacher assigned successfully', type: 'success' });
        } catch (error) {
            setAlertConfig({ visible: true, title: 'Error', message: 'Failed to assign teacher', type: 'error' });
        }
    };

    const handleAddStudent = async (studentId: string) => {
        try {
            await addStudent({ classId: id!, studentId }).unwrap();
            setShowStudentModal(false);
            setStudentSearch('');
            setAlertConfig({ visible: true, title: 'Success', message: 'Student added successfully', type: 'success' });
        } catch (error) {
            setAlertConfig({ visible: true, title: 'Error', message: 'Failed to add student', type: 'error' });
        }
    };

    const filteredTeachers = allTeachers?.filter(t =>
        !classData.teachers?.some(ct => ct.teacherId === t.teacherId) &&
        (t.fullName?.toLowerCase().includes(teacherSearch.toLowerCase()) ||
            t.email?.toLowerCase().includes(teacherSearch.toLowerCase()))
    ) || [];

    const filteredStudents = allStudents?.filter(s =>
        !classData.students?.some(cs => cs.studentId === s.studentId) &&
        (s.fullName?.toLowerCase().includes(studentSearch.toLowerCase()) ||
            s.grade?.toLowerCase().includes(studentSearch.toLowerCase()))
    ) || [];

    const teacherCount = classData.teachers?.length || 0;
    const studentCount = classData.students?.length || 0;

    return (
        <View className="flex-1 bg-gray-50 dark:bg-gray-900">
            <CustomAlert
                visible={alertConfig.visible}
                title={alertConfig.title}
                message={alertConfig.message}
                type={alertConfig.type}
                onClose={() => setAlertConfig(prev => ({ ...prev, visible: false }))}
            />
            <ScrollView className="flex-1">
                {/* Gradient Header */}
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
                        {classData.name}
                    </Text>
                    <Text className="text-xl text-blue-100 font-medium">
                        {classData.subject}
                    </Text>
                    {classData.standard && (
                        <View className="bg-white/20 px-3 py-1 rounded-full self-start mt-3 border border-white/30">
                            <Text className="text-white font-medium">{classData.standard}</Text>
                        </View>
                    )}
                </LinearGradient>

                <View className="px-6 -mt-12">
                    {/* Stats Cards */}
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

                    {/* Sessions Button */}
                    <TouchableOpacity
                        onPress={() => router.push(`/class/${id}/sessions`)}
                        className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm mb-6 border border-gray-100 dark:border-gray-700 flex-row items-center justify-between active:bg-gray-50 dark:active:bg-gray-700"
                    >
                        <View className="flex-row items-center">
                            <View className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-xl mr-3">
                                <Ionicons name="list" size={20} color="#4F46E5" />
                            </View>
                            <Text className="text-lg font-bold text-gray-800 dark:text-gray-100">
                                Class Sessions
                            </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                    </TouchableOpacity>

                    {/* Schedule Card */}
                    <View className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm mb-6 border border-gray-100 dark:border-gray-700">
                        <View className="flex-row items-center mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
                            <View className="bg-purple-100 dark:bg-purple-900 p-2 rounded-xl mr-3">
                                <Ionicons name="calendar" size={20} color="#8B5CF6" />
                            </View>
                            <Text className="text-lg font-bold text-gray-800 dark:text-gray-100">
                                Schedule
                            </Text>
                        </View>

                        <View>
                            <View className="flex-row items-center py-3 border-b border-gray-100 dark:border-gray-700">
                                <View className="w-24">
                                    <Text className="text-xs font-medium text-gray-400 uppercase">Start Date</Text>
                                </View>
                                <Text className="text-gray-800 dark:text-gray-100 font-medium text-base">{formatDate(classData.startDate)}</Text>
                            </View>

                            <View className="flex-row items-center py-3 border-b border-gray-100 dark:border-gray-700">
                                <View className="w-24">
                                    <Text className="text-xs font-medium text-gray-400 uppercase">End Date</Text>
                                </View>
                                <Text className="text-gray-800 dark:text-gray-100 font-medium text-base">{formatDate(classData.endDate)}</Text>
                            </View>

                            <View className="flex-row items-center py-3 border-b border-gray-100 dark:border-gray-700">
                                <View className="w-24">
                                    <Text className="text-xs font-medium text-gray-400 uppercase">Duration</Text>
                                </View>
                                <Text className="text-gray-800 dark:text-gray-100 font-medium text-base">{formatTime(classData.sessionTime)}</Text>
                            </View>

                            {classData.dayOfWeek && classData.dayOfWeek.length > 0 && (
                                <View className="flex-row items-start py-3">
                                    <View className="w-24 pt-1">
                                        <Text className="text-xs font-medium text-gray-400 uppercase">Days</Text>
                                    </View>
                                    <View className="flex-1 flex-row flex-wrap">
                                        {classData.dayOfWeek.map((day: string, index: number) => (
                                            <View key={index} className="bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-lg mr-2 mb-2 border border-blue-100 dark:border-blue-800">
                                                <Text className="text-blue-700 dark:text-blue-300 text-xs font-bold uppercase">
                                                    {day.slice(0, 3)}
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            )}
                        </View>
                    </View>

                    {/* Teachers */}
                    <View className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm mb-6 border border-gray-100 dark:border-gray-700">
                        <View className="flex-row items-center justify-between mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
                            <View className="flex-row items-center">
                                <View className="bg-blue-100 dark:bg-blue-900 p-2 rounded-xl mr-3">
                                    <Ionicons name="person" size={20} color="#3B82F6" />
                                </View>
                                <Text className="text-lg font-bold text-gray-800 dark:text-gray-100">
                                    Teachers ({teacherCount})
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => setShowTeacherModal(true)}
                                className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-full"
                            >
                                <Ionicons name="add" size={20} color="#3B82F6" />
                            </TouchableOpacity>
                        </View>
                        {classData.teachers && classData.teachers.length > 0 ? (
                            classData.teachers.map((teacher: any, index: number) => (
                                <View key={index} className="flex-row items-center py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                                    <View className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/30 items-center justify-center">
                                        <Text className="text-blue-600 dark:text-blue-400 font-bold text-lg">
                                            {(teacher.fullName || teacher.name || 'T')[0].toUpperCase()}
                                        </Text>
                                    </View>
                                    <View className="ml-3 flex-1">
                                        <Text className="text-gray-800 dark:text-gray-100 font-bold text-base">
                                            {teacher.fullName || teacher.name || 'Teacher'}
                                        </Text>
                                        {teacher.email && (
                                            <Text className="text-sm text-gray-500 dark:text-gray-400">
                                                {teacher.email}
                                            </Text>
                                        )}
                                    </View>
                                </View>
                            ))
                        ) : (
                            <Text className="text-gray-500 dark:text-gray-400 text-center py-4">No teachers assigned</Text>
                        )}
                    </View>

                    {/* Students */}
                    <View className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm mb-6 border border-gray-100 dark:border-gray-700">
                        <View className="flex-row items-center justify-between mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
                            <View className="flex-row items-center">
                                <View className="bg-green-100 dark:bg-green-900 p-2 rounded-xl mr-3">
                                    <Ionicons name="school" size={20} color="#10B981" />
                                </View>
                                <Text className="text-lg font-bold text-gray-800 dark:text-gray-100">
                                    Students ({studentCount})
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => setShowStudentModal(true)}
                                className="bg-green-50 dark:bg-green-900/30 p-2 rounded-full"
                            >
                                <Ionicons name="add" size={20} color="#10B981" />
                            </TouchableOpacity>
                        </View>
                        {classData.students && classData.students.length > 0 ? (
                            <>
                                {classData.students.slice(0, 5).map((student: any, index: number) => (
                                    <View key={index} className="flex-row items-center py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                                        <View className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-900/30 items-center justify-center">
                                            <Text className="text-green-600 dark:text-green-400 font-bold text-lg">
                                                {(student.fullName || student.name || 'S')[0].toUpperCase()}
                                            </Text>
                                        </View>
                                        <View className="ml-3 flex-1">
                                            <Text className="text-gray-800 dark:text-gray-100 font-bold text-base">
                                                {student.fullName || student.name || 'Student'}
                                            </Text>
                                            {student.email && (
                                                <Text className="text-sm text-gray-500 dark:text-gray-400">
                                                    {student.email}
                                                </Text>
                                            )}
                                        </View>
                                    </View>
                                ))}
                                {classData.students.length > 5 && (
                                    <View className="mt-4 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl">
                                        <Text className="text-sm text-gray-600 dark:text-gray-300 text-center font-medium">
                                            +{classData.students.length - 5} more students
                                        </Text>
                                    </View>
                                )}
                            </>
                        ) : (
                            <Text className="text-gray-500 dark:text-gray-400 text-center py-4">No students assigned</Text>
                        )}
                    </View>

                    {/* Telegram Group Button */}
                    {classData.telegramGroupLink && (
                        <TouchableOpacity
                            onPress={() => classData.telegramGroupLink && Linking.openURL(classData.telegramGroupLink)}
                            className="active:opacity-90 mb-8"
                        >
                            <LinearGradient
                                colors={['#3B82F6', '#2563EB']}
                                className="p-4 rounded-2xl flex-row items-center justify-center shadow-lg"
                            >
                                <Ionicons name="paper-plane" size={20} color="white" />
                                <Text className="text-white font-bold ml-2 text-base">Join Telegram Group</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>

            {/* Teacher Selection Modal */}
            <Modal
                visible={showTeacherModal}
                animationType="slide"
                presentationStyle="pageSheet"
                onRequestClose={() => setShowTeacherModal(false)}
            >
                <View className="flex-1 bg-gray-50 dark:bg-gray-900">
                    <View className="p-4 border-b border-gray-200 dark:border-gray-700 flex-row justify-between items-center">
                        <Text className="text-xl font-bold text-gray-800 dark:text-white">Assign Teacher</Text>
                        <TouchableOpacity onPress={() => setShowTeacherModal(false)}>
                            <Text className="text-blue-600 font-medium">Close</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="p-4">
                        <View className="bg-gray-200 dark:bg-gray-800 rounded-xl flex-row items-center px-3 py-2 mb-3">
                            <Ionicons name="search" size={20} color="#9CA3AF" />
                            <TextInput
                                className="flex-1 ml-2 text-gray-800 dark:text-white"
                                placeholder="Search teachers..."
                                placeholderTextColor="#9CA3AF"
                                value={teacherSearch}
                                onChangeText={setTeacherSearch}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                setShowTeacherModal(false);
                                router.push('/teacher/create');
                            }}
                            className="bg-blue-600 dark:bg-blue-500 rounded-xl p-3 flex-row items-center justify-center active:bg-blue-700 dark:active:bg-blue-600"
                        >
                            <Ionicons name="add-circle" size={20} color="white" />
                            <Text className="text-white font-bold ml-2">Create New Teacher</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={filteredTeachers}
                        keyExtractor={item => item.teacherId}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => handleAssignTeacher(item.teacherId)}
                                className="flex-row items-center p-4 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900"
                            >
                                <View className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 items-center justify-center mr-3">
                                    <Text className="text-blue-600 dark:text-blue-400 font-bold">
                                        {(item.fullName || 'T')[0].toUpperCase()}
                                    </Text>
                                </View>
                                <View>
                                    <Text className="text-gray-800 dark:text-white font-medium">{item.fullName}</Text>
                                    <Text className="text-gray-500 dark:text-gray-400 text-sm">{item.email}</Text>
                                </View>
                                <View className="flex-1 items-end">
                                    <Ionicons name="add-circle-outline" size={24} color="#3B82F6" />
                                </View>
                            </TouchableOpacity>
                        )}
                        ListEmptyComponent={
                            <View className="p-8 items-center">
                                <Text className="text-gray-500 dark:text-gray-400">No teachers found</Text>
                            </View>
                        }
                    />
                    {isAssigningTeacher && <LoadingOverlay />}
                </View>
            </Modal>

            {/* Student Selection Modal */}
            <Modal
                visible={showStudentModal}
                animationType="slide"
                presentationStyle="pageSheet"
                onRequestClose={() => setShowStudentModal(false)}
            >
                <View className="flex-1 bg-gray-50 dark:bg-gray-900">
                    <View className="p-4 border-b border-gray-200 dark:border-gray-700 flex-row justify-between items-center">
                        <Text className="text-xl font-bold text-gray-800 dark:text-white">Add Student</Text>
                        <TouchableOpacity onPress={() => setShowStudentModal(false)}>
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
                                value={studentSearch}
                                onChangeText={setStudentSearch}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                setShowStudentModal(false);
                                router.push('/student/create');
                            }}
                            className="bg-green-600 dark:bg-green-500 rounded-xl p-3 flex-row items-center justify-center active:bg-green-700 dark:active:bg-green-600"
                        >
                            <Ionicons name="add-circle" size={20} color="white" />
                            <Text className="text-white font-bold ml-2">Create New Student</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={filteredStudents}
                        keyExtractor={item => item.studentId}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => handleAddStudent(item.studentId)}
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
                    {isAddingStudent && <LoadingOverlay />}
                </View>
            </Modal>
        </View>
    );
}

