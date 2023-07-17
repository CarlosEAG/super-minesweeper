export const getQuotientAndReminder:(a:number, b:number)=>number[] = (a, b) => {
    const quotient = Math.trunc(a / b);
    const reminder = a - quotient * b;
    return [quotient, reminder];
}