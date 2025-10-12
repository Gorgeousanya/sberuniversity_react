import { Task } from '../model/types';
import { baseApi } from 'shared/api/baseApi';

export const tasksApi =  baseApi.injectEndpoints({
    endpoints: (build) => ({
        getTasks: build.query<Task[], void>({
            query: () => 'todos',
            transformResponse: (response: Task[]) => response,
            providesTags: ['Tasks']
        })
    }),
    overrideExisting: false,
});

export const { 
    useGetTasksQuery
} = tasksApi;