import { useContext } from 'react';
import SidebarChatItem from './SidebarChatItem';
import { ChatContext } from '../context/chat/ChatContext';
import AuthContext from '../auth/AuthContext';

const Sidebar = () => {

    const { chatState } = useContext( ChatContext );
    const { auth } = useContext( AuthContext );

    return (
        <div className="inbox_chat">

            {
                chatState.usuarios
                    .filter( user => user.uid !== auth.uid )
                    .map( user => (

                        <SidebarChatItem
                            key={ user.uid }
                            usuario={ user }
                        />

                    ) )
            }

            <div className="extra_space"></div>

        </div>
    );
};

export default Sidebar;
