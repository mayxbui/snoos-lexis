import { useState, useEffect } from "react";

const useTimer=(
    initialTime:number,
    isRunning: boolean,
    onEnd?:()=>void
)=>{
    const [timeLeft, setTimeLeft]=useState(initialTime);

    useEffect(()=>{
        if(!isRunning) return;
        if(timeLeft<=0){
            onEnd?.();
            return;
        }
        const timer=setInterval(()=>{
            setTimeLeft((prev)=>prev-1);
        },1000);

        return ()=>clearInterval(timer);
    },[isRunning, timeLeft, onEnd]);
    const reset=()=>setTimeLeft(initialTime);
    return {timeLeft, reset};
};

export default useTimer;

