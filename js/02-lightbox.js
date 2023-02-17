import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

//Завдання 2 - бібліотека SimpleLightbox
//Зробити таку саму галерею як в першому завданні, але використовуючи бібліотеку SimpleLightbox,
// яка візьме на себе обробку кліків по зображеннях, відкриття і закриття модального вікна,
// а також гортання зображень за допомогою клавіатури.

//Шаблон елемента галереї:
{
  /* <a class="gallery__item" href="large-image.jpg">
  <img class="gallery__image" src="small-image.jpg" alt="Image description" />
</a>; */
}

//Пошук елементу контейнеру галереї
const galleryContainer = document.querySelector(".gallery");

//Створення розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї.
const imgElements = galleryItems.reduce((acum, item) => {
  return (acum += `
    <a class="gallery__item" href="${item.original}">
        <img class="gallery__image" src="${item.preview}" title="${item.description}" alt="${item.description}" />
    </a>
  `);
}, "");

//Рендер розмітки (додавання в DOM)
galleryContainer.insertAdjacentHTML("beforeend", imgElements);

//Ініціалізація бібліотеки та додавання відображення підписів до зображень
new SimpleLightbox(".gallery a", {
  captionDelay: 250, //підпис розміщується знизу та з'являється через 250 мілісекунд після відкриття зображення
});
