import {
    BrowserRouter,
    Navigate,
    Route,
    Routes
} from "react-router-dom";

import { useContext, useEffect } from 'react';

import ChatPage from '../pages/ChatPage';
import AuthRouter from './AuthRouter';
import AuthContext from '../auth/AuthContext';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

const AppRouter = () => {

    const { auth, verifyToken } = useContext( AuthContext );

    useEffect( () => {

        verifyToken();

    }, [ verifyToken ] );

    if ( auth.checking ) {
        return <h1>Espere por favor...</h1>;
    }


    return (
        <BrowserRouter>

            <Routes>

                <Route path="/auth/*" element={
                    <PublicRoute>
                        <AuthRouter />
                    </PublicRoute>
                } />

                <Route path="/" element={
                    <PrivateRoute>
                        <ChatPage />
                    </PrivateRoute>
                } />

                <Route
                    path="*"
                    element={ <Navigate to="/" /> }
                />

            </Routes>

        </BrowserRouter>
    );
};

export default AppRouter;
