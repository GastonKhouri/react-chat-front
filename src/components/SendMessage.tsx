import { useState, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import AuthContext from '../auth/AuthContext';
import { ChatContext } from '../context/chat/ChatContext';

const SendMessage = () => {

    const { socket } = useContext( SocketContext );
    const { auth } = useContext( AuthContext );
    const { chatState } = useContext( ChatContext );

    const [ mensaje, setMensaje ] = useState( '' );

    const handleInputChange = ( { target }: React.ChangeEvent<HTMLInputElement> ) => {

        setMensaje( target.value );

    };

    const onSubmit = ( e: React.FormEvent ) => {

        e.preventDefault();

        if ( mensaje.trim().length === 0 ) return;

        // Emitir un evento de sockets para enviar el mensaje
        socket.emit( 'mensaje-personal', {
            de: auth.uid,
            para: chatState.chatActivo,
            mensaje: mensaje.trim()
        } );

        setMensaje( '' );

    };

    return (
        <form onSubmit={ onSubmit } >
            <div className='type_msg row'>
                <div className='input_msg_write col-sm-9'>
                    <input
                        type='text'
                        className='write_msg'
                        placeholder='Mensaje...'
                        value={ mensaje }
                        onChange={ handleInputChange }
                    />
                </div>
                <div className='col-sm-3 text-center'>
                    <button className='msg_send_btn mt-3' type='submit'>
                        enviar
                    </button>
                </div>
            </div>
        </form>
    );
};

export default SendMessage;
