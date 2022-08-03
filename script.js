class Books {
   constructor() {
      this.bookList = [];
   }
   static fetchBooks() {
      const getBooks = localStorage.getItem('books');
      return getBooks ? JSON.parse(getBooks) : [];
   }

   static updateBooks(books) {
      localStorage.setItem('books', JSON.stringify(books));
   }

   static getBooksList() {
      if (Books.fetchBooks()) {
         this.bookList = Books.fetchBooks();

      }
   }

   addBook(book) {
      this.bookList = Books.fetchBooks();
      this.bookList.push(book);
      Books.updateBooks(this.bookList);
   }

   removeBook(event) {
      const id = parseInt(event.target.id);
      this.bookList = Books.fetchBooks();
      this.bookList = this.bookList.filter(i => i.id !== id);
      event.target.parentElement.remove();
      Books.updateBooks(this.bookList);
   }
}

window.onload = () => {
   Books.getBooksList();
   if (Books.bookList) {
      Books.bookList.forEach(item => {
         createBookRow(item);
      })
   }
}

function createBookRow(item) {
   const bookTable = document.getElementById('bookTable');
   const bkRow = document.createElement("tr");
   const bookDetail = bkRow.appendChild(document.createElement('td'));
   const removeBtn = bkRow.appendChild(document.createElement('button'));

   bkRow.setAttribute('id', item.id);
   bookDetail.innerHTML = `"${item.title}" by ${item.author}`;
   removeBtn.innerHTML = 'Remove';
   removeBtn.setAttribute('class', 'removeBtn')
   removeBtn.setAttribute('id', item.id)
   removeBtn.classList.add('btn');
   bookTable.appendChild(bkRow);

   const removeBtns = document.querySelectorAll('.removeBtn');
   removeBtns.forEach((elem) => {
      elem.addEventListener('click', (event) => {
         const bookObj = new Books();
         bookObj.removeBook(event);
      })
   })
}

const addBookBtn = document.getElementById('addBookBtn');
addBookBtn.onclick = function () {
   Books.bookList = Books.fetchBooks() ? Books.fetchBooks() : [];

   let id = 0;
   if (Books.bookList && Books.bookList.length > 0) {
      id = Books.bookList[Books.bookList.length - 1].id + 1
   }
   const title = document.getElementById('title').value;
   const author = document.getElementById('author').value;

   if (title && author) {
      const book = { 'id': id++, 'title': title, 'author': author }
      const bookObj = new Books();
      bookObj.addBook(book);
      createBookRow(book);
   }
}

