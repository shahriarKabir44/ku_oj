import React from 'react';
import './ContestMessenger.css'
import { Link } from 'react-router-dom';
import Global from '../../services/Global';
import ContestService from '../../services/Contest.service';
function ContestMessenger({ contest, currentUser }) {
    const messageInputRef = React.useRef(null)
    const [messengerViewStatus, toggleMessengerViewStatus] = React.useState(0)
    const [hasNewMessageArrived, setNewMessageArrivalStatus] = React.useState(0)
    const [contestMessages, setContestMessageList] = React.useState([])
    const [socket, setSocket] = React.useState(null);
    const messengerContainerRef = React.useRef(null)
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

        setTimeout(() => {
            messengerContainerRef.current.scrollTop = messengerContainerRef.current.scrollHeight;

        }, 100);
        setNewMessageArrivalStatus(0)
        toggleMessengerViewStatus(1)
        ContestService.saveMessageToContestThread(newMessage)
            .then(() => {
                socket.send(JSON.stringify(newMessage))
                getContestMessages()
            })
        messageInputRef.current.value = ''
    };
    function getContestMessages() {
        ContestService.getContestMessages(contest.id)
            .then(messages => {
                setContestMessageList(messages)

            })
    }

    React.useEffect(() => {
        getContestMessages()
        let ws = new WebSocket(Global.WS_URL);
        ws.addEventListener('message', (event) => {
            setNewMessageArrivalStatus(1)
            getContestMessages()
        });
        if (contest.startTime >= (new Date()) * 1 || contest.endTime <= (new Date()) * 1) {
            ws.close()
        }
        setSocket(ws)

        return () => {
            ws.close()
        }
    }, [contest, currentUser])
    return (
        <div className="messengerContainer">
            <div className="messengerHeader flex" style={{
                cursor: 'pointer',
                background: hasNewMessageArrived ? 'blue' : 'white',
                color: !hasNewMessageArrived ? 'black' : 'white',
            }} onClick={() => {
                if (!messengerViewStatus) {


                    setNewMessageArrivalStatus(0)
                    toggleMessengerViewStatus(1)
                    setTimeout(() => {
                        messengerContainerRef.current.scrollTop = messengerContainerRef.current.scrollHeight;

                    }, 100);
                }
            }}>
                <p className="contestMessengerTitle">{contest.code}</p>
                {messengerViewStatus === 1 && <button onClick={() => {
                    toggleMessengerViewStatus(0)
                    setNewMessageArrivalStatus(0)

                }} className="btn">❌</button>}
            </div>
            <div className="messenger-container" style={{
                display: messengerViewStatus ? 'flex' : 'none'
            }}>
                <div className="message-container" ref={messengerContainerRef}>
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
        </div>
    );
}

export default ContestMessenger;