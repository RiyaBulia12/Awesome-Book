const tableSection = document.getElementById('table-section');
const listNav = document.getElementById('list');
const createNav = document.getElementById('create');
const contactNav = document.getElementById('contact');
const addForm = document.querySelector('.add-form');
const contactForm = document.getElementById('contact-form');
const dateSection = document.getElementById('date');
const successMsg = document.getElementById('success');
const emptyMsg = document.getElementById('empty');

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

   static isEmpty() {
      if (JSON.parse(localStorage.getItem('books'))) {
         return JSON.parse(localStorage.getItem('books')).length === 0;
      }
      return (localStorage.getItem('books') === null ||
         localStorage.getItem('books').value === undefined);
   }

}

window.onload = () => {
   dateSection.innerHTML = Date()
   tableSection.classList.remove('none');
   Books.getBooksList();
   showEmptyMessage();
   if (!Books.isEmpty()) {
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
         showEmptyMessage();
      })
   })
}

const addBookBtn = document.getElementById('add-book-btn');
addBookBtn.onclick = function () {
   Books.bookList = Books.fetchBooks() ? Books.fetchBooks() : [];

   let id = 0;
   if (Books.bookList && Books.bookList.length > 0) {
      id = Books.bookList[Books.bookList.length - 1].id + 1
   }
   const title = document.getElementById('title');
   const author = document.getElementById('author');

   title.oninput = function () { hideSuccess(); }
   author.oninput = function () { hideSuccess(); }

   if (title.value && author.value) {
      const book = { 'id': id++, 'title': title.value, 'author': author.value }
      const bookObj = new Books();
      bookObj.addBook(book);
      createBookRow(book);
      title.value = '';
      author.value = '';
      successMsg.innerHTML = 'Book added successfully'
      successMsg.style.cssText = `color:green`;
   } else {
      successMsg.innerHTML = 'Empty fields not allowed'
      successMsg.style.cssText = `color:red;`;
   }
   successMsg.classList.remove('hidden');
}

function hideSuccess() {
   successMsg.classList.add('hidden');
}

function showEmptyMessage() {
   if (Books.isEmpty()) {
      tableSection.classList.add('none');
      emptyMsg.classList.remove('none');
   } else {
      tableSection.classList.remove('none');
   }
}

listNav.addEventListener('click', () => {
   showEmptyMessage();
   addForm.classList.add('none');
   contactForm.classList.add('none');
})

createNav.addEventListener('click', () => {
   hideSuccess();
   emptyMsg.classList.add('none');
   tableSection.classList.add('none');
   addForm.classList.remove('none');
   contactForm.classList.add('none');
})

contactNav.addEventListener('click', () => {
   emptyMsg.classList.add('none');
   addForm.classList.add('none');
   tableSection.classList.add('none');
   contactForm.classList.remove('none');
})
