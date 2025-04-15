const lib = [];
const table = document.querySelector("table");
const tbody = table.getElementsByTagName("tbody")[0];


const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");

const form = document.querySelector("form");

const createBtn = document.getElementById("createBtn");
const title = document.getElementById("book_title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const isRead = document.getElementById("read-flag");


function createBook(event) {
    // console.log(_title, _author, _pages);

    let book = new Book(title.value, author.value, pages.value);
    book.read = isRead.checked;
    lib.push(book);
    addBookRow(book);
    event.preventDefault();
}



form.addEventListener("submit", createBook);

// "Show the dialog" button opens the <dialog> modally
showButton.addEventListener("click", () => {
   dialog.showModal();
  });





  
//   // "Cancel" button closes the dialog without submitting because of [formmethod="dialog"], triggering a close event.
//   favDialog.addEventListener("close", (e) => {
//     outputBox.value = favDialog.returnValue === "default" ? "No return value." : `ReturnValue: ${favDialog.returnValue}.`; // Have to check for "default" rather than empty string
//   });
  
//   // Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
//   confirmBtn.addEventListener("click", (event) => {
//     event.preventDefault(); // We don't want to submit this fake form
//     favDialog.close(selectEl.value); // Have to send the select box value here.
//   });


NodeList.prototype.indexOf = Array.prototype.indexOf;

function Book (title, author, pages){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.id = crypto.randomUUID();
    this.read = false;
}


Book.prototype.getInfo = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages`
}

Book.prototype.toggleReadStatus = function () {
    this.read = this.read == true? false : true;
}


function addBook(title, author, pages){
    let book = new Book(title, author, pages);
    lib.push(book);
    return 
}




addBook("The Hobbit", "J.R.R. Tolkien", 356);
addBook("The Lord of The Rings", "J.R.R. Tolkien", 929);
addBook("The Hitchhiker's Guide to the Galaxy", "Douglas Adams", 876)


function removeBook(obj)
{

}


function updateBookRow(obj, e)
{
}


function populateBooks () 
{
        for (let book of lib)
        {
            // console.log(book);
            addBookRow(book);
        }

}
function addBookRow(book)
{
    const row = document.createElement("tr");
    for(const  [key,value] of Object.entries(book))
    {    
        const cell = document.createElement("td");
        const element = document.createTextNode(value);
        cell.appendChild(element);
        row.appendChild(cell);
    }
    const cell = document.createElement("td");
    const element = document.createElement("button");
    element.classList.add("book-row");
    element.addEventListener("click", btnToggleReadStatus);
    row.appendChild(cell);
    cell.appendChild(element);
    tbody.appendChild(row);

}

populateBooks ();

// let btnsArray = document.querySelectorAll(".book-row");
// btnsArray.forEach(function(elem) {elem.addEventListener("click", btnToggleReadStatus)});


function getChildIndex(node) {
    return Array.prototype.indexOf.call(tbody.children, node.parentNode);
}

function btnToggleReadStatus(event)
{
        let element = event.target;
        node = element.parentNode;
        index = getChildIndex(node);


        let bookObject = lib[index];
        bookObject.read = bookObject.read? false : true;

        node.previousSibling.textContent = bookObject.read.toString();
        
        console.log(bookObject.read);
        console.log();
        console.log(lib[index]);






    //need to update lib, if not already updated;
    //need to update the html
    




}

// function updateReadStatus(book, element)
// {
//     element.
// }

// for (let i = 0; i<btns.length; i++)
// {
//         btns[i].addEventListener("click", function(e) {
//         trows = document.querySelectorAll("tr");
//         // let element = e.target;
//         // let cell = element.parentNode;
//         // let row = cell.parentNode;
//         // let body = 
//         // console.log(element);
//         // console.log(element.parentNode);
//         // console.log(element.parentNode.parentNode);
//         // console.log(Array.prototype.indexOf.call(nodes, document.body););
//         // console.log(element.parentNode.parentNode.indexOf(element));
//         // var index = btns.indexOf(e.target);
//         // var element = trows[index];
//         // lib.splice(index,1);
//         // element.remove();
//         // console.log(lib);
//         // console.log(element);
//         // console.log(index);
//         // console.log(trows[index]);
//     });
// }