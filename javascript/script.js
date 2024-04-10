document.addEventListener("DOMContentLoaded", function () {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        if (response.status === 400) {
          throw new Error("Richiesta non valida")
        }
        if (response.status === 401) {
          throw new Error("Non autorizzato")
        }
        if (response.status === 403) {
          throw new Error("Vietato")
        }
        if (response.status === 404) {
          throw new Error("Non trovato")
        }
        throw new Error("Errore durante il recupero dei dati")
      }
    })
    .then(arrayOfBooks => {
      const bookshelfRow = document.getElementById("bookshelf-row")

      arrayOfBooks.forEach(bookInTheArray => {
        const bookBox = document.createElement("div")
        bookBox.className =
          "book-box col book d-flex col-12 col-sm-6 col-md-4 col-lg-3 g-3"

        const book = document.createElement("div")
        book.className = "card h-100"

        const bookInfo = document.createElement("div")
        bookInfo.className =
          "card-body d-flex flex-column justify-content-between w-75"

        const cardButtons = document.createElement("div")
        cardButtons.className = "card-buttons d-flex w-75"

        const buttonHide = document.createElement("button")
        buttonHide.className = "btn btn-outline-secondary col button-hide"
        buttonHide.innerText = "hide"
        buttonHide.addEventListener("click", hideCard)

        const buttonBuy = document.createElement("button")
        buttonBuy.className = "btn btn-success col button-buy"
        buttonBuy.innerText = "Buy"

        if (bookInTheArray.img) {
          const img = document.createElement("img")
          img.src = bookInTheArray.img
          img.className = "book-img object-fit-cover card-img-top"
          img.alt = bookInTheArray.title
          book.appendChild(img)
        }

        if (bookInTheArray.title) {
          const h5 = document.createElement("h5")
          h5.className = "book-title card-title my-0"
          h5.textContent = bookInTheArray.title
          bookInfo.appendChild(h5)
        }

        if (bookInTheArray.price) {
          const price = document.createElement("p")
          price.className = "book-price card-text my-0 align-self-start"
          price.textContent = bookInTheArray.price + "€"
          bookInfo.appendChild(price)
        }

        if (bookInTheArray.category) {
          const category = document.createElement("p")
          category.className = "book-category d-none"
          category.textContent = bookInTheArray.category
          bookInfo.appendChild(category)
        }

        if (bookInTheArray.asin) {
          const asin = document.createElement("p")
          asin.className = "book-asin d-none"
          asin.textContent = "asin: " + bookInTheArray.asin
          bookInfo.appendChild(asin)
        }

        bookshelfRow.appendChild(bookBox)
        bookBox.appendChild(book)
        book.appendChild(bookInfo)
        bookInfo.appendChild(cardButtons)
        cardButtons.appendChild(buttonHide)
        cardButtons.appendChild(buttonBuy)
      })

      const buttonBuy = document.querySelectorAll(".button-buy")
      buttonBuy.forEach(button => {
        button.addEventListener("click", function () {
          const bookBox = this.closest(".book-box")
          const bookData = {
            title: bookBox.querySelector(".book-title").textContent,
            price: parseFloat(bookBox.querySelector(".book-price").textContent),
          }
          addToCart(bookData)
        })
      })
    })
    .catch(error => console.error("Errore:", error))

  function hideCard() {
    const thisCard = this.closest(".book-box")
    thisCard.classList.add("d-none")
  }

  function addToCart(book) {
    cart.push(book)
    total += book.price
    updateCartTotal()
  }

  function updateCartTotal() {
    const cartTotalElement = document.getElementById("cart-total")
    cartTotalElement.textContent = total + "€"
  }
})
