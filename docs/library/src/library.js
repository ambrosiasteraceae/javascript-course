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

const btnNames = ["read-toggle", "remove-toggle"];
const eventListeners = [btnToggleReadStatus, btnToggleDeleteRow]


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


function btnToggleDeleteRow(event)
{
    let element = event.target;
    node = element.parentNode;
    index = getChildIndex(node);
    lib.splice(index, 1);
    node.parentNode.remove();

}

function populateBooks () 
{
        for (let book of lib)
        {
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

    for (let i = 0; i<2; i++)
    
    {
        const cell = document.createElement("td");
        const element = document.createElement("button");
        element.classList.add(btnNames[i]);
        element.addEventListener("click", eventListeners[i]);
        row.appendChild(cell);
        cell.appendChild(element);
    }
    tbody.appendChild(row);

}

populateBooks ();

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
        console.log(lib[index]);

}
