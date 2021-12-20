import {
    BrowserRouter,
    Navigate,
    Route,
    Routes
} from "react-router-dom";

import ChatPage from '../pages/ChatPage';
import AuthRouter from './AuthRouter';

const AppRouter = () => {
    return (
        <BrowserRouter>

            <Routes>

                <Route path="/auth/*" element={ <AuthRouter /> } />

                <Route path="/" element={ <ChatPage /> } />

                <Route
                    path="*"
                    element={ <Navigate to="/" /> }
                />

            </Routes>

        </BrowserRouter>
    );
};

export default AppRouter;
