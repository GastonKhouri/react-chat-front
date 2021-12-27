import { useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

const useSocket = ( serverPath: string ) => {

    const [ socket, setSocket ] = useState<Socket | any>();
    const [ online, setOnline ] = useState( false );

    const conectarSocket = useCallback(
        () => {

            const token = localStorage.getItem( 'token' );

            const socketTemp = io( serverPath, {
                transports: [ 'websocket' ],
                autoConnect: true,
                forceNew: true,
                query: {
                    'x-token': token
                }
            } );

            setSocket( socketTemp );

        },
        [ serverPath ],
    );

    const desconectarSocket = useCallback(
        () => {

            socket?.disconnect();

        },
        [ socket ],
    );

    useEffect( () => {

        setOnline( socket?.connected );

    }, [ socket ] );

    useEffect( () => {

        socket?.on( 'connect', () => {
            setOnline( true );
        } );

    }, [ socket ] );

    useEffect( () => {

        socket?.on( 'disconnect', () => {
            setOnline( false );
        } );

    }, [ socket ] );

    return {
        socket,
        online,
        conectarSocket,
        desconectarSocket
    };

};

export default useSocket;
