import { useAppDispatch } from "@/redux/hooks";
import { getTasks, setCurrentEmail } from "@/redux/slices/tasks";
import apis from "@/storages/apis";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthType {
    isSignedIn: boolean;
}

const intialState = {
    isSignedIn: false,
} as AuthType;

const AuthContext = createContext<AuthType>(intialState);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider ({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();
    const [isSignedIn, setIsSignedIn] = useState(false);

    const value = { isSignedIn } as AuthType;

    useEffect(() => {
        apis.getCurrentUser().then((email: string) => {
            const isExisting = email.trim() !== '';
            setIsSignedIn(isExisting);
            if (isExisting) {
                dispatch(setCurrentEmail(email));
                dispatch(getTasks());
            }
        })
    }, [setIsSignedIn, dispatch])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}