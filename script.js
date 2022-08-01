function Books(id, title, author) {
   this.id = id;
   this.title = title;
   this.author = author;
}
const bookList = [];
const addBookBtn = document.getElementById('addBookBtn');
const bookTable = document.getElementById('bookTable');
const emptyMessage = document.querySelector('.emptyMessage');

const getBooks = JSON.parse(localStorage.getItem('books'));
let id = 0;

if (getBooks) {
   window.addEventListener('DOMContentLoaded', (event) => {
      getBooks.forEach(item => {
         populateBookDetails(item);
      })
   })
} else {
   bookTable.style.cssText = `display:none`;
   emptyMessage.style.cssText = `display:block`;
}

//Add Books to Table
addBookBtn.onclick = function () {
   bookTable.style.cssText = `display:block`;
   emptyMessage.style.cssText = `display:none`;

   const title = document.getElementById('title').value;
   const author = document.getElementById('author').value;
   const book = new Books(id++, title, author);

   bookList.push(book);
   localStorage.setItem('books', JSON.stringify(bookList));
   populateBookDetails(book);

   const getBook = JSON.parse(localStorage.getItem('books'));
   const removeBooks = document.querySelectorAll('.removeBook');
   removeBooks.forEach((elem, index) => {
      elem.addEventListener('click', () => {
         const bookFiltered = getBook.filter(item => item.id !== index);
         localStorage.setItem('books', JSON.stringify(bookFiltered));
         console.log(bookFiltered)
         populateBookDetails(bookFiltered);
      })
   })
}

//populate book details from store
function populateBookDetails(item) {
   const bkRow = document.createElement("tr");
   bkRow.setAttribute('id', item.id);

   const bkTitle = bkRow.appendChild(document.createElement('td'));
   bkTitle.innerHTML = item.title;

   const bkAuthor = bkRow.appendChild(document.createElement('td'));
   bkAuthor.innerHTML = item.author;

   const removeBtn = bkRow.appendChild(document.createElement('button'));
   removeBtn.innerHTML = 'Remove';
   removeBtn.setAttribute('class', 'removeBook')

   bookTable.appendChild(bkRow);
}





