import React, { useEffect, useState } from 'react';

const Timer = () => {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [laps, setLaps] = useState([]);
    const [lastLapTime, setLastLapTime] = useState(0);

    useEffect(() => {
        let interval = null;
        if (running) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [running]);

    const startTimer = () => {
        setRunning(true);
    };

    const stopTimer = () => {
        setRunning(false);
    };

    const resetTimer = () => {
        setTime(0);
        setLaps([]);
        setLastLapTime(0);
        setRunning(false);
    };

    const addLap = () => {
        const lapTime = time - lastLapTime;
        setLaps((prevLaps) => [...prevLaps, { lapTime: formattedLapTime(lapTime), overallTime: formattedTime() }]);
        setLastLapTime(time);
    };

    const clearLaps = () => {
        setLaps([]);
        setLastLapTime(0);
    };

    const formattedTime = () => {
        const minutes = ("0" + Math.floor((time / 60000) % 60)).slice(-2);
        const seconds = ("0" + Math.floor((time / 1000) % 60)).slice(-2);
        const milliseconds = ("0" + ((time / 10) % 100)).slice(-2);
        return `${minutes}:${seconds}:${milliseconds}`;
    };

    const formattedLapTime = (lapTime) => {
        const minutes = ("0" + Math.floor((lapTime / 60000) % 60)).slice(-2);
        const seconds = ("0" + Math.floor((lapTime / 1000) % 60)).slice(-2);
        const milliseconds = ("0" + ((lapTime / 10) % 100)).slice(-2);
        return `${minutes}:${seconds}:${milliseconds}`;
    };

    return (
        <div className="flex flex-col md:flex-row justify-center items-center min-h-screen">
            <div className="text-center bg-white p-8 rounded-full h-72 w-72 mt-8">
                <div className="text-6xl mb-8 mt-6">{formattedTime()}</div>
                <div className="space-x-4">
                    {running ? (
                        <button className="px-4 py-2 bg-black text-white rounded-md shadow-md hover:bg-blue-600" onClick={stopTimer}>
                            Stop
                        </button>
                    ) : (
                        <button className="px-4 py-2 bg-black text-white rounded-md shadow-md hover:bg-green-600" onClick={startTimer}>
                            Start
                        </button>
                    )}
                    <button className="px-4 py-2 bg-black text-white rounded-md shadow-md hover:bg-red-600" onClick={resetTimer}>
                        Reset
                    </button>
                    <button className="px-4 py-2 bg-black text-white rounded-md shadow-md hover:bg-green-600" onClick={addLap}>
                        Lap
                    </button>
                    <button className="px-4 py-2 mt-4 bg-black text-white rounded-md shadow-md hover:bg-red-600" onClick={clearLaps}>
                        Clear Laps
                    </button>
                </div>
            </div>
            {laps.length > 0 ? (
                <div className="text-left mt-8 md:mt-0 md:ml-8 bg-white w-80 rounded-3xl max-h-96 overflow-y-auto p-4">
                    <div className="flex justify-around mb-2">
                        <span className="w-1/3 text-center">Lap</span>
                        <span className="w-1/3 text-center">Lap Time</span>
                        <span className="w-1/3 text-center">Overall Time</span>
                    </div>
                    <hr className="mb-4"/>
                    <ul className="text-lg">
                        {laps.map((lap, index) => (
                            <li key={index} className="mb-2">
                                <div className="flex justify-between p-2 bg-gray-800 text-white rounded-lg">
                                    <span className="w-1/3 text-center">{`Lap ${index + 1}`}</span>
                                    <span className="w-1/3 text-center">{lap.lapTime}</span>
                                    <span className="w-1/3 text-center">{lap.overallTime}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="mt-8 md:mt-0 md:ml-8 w-72 h-96"></div>
            )}
        </div>
    );
};

export default Timer;
