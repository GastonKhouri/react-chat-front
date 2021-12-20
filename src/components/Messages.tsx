import IncomingMessage from './IncomingMessage';
import OutgoingMessage from './OutgoingMessage';
import SendMessage from './SendMessage';

const Messages = () => {

    const msg = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

    return (
        <div className="mesgs">

            <div className="msg_history">

                {
                    msg.map( msg => (
                        ( msg % 2 )
                            ? <IncomingMessage key={ msg } />
                            : <OutgoingMessage key={ msg } />
                    ) )
                }

            </div>

            <SendMessage />

        </div>
    );
};

export default Messages;
