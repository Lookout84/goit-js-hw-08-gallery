import array from "../gallery-items.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
};
const getImgRef = array.map(({ preview, original, description }) => {
  let li = document.createElement("li");
  li.classList.add("gallery__item");
  let a = document.createElement("a");
  a.classList.add("gallery__link");
  a.href = `${original} `;
  a.insertAdjacentHTML(
    "afterbegin",
    `<img class = 'gallery__image' src = '${preview}'
        data-source = '${original}' alt = '${description}'></img>`
  );
  li.append(a);
  return li;
});

refs.gallery.append(...getImgRef);

//console.log(getImgRef);

refs.gallery.addEventListener("click", onGalleryClick);

function onGalleryClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }

  const imgRef = event.target;
  const largeImageURL = imgRef.dataset.source;
  console.log(largeImageURL);
}
