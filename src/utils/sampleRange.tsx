export const sampleRange = (range:number[], n:number) => {
    var sample = [];
    for(var i=0; i<n; i++) {
        sample.push(range.splice(Math.random()*range.length,1));
    }
    return sample.flat();
};