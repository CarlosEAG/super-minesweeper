import { getQuotientAndReminder } from "./getQuotientAndReminder";

const s=1000;
const m=s*60;
const h=m*60;

const steps = [h,m,s,1];

export const timeReducer = (ellapsedTime: number):number[] => steps
.reduce<number[][]>((previousValue,currentValue,currentIndex)=> {
    const c = getQuotientAndReminder(previousValue[currentIndex][1], currentValue);
    return previousValue.concat([c]);
},[[ellapsedTime,ellapsedTime]])
.map(([time]) => time);