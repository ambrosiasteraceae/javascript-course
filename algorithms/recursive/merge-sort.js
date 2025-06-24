// input = [3, 2, 1, 13, 8, 5, 0, 1]
// output = [0, 1, 1, 2, 3, 5, 8, 13]

export function mergeSort(array){

    //base case
    if (array.length == 1)
        return array
    //halve
    const mid = array.length % 2 == 0? array.length/2 : (array.length+1)/2
    const left = array.slice(0, mid);
    const right = array.slice(mid);

    const sortedLeft = mergeSort(left);
    const sortedRight = mergeSort(right);
    const merged = merge(sortedLeft, sortedRight)
    return merged
    


}
function merge(left, right){
    const merged = [];
    let i = 0;
    let j = 0;
    while(true)
    {  
        if(left[i] <= right[j])
        {
            merged.push(left[i]);
            i++;
        }
        else{
            merged.push(right[j]);
            j++;
        }

        if (i == left.length)
        {
            merged.push(...right.slice(j));
            break;
        }
            
        else if (j == right.length){
            merged.push(...left.slice(i));
            break;

        }
    }
    console.log(i, j)

    return merged
}
// merge([3], [21])sdas

// console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1]))
