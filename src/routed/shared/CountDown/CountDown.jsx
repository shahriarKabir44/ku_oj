import React from "react";
const CountDown = React.memo((props) => {
    const [timeRemaining, setTimeRemaining] = React.useState(calculateTimeRemaining());

    React.useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining());
        }, 1 * 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    function calculateTimeRemaining() {

        const targetDate = new Date(props.endTime);
        const now = new Date();
        const difference = (targetDate - now);
        const minutesRemaining = Math.ceil(difference / (1000 * 1));
        if (minutesRemaining <= 0) {
            window.location.reload()
        }
        return minutesRemaining > 0 ? minutesRemaining : 0;
    }
    return (
        <div>

            <p style={{
                fontSize: "12px"
            }}>{props.content}: {convertMinutesToDHM(timeRemaining)}</p>
        </div>
    );

})


function convertMinutesToDHM(seconds) {


    const days = Math.floor(seconds / (3600 * 24));
    seconds %= 3600 * 24;
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    seconds %= 60;

    return `${days}D ${hours}H ${minutes}M ${seconds}S`;
}

export default CountDown