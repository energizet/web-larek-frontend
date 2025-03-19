# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

Компоненты:
- src/components/galleryView.ts - отображение карточек на главном экране
- src/components/cardCatalogView.ts - карточка товара на главном экране
- src/components/modalView.ts - модальное окно
- src/components/cardModalView.ts - карточка товара в модальном окне
- src/components/cartModalView.ts - корзина
- src/components/cardCartView.ts - элемент корзины с товаром
- src/components/orderModalView.ts - выбор оплаты и адреса
- src/components/contactsModalView.ts - ввод email и телефона
- src/components/successModalView.ts - окно подтверждения оплаты

Типы:
- src/types/cartModel.ts - модель корзины
- src/types/orderModel.ts - модель заказа
- src/types/models.ts - модели продуктов и запросов

События логические:
- addProduct - добавление товара в корзину
- deleteProduct - удаление товара из корзины
- order - выполнение заказа

События визуальные:
- onLoadedProducts - отображение загруженных товаров
- openCard - открытие карточки товара
- openCart - открытие корзины
- openOrder - открытие заказа
- openContacts - открытие контактов
- onOrdered - открытие подтверждения оплаты

## Описание
В `cartModel` и `orderModel` хранится состояние заказа

Каждый компонент в конструкторе создает элементы с которыми будет работать и метод render для заполнения элементов, **!но не за отображения на экране!**

Работа с модальным окном происходит в modalView

Компоненты могут заполнять состояние и вызывать события

Все события описаны в `index.ts` и там же происходит связывание отдельных частей приложения

## Установка и сборка

Для запуска проекта вам понадобится создать в корне файл с именем `.env` и разместить в нем следующее содержимое:
```
API_ORIGIN=https://larek-api.nomoreparties.co
```

```
npm install
npm run build:dev
```
