import { Message } from '../interfaces/message';
import { horaMes } from '../helpers/horaMes';

interface Props {
    message: Message;
}

const OutgoingMessage = ( { message }: Props ) => {

    horaMes( message.createdAt );

    return (
        <div className="outgoing_msg">
            <div className="sent_msg">
                <p>{ message.mensaje }</p>
                <span className="time_date"> { horaMes( message.createdAt ) }</span>
            </div>
        </div>
    );
};

export default OutgoingMessage;
