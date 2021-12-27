import { createContext, useReducer } from 'react';
import { chatReducer, ChatAction } from './chatReducer';
import { User } from '../../interfaces/user';
import { Message } from '../../interfaces/message';

// Definir como luce, que informacion tendre aqui
export interface ChatState {
    uid: string;
    chatActivo: string | null;
    usuarios: User[];
    mensajes: Message[];
}

// Estado inicial
const initialState = {
    uid: '',
    chatActivo: null, // UID del usuario al que se le enviaran mensajes
    usuarios: [], // Usuarios de la bd
    mensajes: [] // Chat seleccionado
};

// Lo usaremos para decirle a React como luce y que expone el context
interface ChatContextProps {
    chatState: ChatState;
    dispatch: React.Dispatch<ChatAction>;
}

// Crear el contexto
export const ChatContext = createContext( {} as ChatContextProps );

// Componente proveedor del estado
export const ChatProvider = ( { children }: any ) => {

    const [ chatState, dispatch ] = useReducer( chatReducer, initialState );

    return (
        <ChatContext.Provider value={ {
            chatState,
            dispatch
        } }>
            { children }
        </ChatContext.Provider>
    );
};
