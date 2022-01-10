import BookList from './booklist.js';

export const main = document.getElementById('main');
export const sectionTitle = document.createElement('h1');
export const bookListSection = document.createElement('section');
export const booksList = document.createElement('div');

export const bookList = new BookList();

export class Book {
  constructor(title, author) {
    this.id = this.idMaker().next().value;
    this.title = title;
    this.author = author;
  }

  // eslint-disable-next-line
  * idMaker() {
    let id;
    if (localStorage.getItem('bookId')) {
      id = parseInt(localStorage.getItem('bookId'), 10);
    } else {
      id = 0;
    }
    while (true) yield (id += 1);
  }

  addBook() {
    bookList.books.push(this);
    localStorage.setItem('bookId', this.id);
    bookList.saveBooks();
    this.displayBooks();
  }

  // eslint-disable-next-line
  removeBook(id) {
    bookList.books = bookList.books.filter((book) => book.id !== id);
    bookList.saveBooks();
  }

  displayBooks() {
    booksList.innerHTML = '';
    if (bookList.books.length === 0) {
      const emptyMessage = document.createElement('p');
      emptyMessage.textContent = 'No books found!';
      booksList.appendChild(emptyMessage);
    } else {
      bookList.books.forEach((book) => {
        const bookHTML = document.createElement('div');
        bookHTML.className = 'book';
        bookHTML.innerHTML = `
          <p><q>${book.title}</q> by ${book.author}</p>`;
        const removeBtn = document.createElement('button');
        removeBtn.setAttribute('type', 'button');
        removeBtn.id = `remove-book-${book.id}`;
        removeBtn.classList.add('btn', 'btn-remove', 'clickeable');
        removeBtn.innerHTML = 'Remove';
        removeBtn.addEventListener('click', () => {
          this.removeBook(
            bookList.books.find((item) => item.id === book.id).id,
          );
          removeBtn.parentElement.remove();
        });
        bookHTML.appendChild(removeBtn);
        booksList.appendChild(bookHTML);
      });
      bookListSection.appendChild(booksList);
    }
  }
}