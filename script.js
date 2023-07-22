import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';

const appSettings = {
  databaseURL: 'https://playground-12a3c-default-rtdb.asia-southeast1.firebasedatabase.app/',
};
const app = initializeApp(appSettings);
const database = getDatabase(app);
const itemsDatabase = ref(database, 'items');

const addButton = document.getElementById('add-button');
const inputField = document.getElementById('input-field');
const list = document.getElementById('list');

function clearInputField() {
  inputField.value = '';
}

function appendItem(item) {
  let itemID = item[0];
  let itemValue = item[1];
  let newElement = document.createElement('li');
  newElement.textContent = itemValue;
  newElement.addEventListener('click', function () {
    let itemLocation = ref(database, `items/${itemID}`);
    remove(itemLocation);
  });
  list.append(newElement);
}

function clearList() {
  list.innerHTML = '';
}

addButton.addEventListener('click', function () {
  if (inputField.value != '') {
    let inputValue = inputField.value;
    push(itemsDatabase, inputValue);
    clearInputField();
  }
});

onValue(itemsDatabase, function (snapshot) {
  if (snapshot.exists()) {
    let valuesArr = Object.entries(snapshot.val());
    clearList();
    for (let i = 0; i < valuesArr.length; i++) {
      let currentItem = valuesArr[i];
      appendItem(currentItem);
    }
  } else {
    list.innerHTML = 'Nothing in here... yet.';
  }
});
