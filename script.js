class Books {
   constructor(id, title, author) {
      this.id = id;
      this.title = title;
      this.author = author;
   }
   static bookList = [];
   static fetchBooks() {
      return JSON.parse(localStorage.getItem('books'));
   }

   static updateBooks(books) {
      localStorage.setItem('books', JSON.stringify(books));
   }
}
let bookList = [];
const addBookBtn = document.getElementById('addBookBtn');
const bookTable = document.getElementById('bookTable');
const emptyMessage = document.querySelector('.emptyBookMsg');

window.onload = () => { getBooksList() }

function getBooksList() {
   if (Books.fetchBooks()) {
      Books.bookList = Books.fetchBooks();
      Books.bookList.forEach(item => {
         createBookRow(item);
      })
   }
}

//Add Books to Table from local storage
addBookBtn.onclick = function () {
   Books.bookList = Books.fetchBooks() ? Books.fetchBooks() : [];

   let id = 0;
   if (Books.bookList && Books.bookList.length > 0) {
      id = Books.bookList[Books.bookList.length - 1].id + 1
   };
   const title = document.getElementById('title').value;
   const author = document.getElementById('author').value;

   if (title && author) {
      const book = new Books(id++, title, author);
      Books.bookList.push(book);

      localStorage.setItem('books', JSON.stringify(Books.bookList));
      createBookRow(book);
   }
}

//Populate book details from store with remove button
function createBookRow(item) {
   const bkRow = document.createElement("tr");
   bkRow.setAttribute('id', item.id);

   const bookDetail = bkRow.appendChild(document.createElement('td'));
   bookDetail.innerHTML = `"${item.title}" by ${item.author}`;

   const removeBtn = bkRow.appendChild(document.createElement('button'));
   removeBtn.innerHTML = 'Remove';
   removeBtn.setAttribute('class', 'removeBtn')
   removeBtn.setAttribute('id', item.id)
   removeBtn.classList.add('btn');

   bookTable.appendChild(bkRow);
   removeBook();
}

function removeBook() {
   const removeBooks = document.querySelectorAll('.removeBtn');

   removeBooks.forEach((elem) => {
      elem.addEventListener('click', (event) => {
         const id = parseInt(event.target.id);
         Books.bookList = Books.bookList.filter(item => item.id !== id);
         Books.updateBooks(Books.bookList);
         event.target.parentElement.remove();
         location.reload();
      })
   })
}


