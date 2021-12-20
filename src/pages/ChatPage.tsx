import InboxPeople from '../components/InboxPeople';
import Messages from '../components/Messages';

import '../css/chat.css';
import SelectChat from '../components/SelectChat';

const ChatPage = () => {
    return (
        <div className="messaging">
            <div className="inbox_msg">

                <InboxPeople />

                {/* <Messages /> */ }
                <SelectChat />

            </div>
        </div>
    );
};

export default ChatPage;
