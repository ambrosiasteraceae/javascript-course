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
    hide()
    const total = images.length;
    currentIndex  = (orientation + currentIndex + total) % total;
    show()
    img.src = images[currentIndex];
}


left.addEventListener("click",()=>{
    arrowMove(-1);
})

right.addEventListener("click",  ()=>{
    arrowMove(1);
})



setInterval(()=>arrowMove(1), 5000);

