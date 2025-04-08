const lib = [];
const table = document.querySelector("table");
const tbody = table.getElementsByTagName("tbody")[0];
function Book (title, author, pages){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.type = "";
    this.id = crypto.randomUUID();
}

Book.prototype.getInfo = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages`
}

// book = new Book("The Hobbit", "J.R.R. Tolkien", 1356);


function addBook(title, author, pages){
    let book = new Book(title, author, pages);
    lib.push(book);
    // console.log(`Book with id:${book.id} was succesfully added`)
    return 
}

addBook("The Hobbit", "J.R.R. Tolkien", 356);
addBook("The Lord of The Rings", "J.R.R. Tolkien", 929);
addBook("The Hitchhiker's Guide to the Galaxy", "Douglas Adams", 876)
// console.log(lib);




function addTableRowChild()
{
    const row = document.createElement("tr");
    
    for (let i = 0; i<5; i++)
    {
        const cell = document.createElement("td");
        const cellText = document.createTextNode(`input${i}`);
        cell.appendChild(cellText);
        row.appendChild(cell);
    }
    tbody.appendChild(row);

}

console.log(table)
console.log(tbody)
addTableRowChild()
addTableRowChild()
addTableRowChild()

