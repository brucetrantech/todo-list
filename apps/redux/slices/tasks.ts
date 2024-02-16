import apis from "@/storages/apis";
import { UserTasks } from "@/storages/models";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type TasksSliceType = {
    email: string;
    data: UserTasks;
    // "action" is used to process all actions here
    action: {
        loading: boolean;
        error: string | null;
    };
}

export const taskInitialState = {
    email: '',
    data: {
        todo: [],
        archived: [],
    },
    action: { loading: false, error: null },
} as TasksSliceType;

export const signIn = createAsyncThunk(
    'tasks/signIn',
    (payload: string, { dispatch }) =>
        apis.setCurrentUserByEmail(payload).then(res => {
            if (res) dispatch(getTasks());
            return res;
        })
)

export const signOut = createAsyncThunk(
    'tasks/signOut',
    () => apis.removeCurrentUser()
)

export const getCurrentUser = createAsyncThunk(
    'tasks/getCurrentUser',
    (_, { dispatch }) =>
        apis.getCurrentUser().then(res => {
            if (res) dispatch(getTasks());
            return res;
        })

)

export const setTasks = createAsyncThunk(
    'tasks/setTasks',
    (tasks: UserTasks, { getState }: { getState: () => any }) => {
        const email = getState().tasks.email;
        return apis.setTasksByEmail(email, tasks)
            .then((res) => {
                if (res) return tasks;
                return getState().tasks.data as UserTasks;
            })
    }
)

export const getTasks = createAsyncThunk(
    'tasks/getTasks',
    (_, { getState }: { getState: () => any }) => {
        const email = getState().tasks.email;
        if (!email) {
            return apis.getCurrentUser()
                .then(uemail => apis.getTasksByEMail(uemail))
        }
        return apis.getTasksByEMail(email)
    }
)

const tasks = createSlice({
    name: 'tasks',
    initialState: taskInitialState,
    reducers: {
        /* Use sync-action when applying React.Context */
        setCurrentEmail: (state, action: { payload: string }) => {
            state.email = action.payload
        }
    },
    extraReducers: builder =>
        builder
            .addCase(signIn.pending, (state, action) => {
                state.email = action.meta.arg;
                state.action.loading = true;
            })
            .addCase(signIn.fulfilled, state => {
                state.action.loading = false;
                state.action.error = null;
            })
            .addCase(signIn.rejected, state => {
                state.action.loading = false;
                state.action.error = "Set email failed!";
            })
            .addCase(signOut.pending, state => {
                state.action.loading = true;
            })
            .addCase(signOut.fulfilled, state => {
                state = taskInitialState;
            })
            .addCase(signOut.rejected, state => {
                state.action.loading = false;
                state.action.error = "Sign out failed!";
            })
            .addCase(getCurrentUser.pending, state => {
                state.action.loading = true;
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.email = action.payload || '';
                state.action.loading = false;
                state.action.error = null;
            })
            .addCase(getCurrentUser.rejected, state => {
                state.action.loading = false;
                state.action.error = "Get current user failed!";
            })
            .addCase(getTasks.pending, state => {
                state.action.loading = true;
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.data = action.payload;
                state.action.loading = false;
                state.action.error = null;
            })
            .addCase(getTasks.rejected, state => {
                state.action.loading = false;
                state.action.error = "Get tasks failed!";
            })
            .addCase(setTasks.pending, state => {
                state.action.loading = true;
            })
            .addCase(setTasks.fulfilled, (state, action) => {
                state.data = action.payload;
                state.action.loading = false;
                state.action.error = null;
            })
            .addCase(setTasks.rejected, state => {
                state.action.loading = false;
                state.action.error = "Set tasks failed!";
            })
});

/* Apply when using React.Context */
export const { setCurrentEmail } = tasks.actions;

export default tasks.reducer;