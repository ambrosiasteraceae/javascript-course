import "./styles.css";

function createHomeContent()
{
const content = document.querySelector("#content");
const divContainer = document.createElement("div");
const header2 = document.createElement("h2");
const header3 =  document.createElement("h3");
const innerDiv = document.createElement("div");


divContainer.classList = "description";
header2.textContent = "Eat as the Emperors Did.";
header3.textContent = "Welcome to Triclinium Roma";
innerDiv.textContent = `Step into a feast from antiquity—where time slows, togas flow, and the aroma of roasted lamb, honey-glazed fruits, and fresh-baked panis fills the air. Inspired by the heart of the Roman Empire, Triclinium Roma invites you to recline, relax, and revel as our ancestors once did.        Dine among marble columns, sip mulsum beneath canvas awnings, and let the spirit of Rome’s golden age bring your appetite to life. Whether you’re a patrician or plebeian, you’ll eat like Caesar tonight.`;
 
[header2, header3, innerDiv].forEach((ele) => divContainer.appendChild(ele));
console.log("Hello contensdst");
content.appendChild(divContainer);

}

export  {createHomeContent};