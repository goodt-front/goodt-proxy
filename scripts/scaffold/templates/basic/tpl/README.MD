# Памятка по разработке
Содержит краткую информацию
из [README.MD](https://goodt-git.goodt.me/projects/GOOD/repos/goodteditor-web-components/browse/README.md)
и [CONTRIBUTING.MD](https://goodt-git.goodt.me/projects/GOOD/repos/goodteditor-web-components/browse/CONTRIBUTING.MD).

## ВАЖНО!

Перед началом и после окончания разработки, перед созданием `PR` советуем свериться с чеклистом соответствия
[Соглашениям](#conventions).

## Полезные ссылки
- [README.MD](https://goodt-git.goodt.me/projects/GOOD/repos/goodteditor-web-components/browse/README.md)
- [CONTRIBUTING.MD](https://goodt-git.goodt.me/projects/GOOD/repos/goodteditor-web-components/browse/CONTRIBUTING.MD)
- [Goodt Wiki](https://redmine.goodt.me/projects/general_goodt/wiki/Frontend)
- [Goodt UI](https://goodt-ui.netlify.app/)
- [Goodt CSS](https://goodt-css.netlify.app/)

## Термины

- **component** — `Vue.js` компонент, выполняющий требуемую бизнес логику.
- **widget** — совокупность **component** + **panel.**
- **panel** — `Vue.js`-компонент, настраивающий с помощью ui элементов управления свойства **component**, которые
  описаны в дескрипторе.

## Структура
```
src/lib/
└── [[{name}]]
   ├── api                        # логика работы с серверным API
   ├── components                 # вспомогательные компоненты виджета
   ├── mixins                     # миксины
   ├── panels                     # компоненты панелей
   │    ├── components            # вспомогательные компоненты панелей
   │    ├── [[{panelName}]].d.ts  # d.ts описание TypeScript-типов компонента панели (для ассиста IDE)
   │    ├── [[{panelName}]].vue   # компонент панели
   │    └── index.js              
   ├── services                   # сервисы
   ├── utils                      # утилиты
   ├── descriptor.js              # файл дескриптора
   ├── [[{name}]].d.ts            # d.ts описание TypeScript-типов компонента виджета (для ассиста IDE)
   ├── [[{name}]].vue             # компонент виджета
   └── style.less                 # файл стилей
```

<a name="conventions"></a>
## Соглашения
### Наименование
*[ ] Название **widget component** ДОЛЖНО начинаться с префикса `Elem*` и использовать PascalCase (`[[name]]`)
*[ ] Название **widget panel** ДОЛЖНО иметь суффикс `*Panel` и использовать PascalCase (`[[panelName]]`)
*[ ] Название **widget component** и родительской папки должны совпадать: `src/lib/[[name]]/[[name]].vue`
*[ ] Название **widget component** и родительской папки должны совпадать: `src/lib/[[name]]/[[name]].vue`
*[ ] Названия тегов переиспользуемых компонентов (модальных окон, попапов, контроллов, панелей) в шаблоне <template></template>
  виджета должны быть написано в нотации kebab-case и начинаться с префикса `ui-*`
*[ ] Названия тегов вспомогательных компонентов виджета (специфических для виджета компонентов: карточек, меню и т.д.)
 в шаблоне <template></template> виджета должны быть написаны в нотации kebab-case и начинаться с префикса `w-*`

### Структура и состав
*[ ] **widget component** ДОЛЖЕН находится в корне папки `src/lib/[[name]]/[[name]].vue`.
*[ ] **widget panel** ТРЕБУЕТСЯ располагать в подпапке `./panels/[[panelName]]`.  
*[ ] Вспомогательные компоненты **widget component** ДОЛЖНЫ находится папке `src/lib/[[name]]/components`.
*[ ] Вспомогательные компоненты **widget panel** ДОЛЖНЫ находится папке `src/lib/[[name]]/panels/components`.
*[ ] В папке виджета ДОЛЖЕН существовать только ОДИН **widget component** `[[name]]` наследующий `Elem`.
*[ ] Вспомогательные компоненты **widget panel** не могут наследовать компонент `Panel`.
*[ ] Дескриптор компонента рекомендуется выносить в отдельный файл с названием `descriptor.js` в корне папки виджета.
*[ ] Стили компонента рекомендуется выносить в отдельный файл с названием `style.less` в корне папки виджета.
*[ ] Вспомогательные `Vue.js`-миксины ДОЛЖНЫ храниться в папке `src/lib/[[name]]/mixins`.
*[ ] Утилиты, специфичные для конкретного **widget** ДОЛЖНЫ храниться в папке `src/lib/[[name]]/utils` или файле `src/lib/[[name]]/utils.js`.
*[ ] Логика API-сервисов (работы с серверным API) ДОЛЖНА храниться в папке `src/lib/[[name]]/api`.
*[ ] Логика вспомогательных сервисов ДОЛЖНА храниться в папке `src/lib/[[name]]/services`.

### Разделение логики
- Вспомогательные (дочерние) компоненты **widget component** и **widget panel** ДОЛЖНЫ стремиться быть "ГЛУПЫМИ".
- Отношения между **widget component/panel** и вспомогательными компонентами должно стремиться следовать шаблону проектирования:
    Container/Presentational Components (оно же Provider/Consumer; Разделение Поведения и Представления)
- Если методу в секции `methods` в ходе выполнения не требуется использования контекста (обращениe к `this` экземпляра компонента),
  то его функциональность следует выносить на уровень компонента, а вероятнее всего сразу в `src/lib/[[name]]/utils.js`.

#### Вспомогательные компоненты:
*[ ] НЕ ДОЛЖНЫ осуществлять запросы к серверному API.
*[ ] НЕ ДОЛЖНЫ осуществлять чтение/запись из/в глобального State.
*[ ] НЕ ДОЛЖНЫ осуществлять подписку и обработку событий глобальной шины.
*[ ] НЕ ДОЛЖНЫ инициировать навигацию.

### Code style
### Проверка перед `git push` / `PR`
Перед `git push` ваших изменений / созданием `PR` ТРЕБУЕТСЯ проверить code style для измененных относительно ветки `master`
файлов (Проверка code style доступна в любое время и после `git push`).
```bash
npm run lint:committed
```
### Исправление кода для соответствия `code style`
- При внесении изменений в код компонентов виджета на вас возлагается обязанность обеспечить последущее прохождение кодом процедуры линтинга.
- Если объём внесения изменений по исправлению кода для соответствия правилам линтинга значительный, или требует последующий проверки сохранения работоспособности,
  а обстоятельства не позволяют потратить время на рефакторинг, допускается использовать отключение правил линтинга для редактируемого файла.
  При этом необходимо обеспечить создание задачи в Redmine, связанной с внесением соответствующих правок в код для обеспечения code style в последующем.

## Типовые случаи

<a name="cases-use-state"></a>
### Кейс: state
> 🤔 **Кейс**  
> Хотим работать с глобальным **state** (читать, писать) в **widget** компоненте.

> 💡 **Решение**  
> `computed`: `$storeState`  
> `methods`: `$storeCommit()`  
> Так же следует зарегистрировать/описать переменные в _vars_ дескрипторе, которые **component** собирается использовать при работе со `state`.

Пример:
`[[{name}]].vue`

```js
// descriptor.js
export const Vars = Object.freeze({
   MY_VAR: 'myVariable'
});

export const descriptor = () => ({
    props: {},
    vars: {
        // объявляем явно переменную, которую хотим получать/отправлять из/в state
       [Vars.MY_VAR]: {
            description: 'date description'
        }
    }
});
```

```js
// [[name]].vue
import { descriptor, Vars } from './descriptor';

export default {
   // ...
   data: () => ({
       myVar: null
   }),
   watch: {
      $storeState(state, prevState) {
         const { [Vars.MY_VAR]: storeVarValue } = state;
         if (storeVarValue !== this.myVar) {
             // do something
         }
      }
    },
    methods: {
        someMethodWithChangedState() {
            // ...
            const partialStateChanged = {
                [Vars.MY_VAR]: 'changedValue'
            };
            this.$storeCommit(partialStateChanged);
       }
    }
};
```

<a name="cases-route-navigation"></a>
### Кейс: навигация

> 🤔 **Кейс**  
> Хотим осуществлять навигацию по страницам из **widget** компонента и следить за изменениями текущего роута.

> 💡 **Решение**  
> `computed`: `$routeCurrent`  
> `methods`: `$routeNavigate()`  

Пример:
`[[{name}]].vue`

```js
export default {
   watch: {
      $routeCurrent(route, prevRoute) {
        const { path, query, meta } = route;
        // route data processing
      }
   },
   methods: {
      someMethodWithRouteNavigation() {
         // ...
         const path = '/route/path';
         const query = {
             param1: 'value'
         };
         this.$routeNavigate({ path, query });
      }
   }
};
```
