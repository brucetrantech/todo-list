import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserTasks } from './models';

/**************** Manage the current user ****************/
const CURRENT_USER_KEY = 'current-user';

function setCurrentUserByEmail (email: string): Promise<boolean> {
    return AsyncStorage.setItem(CURRENT_USER_KEY, email)
        .then(() => true)
        .catch(e => {
            console.error(e);
            return false;
        })
}

function getCurrentUser (): Promise<string | null> {
    return AsyncStorage.getItem(CURRENT_USER_KEY)
        .catch(e => {
            console.error(e);
            return null;
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

function getTasksByEMail (email: string): Promise<UserTasks | null> {
    return AsyncStorage.getItem(email)
        .then(parsedTasks => {
            if (!parsedTasks) return null;
            try {
                return JSON.parse(parsedTasks) as UserTasks;
            } catch (err: any) {
                throw new Error(err);
            }
        })
        .catch(e => {
            console.error(e);
            return null;
        })
}

export default {
    setCurrentUserByEmail,
    getCurrentUser,
    removeCurrentUser,
    setTasksByEmail,
    getTasksByEMail
}