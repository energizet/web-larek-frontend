# Проектная работа "Веб-ларек"

https://energizet.github.io/web-larek-frontend/

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

- src/components/apiUtil.ts - базовый класс для работы с запросами
    - Свойства
        - baseUrl: string - базовый url
        - options: RequestInit - базовые заголовки
    - constructor(baseUrl: string, options: RequestInit = {})
        - принимает базовый url и параметры запросов
    - Методы
        - handleResponse(response: Response): Promise<object> - принимает ответ от апи и парсит его
        - get(uri: string) - делает get запрос на url
        - post(uri: string, data: object, method: ApiPostMethods = 'POST') - делает запрос на url с данными и методом
- src/components/api.ts - запросы к апи
    - Свойства
        - api: ApiUtil - хранит базовый класс ApiUtil для работы с запросами
    - constructor(
      private readonly api: ApiUtil
      )
        - принимает api: ApiUtil и заполняет api
    - Методы
        - loadProducts() - делает запрос на /products и возвращает промис
        - order(order: Order) - принимает заказ, зелает запрос на /order, возвращает промис
- src/components/galleryView.ts - отображение карточек на главном экране
    - Свойства
        - gallery: Element - элемент галереи
        - emitter: EventEmitter - брокер событий
    - constructor(private readonly emitter: EventEmitter)
        - принимает брокер, находит элементы и заполняет поля
    - Методы
        - render(products: Product[]) - принимает список продуктов и заполняет gallery элементами CardCatalogView
- src/components/cardCatalogView.ts - карточка товара на главном экране, шаблон #card-catalog
    - Свойства
    - card: Element - корневой элемент шаблона
    - category: Element - элемент котегории товара
    - title: Element - название товара
    - image: HTMLImageElement - картинка товара
    - price: Element - цена товара
    - emitter: EventEmitter - брокер событий
        - constructor(private readonly emitter: EventEmitter)
            - принимает брокер, клонирует шаблон и заполняет поля
        - Методы
            - render(product: Product) - принимает товар, заполняет шаблон, вешает собитие открытия товара
            - onOpenCard(product: Product) - вызывает событие openCard
- src/components/modalView.ts - модальное окно
    - Свойства
        - modal: Element - корневой элемент модального окна
        - container: Element - отображаемая часть модалки
        - close: Element - кнопка закрытия
        - content: Element - поле с контентом модалки
    - constructor()
        - заполняет поля и вешает события управления модалкой
    - Методы
        - render(modal: Element) - принимает элемент для отображения в content
        - show() - открытие модалки
        - hide() - закрытие модалки
- src/components/cardModalView.ts - карточка товара в модальном окне, шаблон #card-preview
    - Свойства
        - card: Element - корневой элемент шаблона
        - image: HTMLImageElement - картинка товара
        - category: Element - элемент категории товара
        - title: Element - название товара
        - description: Element - описание товара
        - price: Element - цена товара
        - button: Element - кнопка добавления и открытия корзины
        - buttonStatus: ButtonStatus - состояние кнопки, либо добавить, либо открыть корзину
        - emitter: EventEmitter - брокер событий
        - modal: ModalView - компонент модального окна
        - cart: CartModel - модель корзины
    - constructor(
      private readonly emitter: EventEmitter,
      private readonly modal: ModalView,
      private readonly cart: CartModel
      )
        - принимает брокер сообщений, модальное окно и модель корзины, клонирует шаблон и заполняет поля
    - Методы
        - render(product: Product) - принимает товар, заполняет шаблон, вешает обработчик кнопки, отправляет на отображение в модальном
          окне
        - onClick(product: Product) - проверяет статус кнопки, либо отправить событие addProduct и поменять статус, либо
          отправить openCart
- src/components/cartModalView.ts - корзина
    - Свойства
        - element: Element - корневой элемент шаблона
        - list: Element - элемент с товарами
        - button: Element - кнопка подтверждения корзины
        - price: Element - сумма в корзине
        - emitter: EventEmitter - брокер событий
        - modal: ModalView - компонент модального окна
        - cart: CartModel - модель корзины
    - constructor(
      private readonly emitter: EventEmitter,
      private readonly modal: ModalView,
      private readonly cart: CartModel
      )
          - принимает брокер сообщений, модальное окно и модель корзины, клонирует шаблон и заполняет поля
    - Методы
        - render() - заполняет шаблон, вешает обработчик кнопки, отправляет на отображение в модальном
          окне
        - onOpenOrder() - отправляет событие openOrder
- src/components/cardCartView.ts - элемент корзины с товаром, шаблон #card-basket
    - Свойства
        - card: Element - корневой элемент шаблона
        - index: Element - элемент отображаюший индекс в корзине
        - title: Element - описание товара
        - price: Element - цена товара
        - button: Element - кнопка удаления из корзины
        - emitter: EventEmitter - брокер событий
    - constructor(private readonly emitter: EventEmitter)
        - принимает брокер сообщений, клонирует шаблон и заполняет поля
    - Методы
        - render(product: Product, index: number) - принимает товар и индекс для отображения, заполняет шаблон, вешает событие на кнопку удаления товара
          из корзины
        - onDelete(product: Product) - обработчик кнопки удаления из корзины, принимает продукт который нужно удалить, вызывает событие
          deleteProduct и запускает render корзины
