//https://recursion.vercel.app/
fn([5, 3 , 2, 1, 12, 0, 19, 18, 4, 25, 9])

function fn(){

    //base case
    if (array.length == 1)
        return array
    //halve
    const mid = array.length % 2 == 0? array.length/2 : (array.length+1)/2
    const left = array.slice(0, mid);
    const right = array.slice(mid);

    const sortedLeft = fn(left);
    const sortedRight = fn(right);
    const merged = [];
    let i = 0;
    let j = 0;
    while(true)
    {  
        if(sortedLeft[i] <= sortedRight[j])
        {
            merged.push(sortedLeft[i]);
            i++;
        }
        else{
            merged.push(sortedRight[j]);
            j++;
        }

        if (i == sortedLeft.length)
        {
            merged.push(...sortedRight.slice(j));
            break;
        }
            
        else if (j == sortedRight.length){
            merged.push(...sortedLeft.slice(i));
            break;

        }
    }
    return merged
}



