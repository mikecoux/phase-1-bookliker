//refactored code
let currentBook

document.addEventListener('DOMContentLoaded', fetchBooks())

function fetchBooks () {
    fetch ('http://localhost:3000/books')
        .then (res => res.json())
        .then (data => {
            //list books 
            listBooks(data)
            //show book details
            showDetails(data[0])
        })
}

function listBooks (booksObj) {
    booksObj.forEach((book) => {
        let listItem = document.createElement('li')
        let bookList = document.querySelector('#list')
        listItem.innerText = book.title
        listItem.className = 'book-title'
        bookList.append(listItem)
        
        //add click listener
        listItem.addEventListener('click', () => {
            showDetails(book)
        })
     })
}

function showDetails(bookObj) {
    currentBook = bookObj

    const {id, title, subtitle, description, author, img_url, users} = bookObj
    const bookPanel = document.getElementById('show-panel')
    bookPanel.innerHTML = `
        <img src="${img_url}">
        <div class="book-panel-content">
            <h4>${title}</h4>
            <p>${description}</p>
            <ul id="book-likes-list">
            </ul>
        </div>
        <div class="buttons">
            <button id="like-button"> LIKE </button>
        </div>
    `
    let userList = document.getElementById('book-likes-list')
    users.forEach(user => {
        userName = document.createElement('li')
        userName.innerText = user.username
        userList.append(userName)
    })

    handleLike()
}

function handleLike () {
    likeButton = document.querySelector('#like-button')
    likeButton.addEventListener('click', () => {
        //create the new user object
        let me = {'id': 11, 'username': 'mikecoux'}
        let userList  = currentBook.users
        let userArray = [...userList, me]
        let userObj = {users: userArray}
        //patch the userlist
        fetch (`http://localhost:3000/books/${currentBook.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userObj)
        })
            .then(res => res.json())
            .then(data => {
                showDetails(data)
            })
    })
}