- src/components/orderModalView.ts - выбор оплаты и адреса, шаблон #order
    - Свойства
        - form: HTMLFormElement - корневой элемент шаблона
        - buttonCard: HTMLButtonElement - кнопка оплаты онлайн
        - buttonCash: HTMLButtonElement - кнопка оплаты при получении
        - address: HTMLInputElement - поле ввода адреса
        - button: HTMLButtonElement - кнопка продолжения
        - emitter: EventEmitter - брокер событий
        - modal: ModalView - компонент модального окна
        - order: OrderModel - модель заказа
    - constructor(
      private readonly emitter: EventEmitter,
      private readonly modal: ModalView,
      private readonly order: OrderModel
      )
        - принимает брокер сообщений, модальное окно и модель заказа, клонирует шаблон и заполняет поля
    - Методы
        - render() - заполняет шаблон, вешает обработчики полей и кнопки, отправляет на отображение в модальном
          окне
        - updateButtonStatus() - включает и выключает кнопку при заполнении поля
        - onInputAddress() - сохраняет адрес в модель заказа
        - onClickCard() - заполняет тип оплаты в заказе на онлайн
        - onClickCash() - заполняет тип оплаты в заказе на при получении
        - onSubmit(e: SubmitEvent) - обрабатывает отправку и вызывает событие openContacts
- src/components/contactsModalView.ts - ввод email и телефона, шаблон #contacts
    - Свойства
        - form: HTMLFormElement - корневой элемент шаблона
        - email: HTMLInputElement - элемент ввода почты
        - phone: HTMLInputElement - ввода телефона
        - button: HTMLButtonElement - кнопка продолжения
        - emitter: EventEmitter - брокер событий
        - modal: ModalView - компонент модального окна
        - order: OrderModel - модель заказа
    - constructor(
      private readonly emitter: EventEmitter,
      private readonly modal: ModalView,
      private readonly order: OrderModel
      )
        - принимает брокер сообщений, модальное окно и модель заказа, клонирует шаблон и заполняет поля
    - Методы
        - render() - заполняет шаблон, вешает обработчики полей и кнопки, отправляет на отображение в модальном
          окне
        - updateButtonStatus() - включает и выключает кнопку при заполнении поля
        - onInputEmail() - сохраняет почту в модель заказа
        - onInputPhone() - сохраняет телефон в модель заказа
        - onSubmit(e: SubmitEvent) - обрабатывает отправку и вызывает событие order
- src/components/successModalView.ts - окно подтверждения оплаты
    - Свойства
        - element: Element - корневой элемент шаблона
        - description: Element - описание сколько сумма заказа
        - button: HTMLButtonElement - кнопка закрытия модалки
        - modal: ModalView - компонент модального окна
    - constructor(private readonly modal: ModalView)
        - принимает модальное окно, клонирует шаблон и заполняет поля
    - Методы
        - render(response: OrderResponse) - принимает результат заказа, заполняет шаблон, вешает обработчики полей и кнопки, отправляет на
          отображение в модальном окне
        - onClick() - скрывает окно

Типы:

- src/types/cartModel.ts - модель корзины
    - Свойства
        - products: Map<string, Product> - хранилище продуктов в корзине
    - Методы
        - add(product: Product) - добавление в корзину
        - delete(product: Product) - удаление из корзины
        - contains(product: Product) - проверка содержания в корзине
        - getProducts() - получение товаров
        - getPrice() - получение суммы корзины
        - clear() - очищение корзины
- src/types/orderModel.ts - модель заказа
    - Свойства
        - payType: PayType - тип оплаты
        - address: string - адрес заказа
        - email: string - почта
        - phone: string - телефон
- src/types/models.ts - модели продуктов и запросов
    - ProductResponse - тип ответа на запрос товаров
        - Свойства
            - total: number - количество товаров
            - items: Product[] - товары
    - Product - товар
        - Свойства
            - id: string - id товара
            - description: string - описание
            - image: string - картинка
            - title: string - название
            - category: string - категория
            - price: number - цена
    - Order - модель отправки заказа
        - Свойства
            - payment: string - тип оплаты
            - email: string - почта
            - phone: string - телефон
            - address: string - адрес
            - total: number - сумма оплаты
            - items: string[] - список товаров
    - OrderResponse - ответ оформления заказа
        - Свойства
            - id: string - заказа
            - total: number - сумма оплаты

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

Каждый компонент в конструкторе создает элементы с которыми будет работать и метод render для заполнения элементов

Работа с модальным окном происходит в modalView

Компоненты могут заполнять состояние и вызывать события

Все события описаны в `index.ts` и там же происходит связывание отдельных частей приложения

1. Из каких основных частей состоит архитектура проекта?
    - брокер событий, класс Api, компоненты отображения
2. Зачем нужны эти части, какие функции они выполняют?
    - через брокер отправляются события, апи делает запросы на бек, компоненты выводят данные на экран
3. Как части взаимодействуют?
    - через события в брокере
4. Какие данные используются в приложении?
    - описал ранее
5. Из каких компонентов состоит приложение?
    - главный экран, товар на главном экране, модальное окно и компоненты которые отображаются в модальном окне, описано
      выше
6. Как реализованы процессы в приложении?
    - через события

## Установка и сборка

Для запуска проекта вам понадобится создать в корне файл с именем `.env` и разместить в нем следующее содержимое:

```
API_ORIGIN=https://larek-api.nomoreparties.co
```

```
npm install
npm run build
npm run start
```
