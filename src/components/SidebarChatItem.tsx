import { useContext } from 'react';
import { User } from '../interfaces/user';
import { ChatContext } from '../context/chat/ChatContext';
import { fetchConToken } from '../helpers/fetch';
import { scrollToBottom } from '../helpers/scrollToBottom';

interface Props {
    usuario: User;
}

const SidebarChatItem = ( { usuario }: Props ) => {

    const { dispatch, chatState } = useContext( ChatContext );
    const { chatActivo } = chatState;

    const onClick = async () => {

        dispatch( {
            type: '[Chat] Activar chat',
            payload: usuario.uid
        } );

        // Cargar los mensajes del chat
        const resp = await fetchConToken( `mensajes/${ usuario.uid }` );

        dispatch( {
            type: '[Chat] Cargar mensajes',
            payload: resp.mensajes
        } );

        // Mover scroll
        scrollToBottom( 'mensajes' );

    };

    return (
        <div
            className={ `chat_list ${ ( chatActivo === usuario.uid ) ? 'active_chat' : '' }` }
            onClick={ onClick }
        >
            <div className='chat_people'>
                <div className='chat_img'>
                    <img src='https://www.shareicon.net/data/512x512/2017/01/06/868320_people_512x512.png' alt='sunil' />
                </div>
                <div className='chat_ib'>
                    <h5>{ usuario.nombre }</h5>
                    {
                        usuario.online
                            ? <span className='text-success'>Online</span>
                            : <span className='text-danger'>Offline</span>
                    }
                </div>
            </div>
        </div>
    );

};

export default SidebarChatItem;
