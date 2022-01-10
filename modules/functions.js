import { main, booksList, bookListSection, sectionTitle } from '../index.js'; // eslint-disable-line
import { Book } from './classes.js';

export function populateAddBookSection() {
  const addBookSection = document.createElement('section');
  const addBookSectionTitle = document.createElement('h2');
  const form = document.createElement('form');
  addBookSection.id = 'add';
  addBookSection.classList.add('add-book', 'd-flex', 'col', 'd-off');
  addBookSectionTitle.textContent = 'Add a new book';
  addBookSectionTitle.className = 'section-title';
  form.id = 'create-form';
  form.innerHTML = `<input name="title" type="text" placeholder="title" id="title" required>
    <input name="author" type="text" placeholder="author" id="author" required>
    <button type="submit" id="form-button" class="clickeable btn">Add</button>
    <div id="success-msg"></div>`;

  addBookSection.appendChild(addBookSectionTitle);
  addBookSection.appendChild(form);

  function saveFormData(book) {
    localStorage.setItem('formData', JSON.stringify(book));
  }

  function displaySuccess() {
    const successMsg = document.getElementById('success-msg');
    successMsg.textContent = 'Your book has been added!';
    setTimeout(() => {
      successMsg.textContent = '';
    }, 3000);
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const { title, author } = form.elements;
    const newBook = new Book(title.value, author.value);
    newBook.addBook();
    saveFormData({ title: title.value, author: author.value });
    displaySuccess();
  });

  function checkFormData() {
    const { title, author } = form.elements;
    if (localStorage.getItem('formData')) {
      title.value = JSON.parse(localStorage.getItem('formData')).title;
      author.value = JSON.parse(localStorage.getItem('formData')).author;
    }
  }

  checkFormData();

  return addBookSection;
}

export function populateContactSection() {
  const contactSection = document.createElement('section');
  contactSection.id = 'contact';
  contactSection.classList.add('contact-info', 'd-flex', 'col', 'd-off');
  contactSection.innerHTML = `<h2 class="section-title">Contact information</h2>
     <p> Do you have a question or you just want to say <q>Hello</q>? <br />
         You can reachout to us: </p>
      <ul>
        <li>Our e-mail: mail@mail.com</li>
        <li>Our phome number: 0043586534422</li>
        <li>Our address: Streetname 22, 84503 City, Country</li>
      </ul>`;

  return contactSection;
}

export function populateMainSection() {
  booksList.className = 'books-container';
  sectionTitle.textContent = 'Awesome books';

  main.appendChild(sectionTitle);
  main.appendChild(bookListSection);
  main.appendChild(populateAddBookSection());
  main.appendChild(populateContactSection());
}
