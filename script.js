const books = [{
   title: 'Chicken Soup for Soul',
   author: 'Jack Canfield',
}, {
   title: 'Rich Dad Poor Dad',
   author: 'Robert Kiyosaki',
},]


const booksContainer =
   `<table class="table" id="table">
      <tr class="headings">
         <th class="heading">Title</th>
         <th class="heading">Author</th>
         <th class="heading">Action</th>
      </tr>
      <tr>
      <div class="book-row"></div>
      </tr>
   </table>
   <form class="" id="add-form">
      <fieldset>
         <legend>Add Books </legend>
         <input type="text" name="title" id="title" placeholder="Enter Book Title">
         <input type="text" name="author" id="author" placeholder="Enter Book Author">
         <div class="btn-container">
            <button class="add-btn" type="button" name="submit" id="addBooks">Add</button>
         </div>
      </fieldset>
   </form>`

document.getElementById('book-container').innerHTML = booksContainer;
const bookRow = document.querySelector('.book-row');
bookRow.innerHTML = books.map(book =>
   `<tr>
      <td class="data">${book.title}</td>
      <td class="data">${book.author}</td>
      <td class="data"><button type="submit">Remove</button></td>
   </tr>`
).join('');

const addBooks = document.getElementById('addBooks');

let id = 0;
addBooks.addEventListener('click', () => {
   const title = document.getElementById('title').value;
   const author = document.getElementById('author').value;
   // Create a "td" node:
   const tr = document.createElement("tr");
   tr.setAttribute('id', 'tr-' + (id++));
   // Create a text node:
   const td = tr.appendChild(document.createElement('td'));
   td.innerHTML = title;
   const td1 = tr.appendChild(document.createElement('td'));
   td1.innerHTML = author;
   const td2 = tr.appendChild(document.createElement('button'));
   td2.innerHTML = 'Remove';
   td2.setAttribute('class', 'removeBook')
   console.log(td2);
   document.getElementById('table').appendChild(tr);

   const removeBooks = document.querySelectorAll('.removeBook');

   removeBooks.forEach((elem, index) => {
      elem.addEventListener('click', () => {
         const div = tr.classList;
         if (tr.id === ('tr-' + index)) {
            div.add("none");
         }
      })
   })

});






