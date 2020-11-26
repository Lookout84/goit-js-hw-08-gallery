import array from "../gallery-items.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
};
const getImgRef = array.map((item, i) => {
  let img = document.createElement("img");
  img.classList.add("gallery__image");
  img.setAttribute("src", item.preview);
  img.setAttribute("data-source", item.original);
  img.setAttribute("data-intex", i);
  let a = document.createElement("a");
  a.classList.add("gallery__link");
  a.setAttribute("href", item.original);
  a.append(img);
  let li = document.createElement("li");
  li.classList.add("gallery__item");
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
