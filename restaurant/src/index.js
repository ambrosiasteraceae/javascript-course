import "./styles.css";
import {createHomeContent} from "./home.js";
import {createRecipeContent} from "./recipes.js";

createHomeContent()
// createRecipeContent();

const content = document.querySelector("#content");
const homeBtn = document.querySelector(".home-btn")
const recipeBtn = document.querySelector(".recipe-btn")
// const aboutBtn = document.querySelector(".about-btn")

homeBtn.addEventListener("click", () => {
    content.textContent = "";
    createHomeContent();
});

recipeBtn.addEventListener("click", () => {
    content.textContent = "";
    createRecipeContent();
});
