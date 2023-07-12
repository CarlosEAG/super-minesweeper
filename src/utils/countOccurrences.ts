type occurrencesCount= {
    [key: number | string]: number;
}

export const countOccurrences = (arr: (number|string)[]):occurrencesCount => 
    arr.reduce((acc,cur)=>{
        return {...acc, [cur]: (acc[cur]|0) + 1}
    },{} as occurrencesCount);