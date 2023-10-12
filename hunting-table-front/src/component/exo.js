
import {useEffect, useState} from "react";
const Clock = () => {
    const [hTime, setTime] = useState(0);
    useEffect(() => {
        let timeI = setInterval(() => {
            setTime(hTime + 1);
            console.log("toto");
        }, 1000);
        return () => {
            clearInterval(timeI);
        };
    }, [hTime]);
    useEffect(() => {
        console.log("Htime a changé");
    },[hTime]);

    return <div>{hTime}</div>
}
export default Clock;