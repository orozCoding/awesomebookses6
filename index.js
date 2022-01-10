import * as FN from './modules/functions.js';
import { Book, bookList, bookListSection } from './modules/classes.js';
import { DateTime } from './node_modules/luxon/build/es6/luxon.js';

const currentDateTime = document.querySelector('.date-time');
const now = DateTime.now().toLocaleString(DateTime.DATETIME_MED);
currentDateTime.textContent = now;

bookListSection.id = 'list';
bookListSection.innerHTML = '<h2>Book List</h2>';

window.addEventListener('DOMContentLoaded', () => {
  FN.populateMainSection();
  bookList.checkBooks();
  const book = new Book();
  book.displayBooks();
});

const linkItems = document.querySelectorAll('.nav-item');
linkItems.forEach((item) => {
  item.addEventListener('click', () => {
    const activeLink = document.getElementById(item.id);
    const activeSection = document.getElementById(item.id.substring(5));

    if (!activeLink.classList.contains('active')) {
      activeLink.classList.add('active');
      activeSection.classList.remove('d-off');
    }

    linkItems.forEach((previousItem) => {
      const hiddenSection = document.getElementById(previousItem.id.substring(5));
      if (previousItem.id !== item.id && previousItem.classList.contains('active')) {
        previousItem.classList.remove('active');
      }
      if (previousItem.id !== item.id && !hiddenSection.classList.contains('d-off')) {
        hiddenSection.classList.add('d-off');
      }
    });
  });
});
