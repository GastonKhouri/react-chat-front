import { createContext, useCallback, useState, useContext } from 'react';
import { fetchConToken, fetchSinToken } from '../helpers/fetch';
import { ChatContext } from '../context/chat/ChatContext';

interface AuthInterface {
    uid: null | string,
    checking: boolean,
    logged: boolean,
    name: null | string,
    email: null | string;
};

interface ContextProps {
    login: ( email: string, password: string ) => any;
    register: ( name: string, email: string, password: string ) => any;
    verifyToken: () => void;
    logout: () => void;
    auth: AuthInterface;
}

export const AuthContext = createContext( {} as ContextProps );

const initialState = {
    uid: null,
    checking: true,
    logged: false,
    name: null,
    email: null
};

export const AuthProvider = ( { children }: any ) => {

    const [ auth, setAuth ] = useState<AuthInterface>( initialState );
    const { dispatch } = useContext( ChatContext );

    const login = async ( email: string, password: string ) => {

        const resp = await fetchSinToken( 'login', { email, password }, 'POST' );

        if ( resp.ok ) {

            localStorage.setItem( 'token', resp.token );

            const user = resp.user;

            setAuth( {
                uid: user.uid,
                name: user.nombre,
                email: user.email,
                checking: false,
                logged: true,
            } );

        }

        return resp.ok;

    };

    const register = async ( nombre: string, email: string, password: string ) => {

        const resp = await fetchSinToken( 'login/new', { email, password, nombre }, 'POST' );

        if ( resp.ok ) {

            localStorage.setItem( 'token', resp.token );

            const user = resp.user;

            setAuth( {
                uid: user.uid,
                name: user.nombre,
                email: user.email,
                checking: false,
                logged: false,
            } );

            return true;

        }

        return resp.errors[ 0 ].msg;

    };

    const verifyToken = useCallback(
        async () => {

            const token = localStorage.getItem( 'token' );

            if ( !token ) {
                setAuth( {
                    uid: null,
                    checking: false,
                    logged: false,
                    name: null,
                    email: null
                } );

                return false;
            }

            const resp = await fetchConToken( 'login/renew' );

            if ( resp.ok ) {

                localStorage.setItem( 'token', resp.token );

                const user = resp.user;

                setAuth( {
                    uid: user.uid,
                    name: user.nombre,
                    email: user.email,
                    checking: false,
                    logged: true,
                } );

                return true;

            } else {

                setAuth( {
                    uid: null,
                    checking: false,
                    logged: false,
                    name: null,
                    email: null
                } );

                return false;

            }

        },
        [],
    );

    const logout = () => {

        localStorage.removeItem( 'token' );
        setAuth( {
            uid: null,
            checking: false,
            logged: false,
            name: null,
            email: null
        } );
        dispatch( {
            type: '[Chat] Cerrar sesion'
        } );

    };

    return (
        <AuthContext.Provider value={ {
            login,
            register,
            verifyToken,
            logout,
            auth
        } }>
            { children }
        </AuthContext.Provider>
    );
};

export default AuthContext;


