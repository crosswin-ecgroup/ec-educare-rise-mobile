import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator, Image, Text, View } from 'react-native';

export default function Index() {
    return (
        <View className="flex-1">
            <LinearGradient
                colors={['#4F46E5', '#3730A3']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="flex-1 items-center justify-center"
            >
                <View className="flex-1 items-center justify-center">
                    <View className="mb-8 shadow-2xl">
                        <Image
                            source={require('../assets/images/logo.png')}
                            className="w-40 h-40 rounded-full"
                            resizeMode="cover"
                        />
                    </View>

                    <Text className="text-4xl font-bold text-white mb-2 tracking-tight">
                        EC Edu Care
                    </Text>
                    <Text className="text-blue-200 text-lg font-medium mb-12 tracking-wide">
                        Empowering Education
                    </Text>

                    <ActivityIndicator size="large" color="white" />
                </View>

                {/* Footer */}
                <View className="items-center pb-10">
                    <Text className="text-white/60 text-sm mb-1">
                        Made with ❤️ by EC Group Datasoft Private Limited
                    </Text>
                    <Text className="text-white/40 text-xs">
                        Prompt Patrol
                    </Text>
                </View>
            </LinearGradient>
        </View>
    );
}
