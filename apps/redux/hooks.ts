import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux"
import { ThunkDispatch } from "redux-thunk";

export type AppThunkDispatch = ThunkDispatch<RootState, any, any>;

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector