document.addEventListener("DOMContentLoaded", init);

function init () {
    listBooks()
}

//Definitely want to refactor this code!
//refactor using the innerhtml method in comms with server videos

function listBooks () {
    fetch ('http://localhost:3000/books')
    .then (res => res.json())
    .then (books => {
        for (let book in books) {
            let bookObj = books[book]

            //create the html elements
            const bookList = document.getElementById('list')
            const bookListItem = document.createElement('li')
            bookListItem.className = 'book-title'
            bookListItem.innerText = bookObj.title
            //add click listener
            bookListItem.addEventListener('click', () => {
                console.log('title clicked')

                //display book data
                const bookPanel = document.getElementById('show-panel')
                bookPanel.innerHTML = `
                    <img src="${bookObj['img_url']}">
                    <div class="book-panel-content">
                        <h4>${bookObj.title}</h4>
                        <p>${bookObj.description}</p>
                        <ul class="book-likes-list">
                        </ul>
                    </div>
                    <div class="buttons">
                        <button id="like-button"> LIKE </button>
                    </div>
                `

                let userLikes = bookObj.users
                let userLikesList = bookPanel.querySelector('.book-likes-list')
                userLikes.forEach((name) => {
                    const user = document.createElement('li')
                    user.innerText = name.username
                    userLikesList.appendChild(user)
                })

                let likeButton = bookPanel.querySelector('#like-button')
                likeButton.addEventListener('click', () => {
                    const me = {'id': 11, 'username': 'mikecoux'}
                    bookObj.users.push(me)
                    console.log(bookObj.users)

                    const myName = document.createElement('li')
                    myName.innerText = me.username

                    userLikesList.appendChild(myName)
                    console.log(userLikesList)

                    // fetch (`http://localhost:3000/books/${bookObj.id}`, {
                    //     method: 'PATCH',
                    //     headers: {
                    //         'Content-Type': 'application/json',
                    //     },
                    //     body: JSON.stringify(bookObj.users),
                    // })
                    // .then(res => res.json())
                    // .then(data => console.log(data))
                })

            })

            //append the booklist to the html element
            bookList.appendChild(bookListItem)
        }
    })
}

