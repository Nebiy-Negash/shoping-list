//* get our functions from firebase  
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import { getDatabase, ref, push, onValue, remove} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'

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
  if(inputValue === '') {
    shoppingList === null
  } else { 
    push(shoppingListInDB ,inputValue)
  emptyInputField();
}
 
});

onValue(shoppingListInDB, function(snapshot) {

  if (snapshot.exists()) {
    const dbItems = Object.entries(snapshot.val())
    clearListItems();
    for (let i = 0; i < dbItems.length; i++) {
      let currentItem = dbItems[i]
      let currentItemID = currentItem[0]
      let currentItemValue = currentItem[1]
      displayListItems(currentItem)
    }

  } else {
    shoppingList.innerHTML = 'No items here yet!'
  }

})

function displayListItems(item) {
  let itemID = item[0]
  let itemValue = item[1]

  let newList = document.createElement('li');
  newList.textContent = itemValue 
  shoppingList.appendChild(newList)

  newList.addEventListener('click',function() {
    let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
    remove(exactLocationOfItemInDB)
  } )
}

function emptyInputField() {
  inputField.value = '';
}

function clearListItems() {
  shoppingList.innerHTML = '';
}