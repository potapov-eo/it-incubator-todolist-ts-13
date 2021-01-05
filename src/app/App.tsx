import React, {useCallback, useEffect} from 'react'
import './App.css'
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {initializeAppTC, RequestStatusType} from "./App-reducer";
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {Login} from "../features/Login/Login";
import {logOutTC} from "../features/Login/auth-reducer";

function App() {
    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error)
    const isInitialized = useSelector<AppRootStateType, boolean >(state => state.app.isInitialized)
    const isLoggedIn  = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    useEffect(() => {
        dispatch(initializeAppTC())
    },[])
    const LogOutHandler=useCallback(()=>{
        dispatch( logOutTC())
    },[])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }


    return (
        <BrowserRouter>
        <div className="App">
            {error !== null && <ErrorSnackbar/>}
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedIn&&<Button color="inherit" onClick={LogOutHandler}>Log out</Button>}
                </Toolbar>
                {status === "loading" && <LinearProgress color="secondary"/>}
            </AppBar>
            <Container fixed>
                <Switch>
                    <Route exact path={"/"} render={() => <TodolistsList/>}/>}
                    <Route path={"/login"} render={() => <Login/>}/>}
                    <Route path={"/404"} render={() => <h1>404:Page not found </h1>}/>}
                    <Redirect from={"*"} to={"404"}/>}

                </Switch>
            </Container>

        </div>
            </BrowserRouter>
    )


}

export default App
