# Внесение изменений

## Prerequisites

### Термины
Commit – git commit  
PR – [Pull Request](https://www.atlassian.com/ru/git/tutorials/making-a-pull-request)
Инстанс – [Instance](https://en.wikipedia.org/wiki/Instance_(computer_science))
### Модальные предикаты
Слова «MUST», «MUST NOT», «REQUIRED», «SHALL», «MAY» и «OPTIONAL» в данном документе должны интерпретироваться как в [RFC 2119](https://www.ietf.org/rfc/rfc2119.txt).


## Оформление изменений

### Commit and PR
Для описания комментариев к commit'ам и PR должно (MUST) использоваться [«Соглашение о коммитах»](https://www.conventionalcommits.org/ru/v1.0.0/),
проверка соответствия осуществляется линтером [commitlint](https://github.com/conventional-changelog/commitlint#readme).

## Оформление кода: стиль и соглашения
### JSDoc
Обязательно (RECOMMENDED) снабжать `JSDoc` публичные свойства и методы классов и объектов,
экспортируемые из модуля структуры,
свойства и методы секций дескриптора компонента Vue: `props, data, computed, methods`.

### TypeScript declaration files
Рекомендуется снабжать TypeScript-описаниями в формате `*.d.t`s публичные свойства и методы классов и объектов,
экспортируемые из модуля элементы,
свойства и методы инстанса компонента.


### Code style
Мы используем [Airbnb’s JavaScript Style Guide] и соответствующий ему набор правил линтера `eslint`
для управления стилем нашего кода.

В дополнение к стилям Airbnb, у нас есть ряд собственных правил code style и code conventions. 

[Airbnb’s JavaScript Style Guide]: https://github.com/leonidlebedev/javascript-airbnb

#### Название методов и свойств

* В компонентах `Vue`, а также вспомогательных модулях/классах, реализующих объединение (агрегацию/композицию)
  различных ответственностей и функциональностей (реализующих паттерны Фасада, например), названия методов и свойств рекомендуется начинать с префикса называющего
соответствующую ответственность/функциональность (несмотря на общепринятые правила называния методов и функций начинающихся с префикса глагола действия).

Пример
```
// Elem.vue – Компонент базового Виджета
// Функциональность хранилища глобального состояния – Store,
// начинается с соответствующего префикса 'store*'.

/**
 * Геттер получения глобального состояния из хранилища (в проекции на локальные названия переменных виджета).
 * @property {Record<string, any>} $storeState
 * @memberOf {Elem.vue}
 * @see Elem.vue
 */
/**
 * Метод обновления глобального состояния в хранилище.
 * @method $storeCommit
 * @param {Record<string, any>} state
 * @memberOf {Elem.vue}
 */
 
```

#### Enums и Namespaced Constants
- Объект должен быть (MUST) инициализирован с помощью `const`.
- Название объекта перечисления / неймспейса должно быть (MUST) в PascalCase.
- Название полей объекта перечисления / немспейса должны быть (MUST) в UPPER_SNAKE_CASE.
- Название объекта перечисления / неймспейса должно быть (MUST) в единственном числе.
- Поскольку в javascript нет встроенного типа `Enum` рекомендуется (SHOULD, RECOMMENDED) последним суффиксом добавлять слово Enum для явного отличия от названия классов. 
- Может (MAY) присутствовать суффикс категории (`Type`, `Name`, `Mode`) при необходимости.
- Объект должен быть заморожен с помощью `Object.freeze()`.

Пример
```
const TaskStatus = Object.freeze({
  STAND_BY: 'standBy',
  PENDING: 'pending',
  PROCESSING: 'processing',
  CANCELED: 'canceled',
  COMPLETED: 'completed',
  FAILED: 'failed'
});
```

#### Module exports
- Модули должны (MUST) использовать именованные экспорты. 
- Модули могут (MAY) использовать дефолтный экспорт повторяющий один из именованных экспортов или включающий его члена в неймспейс.

```
const someConst = ...;

export { someConst };
export default {
  someConst
};
```

```
class SomeClass {};

export { SomeClass };
export default SomeClass;
```

# @goodt/common
## API Services
### Методы
#### Названия публичных методов
Должно начинаться с одного из четырёх возможных префиксов
  - `get*` – чтение, получение данных
  - `create*` – создание нового ресурса
  - `update*` – обновление существующего ресурса
  - `delete*` – удаление существующего ресурса

Если метод осуществляет идентификацию ресурса по какому-то одному параметру – `id`,
то название должно постфиксироваться `*byParam`

Например, `getEmplyeeById`, `getEmplyeesByTeamId`

#### Сигнатуры входных параметров
**`get*`-методы**:
```js
/**
 * @param {number|string} paramValue – идентификатор ресурса
 * @param {Record<string, any>} extraServiceQuery – дополнительная служенбная информация для запроса
 *
 * @return {ItemDto|null}
 */
geItemById(itemId, extraServiceQuery);
```

```js

/**
 * @param {number|string} paramValue – идентификатор ресурса
 * @param {Record<string, any>} extraServiceQuery – дополнительная служенбная информация для запроса
 * @return {ItemDto[]|null}
 */
geItemsByTeamId(itemId, extraServiceQuery);
```

```js
/**
 * @param {number|string} paramValue – идентификатор ресурса
 * @param {Record<string, any>} extraServiceQuery – дополнительная служенбная информация для запроса
 * @return {ItemDto[]|null}
 */
geItems({ teamId: 10 }, { limit: 10, offset: 20, order: 1 });
```

**`create*`-методы**:
```js
/**
 * @param {number|string} itemDto – dto ресурса
 * @param {Record<string, any>} extraServiceQuery – дополнительная служенбная информация для запроса
 * @return {ItemDto|null}
 */
createItem(itemDto, extraServiceQuery);
```

**`update*`-методы**:
```js
/**
 * @param {number|string} itemId – идентификатор ресурса
 * @param {number|string} itemDto – dto ресурса
 * @param {Record<string, any>} extraServiceQuery – дополнительная служенбная информация для запроса
 * @return {ItemDto|null}
 */
updateItemById(itemId, itemDto, extraServiceQuery);
```

**`update*`-методы**:
```js
/**
 * @param {number|string} itemId – идентификатор ресурса
 * @param {number|string} itemDto – dto ресурса
 * @param {Record<string, any>} extraServiceQuery – дополнительная служенбная информация для запроса
 * @return {boolean}
 */
deleteItemById(itemId);
```
