function Books(id, title, author) {
   this.id = id;
   this.title = title;
   this.author = author;
}
const bookList = [];
const addBookBtn = document.getElementById('addBookBtn');
const bookTable = document.getElementById('bookTable');
const emptyMessage = document.querySelector('.emptyBookMsg');
const getBooks = JSON.parse(localStorage.getItem('books'));
getBooksList();

function getBooksList() {

   if (getBooks.length) {
      window.addEventListener('DOMContentLoaded', (event) => {
         getBooks.forEach(item => {
            createBookRow(item, false);
         })
      })
   } else {
      bookTable.style.cssText = `display:none`;
      emptyMessage.style.cssText = `display:block`;
   }
}

let id = bookList.length;

//Add Books to Table from local storage
addBookBtn.onclick = function () {
   bookTable.style.cssText = `display:block`;
   emptyMessage.style.cssText = `display:none`;

   const title = document.getElementById('title').value;
   const author = document.getElementById('author').value;
   const book = new Books(id++, title, author);

   bookList.push(book);
   localStorage.setItem('books', JSON.stringify(bookList));
   createBookRow(book);
}

//Populate book details from store with remove button
function createBookRow(item) {
   const bkRow = document.createElement("tr");
   bkRow.setAttribute('id', item.id);

   const bkTitle = bkRow.appendChild(document.createElement('td'));
   bkTitle.innerHTML = item.title;

   const bkAuthor = bkRow.appendChild(document.createElement('td'));
   bkAuthor.innerHTML = item.author;

   const removeBtn = bkRow.appendChild(document.createElement('button'));
   removeBtn.innerHTML = 'Remove';
   removeBtn.setAttribute('class', 'removeBook')
   removeBtn.classList.add('btn');

   bookTable.appendChild(bkRow);
   removeBook(bkRow);
}

function removeBook(bkRow) {
   const getBook = JSON.parse(localStorage.getItem('books'));

   const removeBooks = document.querySelectorAll('.removeBook');

   removeBooks.forEach((elem) => {
      elem.addEventListener('click', () => {
         const bookFiltered = getBook.filter(item => item.id !== parseInt(bkRow.id));
         if (bookFiltered !== null) localStorage.setItem('books', JSON.stringify(bookFiltered));

         if (bookList.length) {
            bookTable.style.cssText = `display:none`;
            emptyMessage.style.cssText = `display:block`;
         }
         setTimeout(() => location.reload(), 500);
      })
   })
}


