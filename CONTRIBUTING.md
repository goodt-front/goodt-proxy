# Внесение изменений

## Prerequisites

### Термины
Commit – git commit  
PR – [Pull Request](https://www.atlassian.com/ru/git/tutorials/making-a-pull-request)
Инстанс – [Instance](https://en.wikipedia.org/wiki/Instance_(computer_science))
### Модальные предикаты
Слова «MUST», «MUST NOT», «REQUIRED», «SHALL», «MAY» и «OPTIONAL» в данном документе должны интерпретироваться как в [RFC 2119](https://www.ietf.org/rfc/rfc2119.txt).


## Оформление изменений
### Версионирование и git-теги **`ВАЖНО!`**
Перед назначением git-тега на коммит, убедитесь, что аналогичное названию тега значение указано в `package.json` в поле `version`
```json
{
  version: "1.0.0"
}
```

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
```js
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
```js
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

```js
const someConst = 'someVal';

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
