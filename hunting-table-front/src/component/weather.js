import React, { useState, useEffect } from "react";
import axios from "axios";
import weatherApi from "./../toolkit/axios.config";
const Weather = ({ id }) => {
    const [Day, setDay] = useState(false);
    const get = () => {
        axios(weatherApi("get"))
            .then((response) => {
                setDay(true);
                const now = new Date();
                const isDaytime = () => {
                    if (!response) return false;

                    let now = new Date();
                    const sunriseTime = new Date('${now.toDateString()} ${data.sunrise}');
                    const sunsetTime = new Date('${now.toDateString()} ${data.sunset}');
                    setDay(true);

                    return now > sunriseTime && now < sunsetTime;
                };
                if (isDaytime) {
                    appliquerThemeJour();
                } else {
                    appliquerThemeNuit();
                }
                function appliquerThemeJour() {
                    document.body.style.backgroundColor = 'white';
                }
                function appliquerThemeNuit() {
                    document.body.style.backgroundColor = 'black';
                }
            })
            .catch((err) => {
                setDay(true);

                console.error(err);
            });
    };
    useEffect(() => {
        get();
    }, []);
    return Day ? (
        <div>
            Il fait jour
        </div>
    ) : (
        <div>Il Fait nuit</div>
    );
};

export default Weather;