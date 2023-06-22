const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 16;
let orientation = "landscape";
let query = "summer";
const apiKey = "HvPmGKCSOTvPuhN6Zn2mZ3_8Xa9TSfUTxPk_C8MhyLw";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&orientation=${orientation}&count=${count}&query=${query}`;

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 30;
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
  }
}

// Helper function
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}
// Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;

  // run function for each object in photosArray
  photosArray.forEach((photo) => {
    // create link
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank"
    });

    // create title
    const title = document.createElement("p");
    title.innerHTML = `${photo.alt_description} <b>by ${photo.user.name}</b>`;

    // create image
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.user.instagram_username,
      title: photo.user.instagram_username
    });

    // event listener, check when each is finished loading
    img.addEventListener("load", imageLoaded);

    // put img inside <a></a>, then put both inside imageContainer
    item.appendChild(img);
    item.appendChild(title);
    imageContainer.appendChild(item);
  });
}

// get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    console.log(photosArray);
    displayPhotos();
  } catch (error) {
    // catch error here
  }
}

// check scrolling

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// on load
getPhotos();