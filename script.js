function Books(id, title, author) {
   this.id = id;
   this.title = title;
   this.author = author;
}
let bookList = [];
const addBookBtn = document.getElementById('addBookBtn');
const bookTable = document.getElementById('bookTable');
const emptyMessage = document.querySelector('.emptyBookMsg');
const getBooks = JSON.parse(localStorage.getItem('books'));
getBooksList();

function getBooksList() {

   if (getBooks !== null) {
      getBooks.forEach(item => {
         createBookRow(item);
      })
   } else {
      bookTable.style.cssText = `display:none`;
      emptyMessage.style.cssText = `display:block`;
   }
}

let id = 0;

//Add Books to Table from local storage
addBookBtn.onclick = function () {
   if (getBooks === null) {
      bookTable.style.cssText = `display:block`;
      emptyMessage.style.cssText = `display:none`;
   }

   bookList === getBooks ? getBooks : [];
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
   removeBtn.setAttribute('id', item.id)
   removeBtn.classList.add('btn');

   bookTable.appendChild(bkRow);
   removeBook();
}

function removeBook() {
   let getBooks = JSON.parse(localStorage.getItem('books'));

   const removeBooks = document.querySelectorAll('.removeBook');

   removeBooks.forEach((elem) => {
      elem.addEventListener('click', (event) => {
         const id = parseInt(event.target.id);
         getBooks = getBooks.filter(item => item.id !== id);
         localStorage.setItem('books', JSON.stringify(getBooks));

         if (getBooks.length === 0) {
            bookTable.style.cssText = `display:none`;
            emptyMessage.style.cssText = `display:block`;
         }
         location.reload();
      })
   })
}


