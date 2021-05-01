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
Для описания комментариев к commit'ам и PR используется [«Соглашение о коммитах»](https://www.conventionalcommits.org/ru/v1.0.0/),
проверка соответствия осуществляется линтером [commitlint](https://github.com/conventional-changelog/commitlint#readme).

## Оформление кода: стиль и соглашения
### JSDoc
Обязательно снабжать JSDoc публичные свойства и методы классов и объектов,
экспортируемые из модуля структуры,
свойства и методы секций дескриптора компонента Vue: props, data, computed, methods.

### TypeScript declaration files
Рекомендуется снабжать TypeScript в формате d.ts публичные свойства и методы классов и объектов,
экспортируемые из модуля элементы,
свойства и методы инстанса компонента.


### JavaScript Style Guide
Мы используем [Airbnb’s JavaScript Style Guide] и соответствующий ему набор правил линтера eslint
для управления стилем нашего кода JavaScript.

В дополнение к стилям Airbnb, у нас есть ряд собственных правил code style и code conventions. 

[Airbnb’s JavaScript Style Guide]: https://github.com/leonidlebedev/javascript-airbnb

#### Название методов и свойств

* В компонентах Vue, а также вспомогательных модулях/классах, реализующих объединение (агрегацию/композицию)
  различных ответственностей и функциональностей (реализующих паттерны Фасада, например), названия методов и свойств рекомендуется с префикса называющего
соответствующую ответственность/функциональность (вопреки общепринятым правилам называния методов и функций начиная с префикса глагола действия).

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
