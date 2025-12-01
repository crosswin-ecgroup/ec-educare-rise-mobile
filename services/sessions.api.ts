import { ClassSession, MarkAttendanceDto, SessionAttendance } from '@/types/api.types';
import { api } from './api.base';

export const sessionsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getSessions: builder.query<ClassSession[], string>({
            query: (classId) => `/Classes/${classId}/sessions`,
            providesTags: ['Sessions'],
        }),
        getSessionAttendance: builder.query<SessionAttendance[], { classId: string; sessionId: string }>({
            query: ({ classId, sessionId }) => `/Classes/${classId}/sessions/${sessionId}/attendance`,
            providesTags: (result, error, { sessionId }) => [{ type: 'Attendance', id: sessionId }],
        }),
        markAttendance: builder.mutation<void, { classId: string; sessionId: string; body: MarkAttendanceDto }>({
            query: ({ classId, sessionId, body }) => ({
                url: `/Classes/${classId}/sessions/${sessionId}/attendance`,
                method: 'POST',
                body,
            }),
            invalidatesTags: (result, error, { sessionId }) => [{ type: 'Attendance', id: sessionId }],
        }),
    }),
});

export const {
    useGetSessionsQuery,
    useGetSessionAttendanceQuery,
    useMarkAttendanceMutation,
} = sessionsApi;
