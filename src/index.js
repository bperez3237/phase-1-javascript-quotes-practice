window.addEventListener('DOMContentLoaded', () => {

    initQuotes();
    makeForm();

})

function initQuotes() {
    fetch('http://localhost:3000/quotes?_embed=likes')
    .then(res => res.json())
    .then(quotes => quotes.forEach(quote => addQuotes(quote)))
    
}

function addQuotes(quoteData) {
    const list = document.getElementById('quote-list')

    let li = document.createElement('li')
    let bq = document.createElement('blockquote')
    let success = document.createElement('button')
    let danger = document.createElement('button')

    bq.innerHTML = `
    <p class="mb-0">${quoteData.quote}</p>
    <footer class="blockquote-footer">${quoteData.author}</footer>
    <br>
    `
    bq.class = 'blockquote'
    makeButtons(success,danger)
    bq.appendChild(success)
    bq.appendChild(danger)
    li.appendChild(bq)
    list.appendChild(li)
}

function makeButtons(bttn1, bttn2) {
    bttn1.class = 'btn-success'
    bttn2.class = 'btn-danger'
    bttn1.innerHTML = `Likes: <span>0</span>`
    bttn2.textContent = 'Delete'


    bttn1.addEventListener('click', (e) => {
        console.log('like')
        likeQuote(e,e.target.id)
    })
    bttn2.addEventListener('click', (e) => {
        console.log('delete')
        deleteQuote(e)
    })
}

function makeForm() {
    const form = document.getElementById('new-quote-form')
    const list = document.getElementById('quote-list')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        console.log('here')
        postToList(e)
    })
}

function postToList(e) {
    const configOptions = {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body: JSON.stringify({
            quote: e.target.quote.value,
            author: e.target.author.value
        })
    }

    fetch(`http://localhost:3000/quotes`,configOptions)
    .then(res => res.json())
    .then(quote => renderSingleQuote(quote))
}

function renderSingleQuote(quote) {
    const list = document.getElementById('quote-list')

    let li = document.createElement('li')
    let bq = document.createElement('blockquote')
    let success = document.createElement('button')
    let danger = document.createElement('button')

    bq.innerHTML = `
    <p class="mb-0">${quote.quote}</p>
    <footer class="blockquote-footer">${quote.author}</footer>
    <br>
    `
    bq.class = 'blockquote'
    makeButtons(success,danger)
    bq.appendChild(success)
    bq.appendChild(danger)
    li.appendChild(bq)
    list.appendChild(li)

}

function deleteQuote(e) {
    //complete
}

function likeQuote(e,id) {
    //complete then done
}