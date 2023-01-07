import { API_KEY } from "./config.js";

const HOST = "https://api.thecatapi.com";
const ENDPOINT_RANDOM_CATS = "/v1/images/search?limit=10";
const ENDPOINT_UPLOADED_CATS = "/v1/images";
const ENDPOINT_UPLOAD_CATS = "/v1/images/upload";
const ENDPOINT_FAVORITE_CATS = "/v1/favourites";
const URL_RANDOM_CATS = HOST + ENDPOINT_RANDOM_CATS;
const URL_UPLOADED_CATS = HOST + ENDPOINT_UPLOADED_CATS;
const URL_UPLOAD_CATS = HOST + ENDPOINT_UPLOAD_CATS;
const URL_FAVORITE_CATS = HOST + ENDPOINT_FAVORITE_CATS;

const CONTAINER_RANDOM_CATS = document.querySelector(".container__random-cats-list");
const CONTAINER_FAVORITE_CATS = document.querySelector(".container__favorite-cats-list");
const CONTAINER_UPLOADED_CATS = document.querySelector(".container__uploaded-cats-list");
const BUTTON_NEW_CATS = document.querySelector(".btn-new-cats");
const SPAN_ERROR = document.querySelector(".error");
const UPLOAD_IMAGE_FORM = document.querySelector(".upload-image-form");

//Getters
async function getRandomCats() {
    const response = await fetch(URL_RANDOM_CATS);
    return response.json();
}

async function getUploadedCats() {
    const response = await fetch(URL_UPLOADED_CATS + "?limit=10", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY
        }
    });
    return response.json();
}

async function gtFavoriteCats() {
    const response = await fetch(URL_FAVORITE_CATS + "?limit=10", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY
        }
    });
    return response.json();
}

//Actions
async function addFavoriteCat(catImageId) {
    const response = await fetch(URL_FAVORITE_CATS, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY
        },
        body: JSON.stringify({
            image_id: catImageId
        })
    });
    return response.json();
}

async function removeFavoriteCat(catFavoriteId) {
    const response = await fetch(URL_FAVORITE_CATS + `/${catFavoriteId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY
        }
    });
    return response.json();
}

async function uploadCat(uploadForm) {
    const formData = new FormData(uploadForm);
    const response = await fetch(URL_UPLOAD_CATS, {
        method: "POST",
        headers: {
            "x-api-key": API_KEY
        },
        body: formData
    });
    await response.json();
}

async function deleteUploadedCat(catImageId) {
    const response = await fetch(URL_UPLOADED_CATS + `/${catImageId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY
        }
    });
    return response.text();
}

//Generators UI components
function generateUIRandomCat(cat) {
    return `<article class="random-cats-item" data-id="${cat.id}">
        <img width="200" height="200" src="${cat.url}" />
        <button title="Add to favorites" class="btn-action">
            <span class="fi fi-sr-heart"></span>
        </button>
    </article>`;
}

function generateUIUploadedCat(uploadedCat) {
    return `<article class="uploaded-cats-item" data-id="${uploadedCat.id}">
        <img src="${uploadedCat.url}" width="200" height="200" />
        <button title="Delete image" class="btn-action">
            <span class="fi fi-sr-trash"></span>
        </button>
    </article>`;
}

function generateUIFavoriteCat(favoriteCat) {
    return `<article class="favorite-cats-item" data-id="${favoriteCat.id}">
        <img src="${favoriteCat.image.url}" width="200" height="200" />
        <button title="Remove from favorites" class="btn-action">
            <span class="fi fi-sr-apps-delete"></span>
        </button>
    </article>`;
}

//Renders
async function renderRandomCats() {
    try {
        const listCats = await getRandomCats();
        const uiListCats = listCats.map(generateUIRandomCat).join("");
        CONTAINER_RANDOM_CATS.innerHTML = uiListCats;
    } catch (error) {
        //TODO: Show the container error
        SPAN_ERROR.innerHTML += `An error occurred when obtaining the random cats: ${error.message}.</br>`;
    }
}

async function renderUploadedCats() {
    try {
        const listCats = await getUploadedCats();
        const uiListCats = listCats.map(generateUIUploadedCat).join("");
        CONTAINER_UPLOADED_CATS.innerHTML = uiListCats;
    } catch (error) {
        //TODO: Show the container error
        SPAN_ERROR.innerHTML += `An error occurred when obtaining the uploaded cats: ${error.message}.</br>`;
    }
}

async function renderFavoriteCats() {
    try {
        const listFavoriteCats = await gtFavoriteCats();
        const uiListFavoriteCats = listFavoriteCats.map(generateUIFavoriteCat).join("");
        CONTAINER_FAVORITE_CATS.innerHTML = uiListFavoriteCats;
    } catch (error) {
        //TODO: Show the container error
        SPAN_ERROR.innerHTML += `An error occurred when obtaining the favorite cats: ${error.message}.</br>`;
    }
}

//Initializers
function initEvents() {
    BUTTON_NEW_CATS.addEventListener("click", function (e) {
        renderRandomCats().then(() => { });
    });
    CONTAINER_RANDOM_CATS.addEventListener("click", function (e) {
        const element = e.target;
        if (element.tagName !== "BUTTON") return;

        const article = element.closest("article");
        const catId = article.dataset.id;
        addFavoriteCat(catId)
            .then(json => renderFavoriteCats())
            .then(() => { });
    });
    CONTAINER_FAVORITE_CATS.addEventListener("click", function (e) {
        const element = e.target;
        if (element.tagName !== "BUTTON") return;

        const article = element.closest("article");
        const favoriteId = article.dataset.id;
        removeFavoriteCat(favoriteId)
            .then(json => renderFavoriteCats())
            .then(() => { });
    });
    CONTAINER_UPLOADED_CATS.addEventListener("click", function (e) {
        const element = e.target;
        if (element.tagName !== "BUTTON") return;

        const article = element.closest("article");
        const catId = article.dataset.id;
        deleteUploadedCat(catId)
            .then(json => renderUploadedCats())
            .then(() => { });
    });
    UPLOAD_IMAGE_FORM.addEventListener("submit", function (e) {
        uploadCat(this)
            .then(json => renderUploadedCats())
            .then(() => {
                this.reset();
            });
        e.preventDefault();
    });
}

function init() {
    initEvents();
    renderRandomCats().then(() => { });
    renderFavoriteCats().then(() => { });
    renderUploadedCats().then(() => { });
}

init();