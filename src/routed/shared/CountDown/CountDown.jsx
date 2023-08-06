import React from "react";
const CountDown = React.memo((props) => {
    const [timeRemaining, setTimeRemaining] = React.useState(calculateTimeRemaining());

    React.useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining());
        }, 60 * 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    function calculateTimeRemaining() {

        const targetDate = new Date(props.endTime);
        const now = new Date();
        const difference = (targetDate - now);
        const minutesRemaining = Math.ceil(difference / (1000 * 60));
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


function convertMinutesToDHM(minutes) {


    const oneDayInMinutes = 1440;
    const oneHourInMinutes = 60;

    const days = Math.floor(minutes / oneDayInMinutes);
    const remainingMinutesAfterDays = minutes % oneDayInMinutes;
    const hours = Math.floor(remainingMinutesAfterDays / oneHourInMinutes);
    const remainingMinutes = remainingMinutesAfterDays % oneHourInMinutes;

    let result = '';
    if (days > 0) {
        result += `${days} D `;
    }
    if (hours > 0) {
        result += `${hours} H `;
    }
    if (remainingMinutes > 0) {
        result += `${remainingMinutes} M `;
    }

    return result.trim();
}

export default CountDown