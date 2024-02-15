import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserTasks } from './models';

/**************** Manage the current user ****************/
const CURRENT_USER_KEY = 'current-user';
const initUserTasks = { todo: [], archived: [] } as UserTasks;

function setCurrentUserByEmail (email: string): Promise<boolean> {
    return AsyncStorage.setItem(CURRENT_USER_KEY, email)
        .then(() => true)
        .catch(e => {
            console.error(e);
            return false;
        })
}

function getCurrentUser (): Promise<string> {
    return AsyncStorage.getItem(CURRENT_USER_KEY)
        .then(res => res || '')
        .catch(e => {
            console.error(e);
            return '';
        })
}

function removeCurrentUser (): Promise<boolean> {
    return AsyncStorage.removeItem(CURRENT_USER_KEY)
        .then(() => true)
        .catch(e => {
            console.error(e);
            return false;
        });
}

/************* Manage tasks of the current user *************/
function setTasksByEmail (email: string, tasks: UserTasks) {
    return AsyncStorage.setItem(email, JSON.stringify(tasks))
        .then(() => true)
        .catch(e => {
            console.error(e);
            return false;
        })
}

function getTasksByEMail (email: string): Promise<UserTasks> {
    return AsyncStorage.getItem(email)
        .then(parsedTasks => {
            if (!parsedTasks) return initUserTasks;
            try {
                const res = JSON.parse(parsedTasks) as UserTasks;
                return res;
            } catch (err: any) {
                throw new Error(err);
            }
        })
        .catch(e => {
            console.error(e);
            return initUserTasks;
        })
}

export default {
    setCurrentUserByEmail,
    getCurrentUser,
    removeCurrentUser,
    setTasksByEmail,
    getTasksByEMail
}