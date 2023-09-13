import React from 'react';
import './ContestChats.css'
import { Link } from 'react-router-dom';
import Global from '../../../services/Global';
import ContestService from '../../../services/Contest.service';
function ContestChats({ contestMessages, setContestMessageList, currentUser, contest }) {
    const messageInputRef = React.useRef(null)

    const handleSendClick = () => {
        if (messageInputRef.current.value.trim() === '') return;
        if (currentUser === null) {
            alert('you must log in first')
            return
        }
        const newMessage = {
            contestId: contest.id,
            message: messageInputRef.current.value,
            senderId: currentUser.id,
            senderName: currentUser.userName,
            time: (new Date()) * 1
        }
        ContestService.saveMessageToContestThread(newMessage)
        setContestMessageList([...contestMessages, newMessage]);
        messageInputRef.current.value = ''
    };

    return (
        <div className="messenger-container">
            <div className="message-container">
                {contestMessages.map((content, index) => (
                    <div className={`  messageContainer`} style={{
                        justifyContent: `${contest.hostId === content.senderId ? 'flex-start' : 'flex-end'}`
                    }} key={index}>
                        <div className={`${contest.hostId === content.senderId ? 'flex-start' : 'flex-end'}  contentContainer`}  >
                            <Link to={`${Global.CLIENT_URL}/user/${content.senderId}`}>
                                {contest.hostId !== content.senderId && <i>{content.senderName}</i>}
                                {contest.hostId === content.senderId && <i>Host</i>}

                            </Link>

                            <div className="message">
                                {content.message}
                                <span style={{
                                    left: `${contest.hostId === content.senderId ? '100%' : '0'}`
                                }}
                                    className="tooltiptext">{(new Date(content.time * 1)).toLocaleString()}</span>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
            <form className="input-container" onSubmit={e => {
                e.preventDefault()

            }}>
                <input
                    type="text"
                    placeholder="Type your message..."
                    ref={messageInputRef}
                />
                <button onClick={handleSendClick} type='submit'>Send</button>
            </form>
        </div>
    );
}

export default ContestChats;