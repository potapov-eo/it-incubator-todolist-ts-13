import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {authAPI} from "../api/todolists-api";
import {Dispatch} from "redux";
import {useDispatch} from "react-redux";


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    error: string | null
    status: RequestStatusType
    isInitialized:boolean
}

const initialState: InitialStateType = {
    status: 'succeeded',
    error: null,
    //isInitialized для инициализации приложения . tru когда все запросы на сервер зарезолвились
    isInitialized:false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...(state), status: action.status}
        case 'APP/SET-ERROR':
            return {...(state), error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...(state), isInitialized: action.isInitialized}

        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) =>
    ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: string | null) =>
    ({type: 'APP/SET-ERROR', error} as const)
export const setIsInitializedAC = (isInitialized: boolean) =>
    ({type: 'APP/SET-IS-INITIALIZED', isInitialized} as const)


export const initializeAppTC = () => (dispatch: Dispatch<ActionsType | setIsLoggedInACType>) => {
    authAPI.me().then(res => {debugger
            if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
        } else {
        }
    }).finally(()=>{
        dispatch(setIsInitializedAC(true))
    })
}

export type setIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>
export type setIsInitializedACType = ReturnType<typeof setIsInitializedAC>
export type setAppStatusACType = ReturnType<typeof setAppStatusAC>
export type setAppErrorACType = ReturnType<typeof setAppErrorAC>
type ActionsType = setAppStatusACType | setAppErrorACType| setIsInitializedACType
