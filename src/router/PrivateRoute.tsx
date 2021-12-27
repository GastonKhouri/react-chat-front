import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import AuthContext from '../auth/AuthContext';

const PrivateRoute = ( { children }: any ) => {

    const { auth } = useContext( AuthContext );

    return (

        auth.logged
            ? children
            : <Navigate to="/auth" />

    );
};

export default PrivateRoute;
