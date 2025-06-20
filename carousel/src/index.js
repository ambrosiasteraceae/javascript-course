import "./styles.css";

import img1 from "./assets/andrew-svk-f9rQRvPkWds-unsplash.jpg";
import img2 from "./assets/andrew-svk-nQvFebPtqbw-unsplash.jpg";
import img3 from "./assets/andrew-svk-O-jSLVxzoBg-unsplash.jpg";
import img4 from "./assets/andrew-svk-xr5kxyB9yxM-unsplash.jpg";
import img5 from "./assets/fahd-ahmed-YzSXoXXg9uA-unsplash.jpg";

const images =  [img1, img2, img3, img4, img5];

const div = document.getElementsByClassName("main-slide")[0];
const img = document.createElement("img");

const left = document.getElementsByClassName("left")[0];
const right = document.getElementsByClassName("right")[0];
const navigation = document.querySelector(".navigation");



for(let i = 0; i<images.length; i++){
    let div = document.createElement("div");
    div.className = "circle";
    div.dataset.key = i;
    navigation.appendChild(div);
    div.addEventListener("click",(e)=>{
        hide();
        img.src=images[e.target.dataset.key]
        currentIndex = Number(e.target.dataset.key)
        show();
    })
}

let currentIndex = 2;
show();


function show(){
    navigation.children[currentIndex].className += " active";
}
function hide(){
    navigation.children[currentIndex].classList.remove("active");
}
img.className = "slide";
img.src = images[currentIndex];

div.appendChild(img);



function arrowMove(orientation){

    if(orientation < 0)
    {
        if (currentIndex == 0)
            currentIndex = images.length - 1;          
        else
            currentIndex -=1;
    }
    else{

        if(currentIndex == images.length - 1)
            currentIndex = 0;
        else 
            currentIndex +=1;
    }

    return currentIndex
}


left.addEventListener("click",()=>{
    hide()
    const active = arrowMove(-1);
    img.src = images[active];
    show()
})

right.addEventListener("click",  ()=>{
    hide()
    const active = arrowMove(1);
    img.src = images[active];
    show()
})




