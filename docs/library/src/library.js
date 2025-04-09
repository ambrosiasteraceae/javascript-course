const lib = [];
const table = document.querySelector("table");
const tbody = table.getElementsByTagName("tbody")[0];
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





function updateBookRow()
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
    row.appendChild(cell);
    cell.appendChild(element);

    tbody.appendChild(row);

}

function addTableRowChild()
{
    const row = document.createElement("tr");
    
    for (let i = 0; i<6; i++)
    {
        let element;
        const cell = document.createElement("td");

        if (i==5)
             element = document.createElement("button");
        else
             element = document.createTextNode(`input${i}`);

    cell.appendChild(element);
    row.appendChild(cell);
    }

    tbody.appendChild(row);
}

// console.log(table)

// // console.log(tbody)

// // addTableRowChild()
// // addTableRowChild()
// // addTableRowChild()
// // addTableRowChild()
// // addTableRowChild()
populateBooks ();


