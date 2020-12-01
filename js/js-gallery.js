import galleryArray from "../gallery-items.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  lightbox: document.querySelector(".js-lightbox"),
  btnCloseModal: document.querySelector('button[data-action="close-lightbox"]'),
  modal: document.querySelector(".lightbox__overlay"),
  lightboxContent: document.querySelector(".lightbox__content"),
  lightboxImage: document.querySelector(".lightbox__image"),
  arrowLeft: document.querySelector(".slider-arrow-left"),
  arrowRight: document.querySelector(".slider-arrow-right"),
};

galleryArray.map((item, i) => {
  let img = document.createElement("img");
  img.classList.add("gallery__image");
  img.setAttribute("src", item.preview);
  img.setAttribute("data-source", item.original);
  img.setAttribute("alt", item.description);
  img.setAttribute("data-index", i);
  let a = document.createElement("a");
  a.classList.add("gallery__link");
  a.setAttribute("href", item.original);
  a.append(img);
  let li = document.createElement("li");
  li.classList.add("gallery__item");
  li.append(a);
  refs.gallery.append(li);
});

refs.gallery.addEventListener("click", onGalleryClick);
refs.btnCloseModal.addEventListener("click", closeModal);
refs.modal.addEventListener("click", onModalClickClose);
refs.lightboxImage.addEventListener("click", onMouseClickRotate);
refs.arrowLeft.addEventListener("click", onPressArrowLeft);
refs.arrowRight.addEventListener("click", onPressArrowRight);

function onGalleryClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  window.addEventListener("keydown", onPressEsc);
  window.addEventListener("keydown", onPressLeft);
  window.addEventListener("keydown", onPressRight);
  const imgRef = event.target;
  const largeImageURL = imgRef.dataset.source;
  const imgAlt = imgRef.alt;
  const imgInd = imgRef.dataset.index;
  refs.lightbox.classList.add("is-open");
  refs.lightboxImage.setAttribute("src", largeImageURL);
  refs.lightboxImage.setAttribute("alt", imgAlt);
  refs.lightboxImage.setAttribute("data-index", imgInd);
}

function closeModal() {
  window.removeEventListener("keydown", onPressEsc);
  window.removeEventListener("keydown", onPressLeft);
  window.removeEventListener("keydown", onPressRight);
  refs.lightbox.classList.remove("is-open");
  refs.lightboxImage.src = "";
  refs.lightboxImage.alt = "";
}

function onModalClickClose(event) {
  if (event.target === event.currentTarget) {
    closeModal();
  }
}

function onPressEsc(event) {
  if (event.code === "Escape") {
    closeModal();
  }
}

function setImgModAttr(step, index) {
  refs.lightboxImage.src = galleryArray[index + step].original;
  refs.lightboxImage.alt = galleryArray[index + step].description;
  refs.lightboxImage.dataset.index = `${index + step}`;
}

function onPressLeft(event) {
  if (event.code === "ArrowLeft") {
    const index = Number(refs.lightboxImage.dataset.index);
    if (index === 0) return;
    setImgModAttr(-1, index);
  }
}

function onPressRight(event) {
  if (event.code === "ArrowRight") {
    const index = Number(refs.lightboxImage.dataset.index);
    if (index === galleryArray.length - 1) return;
    setImgModAttr(1, index);
  }
}

function onMouseClickRotate(event) {
  if (event.target === event.currentTarget) {
    const index = Number(refs.lightboxImage.dataset.index);
    if (index === galleryArray.length - 1) {
      setImgModAttr(0, 0);
      return;
    }
    setImgModAttr(1, index);
  }
}

function onPressArrowLeft(event) {
  if (event.target === event.currentTarget) {
    const index = Number(refs.lightboxImage.dataset.index);
    if (index === 0) return;
    setImgModAttr(-1, index);
  }
}

function onPressArrowRight(event) {
  if (event.target === event.currentTarget) {
    const index = Number(refs.lightboxImage.dataset.index);
    if (index === galleryArray.length - 1) return;
    setImgModAttr(1, index);
  }
}
