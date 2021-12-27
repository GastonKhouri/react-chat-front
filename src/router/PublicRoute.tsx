import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../auth/AuthContext';

const PublicRoute = ( { children }: any ) => {

    const { auth } = useContext( AuthContext );

    return (

        auth.logged
            ? <Navigate to="/" />
            : children

    );

};

export default PublicRoute;
