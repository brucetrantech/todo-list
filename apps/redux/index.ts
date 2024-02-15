import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import tasksReducer, { TasksSliceType, taskInitialState } from "@/redux/slices/tasks";

export type RootState = {
    tasks: TasksSliceType
};

export const preloadedState: RootState = {
    tasks: taskInitialState
}

const reducers = {
    tasks: tasksReducer,
}

const store = configureStore({
    reducer: reducers,
    preloadedState: preloadedState,
    middleware: (getDefaultMiddleware: () => any) =>
        getDefaultMiddleware().concat(logger),
});

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>

export default store;