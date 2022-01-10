export class BookList {
  constructor() {
    this.books = [];
  }

  checkBooks() {
    if (localStorage.getItem('books')) {
      this.books = JSON.parse(localStorage.getItem('books'));
    }
  }

  saveBooks() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }
}