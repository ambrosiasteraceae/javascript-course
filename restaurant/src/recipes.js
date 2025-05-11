import "./styles.css";


const recipesList = [["Rome, Ancient",
    "Roman Cheese Fritters (Encytum)",
    "Essentially a spiral-shaped version of globi, this simple two-ingredient batter is fried and topped with honey and poppyseeds",
    "Read More"],
    ["Rome, Ancient",
    "Ancient Roman Flamingo (Duck)",
    "A delicious sweet and savory sauce that I’m using with a roasted duck instead of flamingo",
    "Read More"],
    ["Rome, Ancient",
    "Ancient Roman Hand-Pressed Cheese",
    "Slightly nutty fresh cheese that’s somewhere between  farmer’s cheese and mozzarella",
    "Read More"],
    ["Rome, Greece, Ancient",
    "Game Hens with Hazelnut Sauce",
    "A complex, savory sauce for poultry made with hazelnuts or almonds",
    "Read More"],
    ["Rome, Ancient",
    "Savillum (Roman Cheesecake)",
    "A simple and tasty ancient Roman cheesecake sweetened with honey and sprinkled with poppy seeds",
    "Read More"],
    ["Rome, Ancient",
    "Roman Honey Glazed Mushrooms",
    "Honey, long pepper, and mushrooms combine for a simple but flavorful dish",
    "Read More"]];
    

function createRecipeContent(){

    console.log("func calledc")
const content = document.querySelector("#content");
const divContainer = document.createElement("div");


divContainer.classList = "recipes";


recipesList.forEach((recipe, recipeIndex) => {

    const recipeDiv = document.createElement("div");
    recipeDiv.classList = "recipe";
    const locationDiv = document.createElement("p");
    const titleDiv = document.createElement("p");
    const descriptionDiv =  document.createElement("p");
    const readDiv = document.createElement("p");
    // const innerRecipeDiv = document.createElement("div");

    [locationDiv, titleDiv, descriptionDiv, readDiv].forEach((item, itemIndex) =>{
        item.textContent = recipe[itemIndex];
        recipeDiv.appendChild(item);
    })
    
    divContainer.appendChild(recipeDiv);
    console.log("finished")
});
content.appendChild(divContainer);

}

export {createRecipeContent};