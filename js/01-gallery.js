import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

//Завдання 1 - галерея зображень
//Створи галерею з можливістю кліку по її елементах і перегляду повнорозмірного зображення
//у модальному вікні. Подивися демо відео роботи галереї.

//Шаблон елемента галереї:
{
  /* <div class="gallery__item">
  <a class="gallery__link" href="large-image.jpg">
    <img
      class="gallery__image"
      src="small-image.jpg"
      data-source="large-image.jpg"
      alt="Image description"
    />
  </a>
</div> */
}
//Пошук елементу контейнеру галереї
const galleryContainer = document.querySelector(".gallery");

//Створення розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї.
const imgElements = galleryItems.reduce((acum, item) => {
  return (acum += `
    <div class="gallery__item">
      <a class="gallery__link" href="${item.original}">
        <img
          class="gallery__image"
          src="${item.preview}"
          data-source="${item.original}"
          alt="${item.description}"
        />
      </a>
    </div>
    `);
}, "");

//Рендер розмітки (додавання в DOM)
galleryContainer.insertAdjacentHTML("beforeend", imgElements);

//додавання слухача на подію клік
galleryContainer.addEventListener("click", (e) => {
  //Заборона перенаправлення по кліку на іншу сторінку за замовчуванням (зображення обгорнуте посиланням!!!)
  e.preventDefault();
  // This is where delegation «magic» happens: Реалізація делегування на div.gallery
  if (e.target.nodeName !== "IMG") return;
  //отримання url великого зображення
  const selectedImg = e.target.dataset.source;

  //Створює новий екземпляр basicLightbox - модальне вікно випадаючого зображення
  //по готовій розмітці модального вікна із зображенням з прикладів бібліотеки basicLightbox.
  const modalImgWindow = basicLightbox.create(
    `
  <img src="${selectedImg}" width="800" height="600">
  `,

    // обʼєкт параметра з властивостями бібліотеки
    {
      // Функція, яка додає слухача при натисканні клавіши ESC (модальне вікно відкрите)
      onShow: () => {
        document.addEventListener("keydown", closeModal);
      },
      // Функція, яка знімає слухача при натисканні клавіши ESC (модальне вікно закрите)
      onClose: () => {
        document.removeEventListener("keydown", closeModal);
      },
    }
  ); // прослуховування клавіатури відбувається тільки тоді, коли відкрите модальне вікно

  // Функція lightbox, що виконує показ модалки із зображенням
  modalImgWindow.show();

  // Функція lightbox, що закиває модалку із зображенням
  function closeModal(e) {
    // перевірка натиску клавіші Escape
    if (e.key === "Escape") {
      modalImgWindow.close();
    }
  }
});
