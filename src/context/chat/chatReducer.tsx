import { ChatState } from './ChatContext';
import { User } from '../../interfaces/user';
import { Message } from '../../interfaces/message';

export type ChatAction =
    | { type: '[Chat] Usuarios cargados', payload: User[]; }
    | { type: '[Chat] Activar chat', payload: string; }
    | { type: '[Chat] Nuevo mensaje', payload: Message; }
    | { type: '[Chat] Cargar mensajes', payload: Message[]; }
    | { type: '[Chat] Cerrar sesion'; };

export const chatReducer = ( state: ChatState, action: ChatAction ): ChatState => {

    switch ( action.type ) {

        case '[Chat] Usuarios cargados':
            return {
                ...state,
                usuarios: [ ...action.payload ]
            };

        case '[Chat] Activar chat':

            if ( state.chatActivo === action.payload ) return state;

            return {
                ...state,
                chatActivo: action.payload,
                mensajes: []
            };

        case '[Chat] Nuevo mensaje':

            if ( state.chatActivo === action.payload.de ||
                state.chatActivo === action.payload.para
            ) {
                return {
                    ...state,
                    mensajes: [ ...state.mensajes, action.payload ]
                };
            } else {
                return state;
            }

        case '[Chat] Cargar mensajes':

            return {
                ...state,
                mensajes: [ ...action.payload ]
            };

        case '[Chat] Cerrar sesion':
            return {
                uid: '',
                chatActivo: null,
                usuarios: [],
                mensajes: []
            };

        default:
            return state;
    }

};
