//NOT COMPLETE! SUBTRACTED MINUTES AND SECONDS ARE SHOWN
//NEEDED TO DISPLAY!

// import Axios from 'axios';
import React from 'react';
import Countdown from 'react-countdown';


const TimeOutUI = ({ expiresIn, startedAt }) => {

    // const [ready, setReady] = React.useState(false);
    // const [currentTimeStamp, setCurrentTimeStamp] = React.useState(null);

    // React.useEffect(() => {
    //     !currentTimeStamp && goForDate();
    //     if (currentTimeStamp) {
    //         console.log('heck');
    //         console.log('heck');
    //         console.log('heck');
    //         console.log('heck');
    //         console.log('heck');
    //         const current = new Date(currentTimeStamp).valueOf();
    //         const expires = new Date(expiresIn).valueOf();
    //         const subtractedMilliSeconds = expires - current
    //         const subSecond = subtractedMilliSeconds / 1000
    //         const subMinute = subSecond / 60

    //         const remainedMinute = Math.floor(subMinute);
    //         let remainedSecond = Math.floor(subMinute % Math.floor(subMinute) * 60);
    //         if (remainedSecond.toString().length !== 2) {
    //             if(remainedSecond.toString().length === 1) return remainedSecond = '0'+remainedSecond
    //             if(remainedSecond.toString().length > 3) return remainedSecond = remainedSecond.toString().slice(0,2);
    //         }

    //         console.log(remainedMinute, ':', remainedSecond);
    //     }
    // }, [currentTimeStamp]);

    // const goForDate = async () => {
    //     try {
    //         let now = await Axios('http://worldtimeapi.org/api/timezone/Asia/Ulaanbaatar');
    //         setCurrentTimeStamp(now.data.datetime);
    //     }
    //     catch (e) {
    //         console.log('Time sync fail');
    //         setCurrentTimeStamp(new Date());
    //     }
    // }

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return '';
        } else {
            // Render a countdown
            return (
                <span>
                    {hours.toString().length === 1 ? '0' + hours : hours}
            :
                    {minutes.toString().length === 1 ? '0' + minutes : minutes}
            :
                    {seconds.toString().length === 1 ? '0' + seconds : seconds}
                </span>
            );
        }
    };

    return (
        // <>{currentTimeStamp && '00:00'}</>
        <Countdown date={new Date(expiresIn)} renderer={renderer} />
    );
};

export default TimeOutUI;