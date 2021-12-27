import { Message } from '../interfaces/message';
import { horaMes } from '../helpers/horaMes';

interface Props {
    message: Message;
}

const IncomingMessage = ( { message }: Props ) => {

    return (
        <div className="incoming_msg">
            <div className="incoming_msg_img">
                <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
            </div>
            <div className="received_msg">
                <div className="received_withd_msg">
                    <p>{ message.mensaje }</p>
                    <span className="time_date"> { horaMes( message.createdAt ) }</span>
                </div>
            </div>
        </div>
    );
};

export default IncomingMessage;
