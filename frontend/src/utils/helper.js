export function capitalize(word){
    return word.slice(0,1).toUpperCase() + word.slice(1, );
}

export function array_sum(arr) {
    if (!arr.length) return 0
    let total = 0;
    const sum = arr.map((ele) => total += ele);
    return sum.slice(-1)[0];
}

export function dateformater(date){
    const options = {year: 'numeric', month:'long', day:'numeric'};
    return new Date(date).toLocaleDateString(undefined, options);
}

export function sort_array_on_boolean(arr, dict){
    const result = arr.sort((a,b) => {
        if ((dict[a] && dict[b]) || (!dict[a] && !dict[b])) return 0;
        else if (dict[a] && !dict[b]) return -1;
        else return 1;
    })
    return result;
}