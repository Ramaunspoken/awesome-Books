function Book(name, writer) {
  this.id = this.generateId();
  this.name = name;
  this.writer = writer;
}

Book.prototype.generateId = function () {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

function ManageBooks() {
  if (localStorage.getItem('books')) {
    this.books = JSON.parse(localStorage.getItem('books'));
  } else {
    this.books = [];
  }
}

ManageBooks.prototype.put = function (name, writer) {
  const book = new Book(name, writer);
  this.books.push(book);
  this.save();
  this.display();
};

ManageBooks.prototype.save = function () {
  if (this.books.length > 0) {
    localStorage.setItem('books', JSON.stringify(this.books));
  } else {
    localStorage.removeItem('books');
  }
};

ManageBooks.prototype.delete = function (e) {
  const { id } = e.target;
  this.books = this.books.filter((book) => id !== book.id);
  this.save();
  this.display();
};

// Show books
ManageBooks.prototype.display = function () {
  const bookList = document.querySelector('.books-list');
  if (this.books.length > 0) {
    bookList.innerText = '';
    // add books
    this.books.forEach((book) => {
      // One book item
      const li = document.createElement('li');
      li.innerText = `${book.name} by ${book.writer}`;
      li.className = 'book-item';

      // Remove
      const btn = document.createElement('button');
      btn.id = book.id;
      btn.className = 'btn-remove';
      btn.innerText = 'Remove';
      btn.addEventListener('click', (e) => {
        this.delete(e);
      });

      li.appendChild(btn);
      bookList.appendChild(li);
    });
  } else {
    bookList.innerText = 'Empty Book List!';
  }
};

ManageBooks.prototype.onAddBook = function (e) {
  e.preventDefault();
  const name = document.getElementById('name');
  const writer = document.getElementById('writer');
  const err = document.querySelector('.error');
  if (name.value.trim() === '' || writer.value.trim() === '') {
    err.innerText = 'No Book is added!, Please fill all fields to Procced.';
  } else {
    err.innerText = '';
    this.put(name.value, writer.value);
    name.value = '';
    writer.value = '';
  }
};

const books = new ManageBooks();

window.onload = () => {
  books.display();
};

const putBookForm = document.getElementById('put-book');
putBookForm.addEventListener('submit', (e) => {
  books.onAddBook(e);
});
