import { createContext, useContext, useEffect } from 'react';
import { Socket } from 'socket.io-client';

import useSocket from '../hooks/useSocket';
import AuthContext from '../auth/AuthContext';
import { User } from '../interfaces/user';
import { ChatContext } from './chat/ChatContext';
import { Message } from '../interfaces/message';
import { scrollToBottomAnimated } from '../helpers/scrollToBottom';

interface ContextProps {
    socket: Socket;
    online: boolean;
}

export const SocketContext = createContext( {} as ContextProps );

export const SocketProvider = ( { children }: any ) => {

    const { socket, online, conectarSocket, desconectarSocket } = useSocket( 'http://localhost:8080' );
    const { auth } = useContext( AuthContext );
    const { dispatch } = useContext( ChatContext );

    useEffect( () => {
        if ( auth.logged ) {
            conectarSocket();
        }
    }, [ auth, conectarSocket ] );

    useEffect( () => {
        if ( !auth.logged ) {
            desconectarSocket();
        }
    }, [ auth, desconectarSocket ] );

    // Escuchar cambios en usuarios conectados
    useEffect( () => {

        socket?.on( 'lista-usuarios', ( usuarios: User[] ) => {

            dispatch( {
                type: '[Chat] Usuarios cargados',
                payload: usuarios
            } );

        } );

    }, [ socket, dispatch ] );

    useEffect( () => {

        socket?.on( 'mensaje-personal', ( mensaje: Message ) => {

            dispatch( {
                type: '[Chat] Nuevo mensaje',
                payload: mensaje
            } );


            // Mover scroll al final
            scrollToBottomAnimated( 'mensajes' );

        } );

    }, [ socket, dispatch ] );

    return (
        <SocketContext.Provider value={ { socket, online } }>
            { children }
        </SocketContext.Provider>
    );
};
