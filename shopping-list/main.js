//* get our functions from firebase  
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import { getDatabase, ref, push, onValue} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'

//* grab the inputfield and button from html
const inputField = document.querySelector('#input-field');
const addButton = document.querySelector('#add-button');
const shoppingList = document.querySelector('#shopping-list');

//* connecting to the database
const appSettings = {
  databaseURL: 'https://shoppinglist-68884-default-rtdb.firebaseio.com/'
}

//* initializing and setting up the database
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, 'shoppingList')

addButton.addEventListener('click',function() {
  let inputValue = inputField.value
  push(shoppingListInDB ,inputValue)
  emptyInputField();
});

onValue(shoppingListInDB, function(snapshot) {
  clearListItems();
  const dbItems = Object.values(snapshot.val())
  function displayItems(dbItems) {
    displayListItems(dbItems )
  }
  dbItems.forEach(displayItems)
})

function displayListItems(itemValue) {
  const html =  `<li> ${itemValue}</li>`
  shoppingList.innerHTML += html;
}

function emptyInputField() {
  inputField.value = '';
}

function clearListItems() {
  shoppingList.innerHTML = '';
}