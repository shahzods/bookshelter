"use strict";
//Logout
const token = window.localStorage.getItem("token");

if (!token) {
  window.location.replace("index.html");
}

logoutBtn.addEventListener("click", () => {
  window.localStorage.removeItem("token");

  window.location.replace("index.html");
});

//Home
const elBookList = document.querySelector(".book__list");
const elBookmarkList = document.querySelector(".bookmark__list");
const elInput = document.querySelector(".header__input");
const elShowing = document.querySelector(".showing");
const elResult = document.querySelector(".result");
const elNewBook = document.querySelector("hero__btn");
let fetchArr = [];
let bokmarkArr = [];
let search;
const getBooks = async function (search) {
  const request = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${search}`
  );

  const data = await request.json();
  elResult.textContent = data.totalItems;
  fetchArr = data.items;
  renderBook(data, elBookList);
};
getBooks();

elInput.addEventListener("input", function (evt) {
  evt.preventDefault();
  const inputValue = elInput.value;
  console.log(inputValue);
  search = inputValue;

  getBooks(search);
});

//Page
let renderBook = function (item, place) {
  elBookList.innerHTML = null;
  fetchArr = (book) => item.items;
  elShowing.textContent = item.items.lenght;
  item.items.forEach((book) => {
    let card = `
<div class="book">
  <img
    class="book__img"
    src="${book.volumeInfo.imageLinks.smallThumbnail}"
    width="200"
    height="200"
    alt=""
  />

  <h3 class="book__title">${book.volumeInfo?.title}</h2>
  <p class="book__writer">${book.volumeInfo?.authors?.join(",")}</p>
  <p class="book__date">${book.volumeInfo.publishedDate}</p>

  <div class="buttons">
    <button class="bookmark" data-bookmark-Id=${book?.id}>Bookmark</button>
    <button class="more-info" data-show=${book?.id}>More Info</button>
  </div>
  <a href="${book.volumeInfo?.previewLink}" class="read">Read</a>
</div> <!-- book -->`;
    place.insertAdjacentHTML("Beforeend", card);
  });
};

//Bookmark
let renderBookmark = function (mark, place) {
  elBookmarkList.innerHTML = null;
  mark.forEach((books) => {
    let bookm = `
            <div class="bookmarks">
              <div>
                <h3 class="bookmark__title">${books.volumeInfo?.title}</h3>
                <p class="book__writer">${books.volumeInfo?.authors?.join(
                  ","
                )}</p>
              </div>
              <div>
                <a href="${
                  books.volumeInfo?.previewLink
                }" class="bookmark__read">
                  <img src="./img/book-open.svg" alt="">
                </a>
                <button class="bookmark__delete" data-delete-btn=${books.id}>
                  <img data-delete-btn=${
                    books.id
                  } src="./img/delete.svg" alt="">
                </button>
              </div>
            </div>`;
    place.insertAdjacentHTML("Beforeend", bookm);
  });
};

//Read
elBookList.addEventListener("click", function (evt) {
  if (evt.target.matches(".bookmark")) {
    fetchArr().forEach((mark) => {
      if (
        evt.target.dataset.bookmarkId == mark.id &&
        !bokmarkArr.includes(mark)
      ) {
        bokmarkArr.push(mark);
        console.log(bokmarkArr);
      }
      bokmarkArr.innerHTML = null;
      renderBookmark(bokmarkArr, elBookmarkList);
    });
  }
});

//Delete
elBookmarkList.addEventListener("click", function (evt) {
  if (evt.target.matches("img")) {
    const findIndexDelete = bokmarkArr.findIndex(
      (mark) => evt.target.dataset.deletebtn === mark.id
    );
    console.log(evt.target.dataset.deletebtn);
    bokmarkArr.splice(findIndexDelete, 1);
    elBookmarkList.innerHTML = null;
    renderBookmark(bokmarkArr, elBookmarkList);
  }
});

//Modal
let renderModals = function (modal, place) {
  modal.forEach((bookm) => {
    let bookr = `
      <div class="modals hidden">
        <div class="modal__top">
          <h3 class="modal__title">${bookm.volumeInfo?.title}</h3>
          <button class="close-modal">
            <img src="./img/x.svg" alt="">
          </button>
        </div>
        
        <div class="modal__main">
          <img class="modal__img" src="${
            bookm.volumeInfo.imageLinks.smallThumbnail
          }" alt="">

        <p class="modal__text">${bookm.volumeInfo?.description}</p>

        <div class="modal__d">Author: <span class="modal__a">${bookm.volumeInfo?.authors?.join(
          ","
        )}</span></div>
        <div class="modal__d">Published: <span class="modal__a">${
          bookm.volumeInfo?.publishedDate
        }</span></div>
        <div class="modal__d">Publishes: <span class="modal__a">${
          bookm.volumeInfo?.publisher
        }</span></div>
        <div class="modal__d">Catigories <span class="modal__a">${
          bookm.volumeInfo?.cstigories
        }</span></div>
        <div class="modal__d">Pages Count: <span class="modal__a">${
          bookm.volumeInfo?.pageCount
        }</span></div>
        </div>

        <div class="modal__footer">
          <a href="${bookm.volumeInfo.previewLink}" class="modal__read">Read</a>
        </div>
      </div>`;
    place.insertAdjacentHTML("Beforeend", bookr);
  });
};

elBookList.addEventListener("click", function (evt) {
  if (evt.target.matches(".more-info")) {
    let showId = evt.target.dataset.show;
    // let findElement = fetchArr.find((item) => item.id === showId);
    // console.log(findElement);
    console.log(fetchArr);
  }
});
