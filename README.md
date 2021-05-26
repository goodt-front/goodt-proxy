# CУП: Ядро

## Общие сведения

Базовая функциональность переиспользуемая в СУПе: Библиотеке Виджетов, Плеере, Редакторе.

## Термины

- **component** — инкапсулированный `Vue.js` компонент, выполняющий какую-либо бизнес логику.
- **widget** — совокупность **component** + **panel.**
- **panel** — vue компонент(ы), который настраивает по средством ui свойства **component**, которые описаны в
  дескрипторе.

## Ключевые технологии

### Runtime

- [VueJS 2](https://vuejs.org/)
- [axios](https://npmjs.com)
- [goodt-dremio-sdk](https://npmjs.com)
- [keycloak-js](https://npmjs.com)
- [lodash](https://npmjs.com)
- [portal-vue](https://npmjs.com)
- [vuedraggable](https://npmjs.com)

### Dev

- [Vue CLI 4](https://cli.vuejs.org/)
- 📦 Bundler: [Webpack 4](https://webpack.js.org/)
- Code Linting Vue.JS: [ESLint](https://eslint.vuejs.org/)
- Tests Vue.JS: [Jest](https://eslint.vuejs.org/)

### Tests

- Unit Tests: [Jest](http://jestjs.io/)

### Styles

- :bar_chart: [PostCSS](https://postcss.org/)
- :bar_chart: [Less](https://lesscss.org)

## Структура проекта

### Общая файловая структура

```bash
.
├── .config          # reusable and sharable widely used configs and dependencies: babel.config.js, browserslist-config etc.
├── .utils           # nodejs scripts utils for configs, dev mode and build-time scripts
├── dist             # 
├── public           # 
├── scripts          # npm scripts related stuff
│   ├── lint         # linting deps, scripts, configs and utils
│   ├── scaffold     # scaffold deps, scripts and utils
│   └── styleguide   # styleguide deps, scripts and utils  
├── src              # 
│   ├── common       # 
│   ├── core         # MAIN core meaningful content 
│   ├── dev          # core dev-mode stuff 
│   └── types        # core and wide-used types 
│                    # 
├── tests            # tests deps, config and core-related tests
...                  # 
└── CONTRIBUTING.md  # 
└── README.md        # 
```

### Файловая и пакетная структура `./core/`

| название                      | описание                                                                                                                    |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `/components/`                | Пакет переиспользуемых ядром и внешними зависимостями компонентов                                                                                                      |
| `/components/ui/`             | UI-компоненты для виджетов                                                                                          |
| `/components/panel-ui/`       | UI-компоненты / элементы управления панелей виджетов                                                                                      |
| -                             |                                                                                                                             |
| `/dremio/`                    | Dremio                                                                                                           |
| `/dremio/`~ Dremio.js         | Инструментарий Dremio: Vue.js-миксин, фабрика                                                                                                           |
| -                             |                                                                                                                             |
| `/managers/`                  | Пакет менеджеры                                                                                                       |
| `/managers/auth/adapters/`    | Адаптеры менеджера аутентификации                                                                               |
| `/managers/`~ AuthManager     | Менеджер аутентификации (доступен окружению, виджетам, конфигирируется для AppEntity)                                       |
| `/managers/`~ ConstManager    | Менеджер констант (доступен окружению, виджетам, панелям, хранит константны AppEntity)                                      |
| `/managers/`~ EventBus        | Шина событий (доступная окружению, виджета, панелям, другим менеджерам)                                                     |
| `/managers/`~ FileManager     | Менеджер статичных файлов AppEntity, дает доступ к локальных файлом AppEntity (доступен окружению и панелям)                |
| `/managers/`~ RouteManager    | Менеджер навигации для связи с vue-router окружения, дает возможность навигации между route AppEntity (доступен окружению и виджетам) |
| `/managers/`~ StoreManager    | Менеджер хранилища глобального state AppEntity в окружении (доступен и виджетам)                                                      |
| -                             |                                                                                                                             |
| -                             |                                                                                                                             |
| `/mixins/`                    | Пакет Фабрик `Vue.js`-миксинов с переиспользуемой функциональностью для виджетов                                                                                                       |
| `/mixins/` ~ useDremio        | Миксин для работы с Dremio |
| `/mixins/`~ useStore          | Миксин для работы с менеджером хранилища глобального state |
| `/mixins/`~ useTransport      | Миксин для работы с сетевыми транспортами |
| -                             |                                                                                                                             |
| `/net/`                       | Пакет сетевых транспортов                                                                                                  |
| `/net/`~ Http                 | HTTP-транспорт                                                                                                              |
| `/net/`~ HttpAuth             | HTTP-транспорт с авторизацией                                                                                                              |
| -                             |                                                                                                                             |
| `/panels/`                    | Переиспользуемые панели для виджетов                                                                                                               |
| `/panels/`~ DremioPanel       | панель dremio                                                                                                               |
| `/panels/`~ StylePanel        | панель настройки стилей                                                                                                     |
| `/panels/`~ VariablePanel     | панель настройки переменных                                                                                                 |
| -                             |                                                                                                                             |
| `/render/`                    | Пакет c переиспользуемой функциональностью рендеринга **
widget** посредством механизмов `Vue.js` |
| -                             |                                                                                                                             |
| `/sandbox/`                   | Эмулятор окружения для задач разработки базовой функциональности ядра                                                                                                     |
| `/sandbox/`~ EnvEmulator      | Эмулятор работы окружения (редактора; используется при разработке виджетов)                                       |
| `/sandbox/`~ WidgetPreview    | Эмулятор рендеринга виджета и панелей (используется при разработке виджетов)                                              |
| -                             |                                                                                                                             |
| `/types/`                     | Переиспользуемые в рамках `core` общие типы                                                                                                   |
| -                             |                                                                                                                             |
| `/utils/`                     | Переиспользуемая в рамках `core` утилитарная функциональность |
| -                             |                                                                                                                             |
| `/Elem/`                      | Пакет Базового Компонента виджета **widget
component** IElem                                                                                                   |
| `/Panel/`                     | Пакет Базовой Панели Виджета **widget
panel** IPanel                                                                                                 |
| -                             |                                                                                                                             |
| `/`~ Const                    | константы                                                                                                                   |

## Публичные интерфейсы

### Экспортируемые агрегаты пакетов и элементы

| название                      | описание                                                                                                                    |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `Elem` <br/> `ElemEvent` <br/> `getDescriptorDefaultProps` <br/> `getElemDomId` | `import { Elem, ElemEvent, getDescriptorDefaultProps, getElemDomId } from 'goodt-wcore';`                       |                                                                                                       |
|
| `Panel` <br/> `PanelEvent`    | `import { Panel, PanelEvent } from 'goodt-wcore';`                                                                                      |
| -                             |                                                                                                                             |
| `utils`                       | Реэкспортирует все свои элементы в публичный доступ                                                                                                           |
| `mixins`                      | Реэкспортирует все свои элементы в публичный доступ                                                                                                           |
| -                             |                                                                                                                             |
| `Components`                  | `import { Components } from 'goodt-wcore';` <br/> `const { PanelUi, Ui } = Components;` |
| `Managers`                    | `import { Managers } from 'goodt-wcore';` <br/> `const { AuthManager, ConstManager, FileManager, RouteManager, EventBus } = Managers;` |
| `Panels`                      | `import { Panels } from 'goodt-wcore';` <br/> `const { DremioPanelAsync, VariablePanelAsync, StylePanelAsync } = Panels;` |
| `Sandbox`                     | `import { Sandbox } from 'goodt-wcore';` <br/> `const { EnvEmulator, WidgetPreview, WidgetRender } = Sandbox;` |
| `Render`                      | `import { Render } from 'goodt-wcore';` <br/> `const { render, createRenderFactory } = Render;` |
| `Dremio`                      | `import { Dremio } from 'goodt-wcore';` <br/> `const { SDKFactory, SDK, Query, Dremio, Errors, mixin } = Dremio;` |
| `Net`                         | `import { Net } from 'goodt-wcore';` <br/> `const { Http, HttpAuth, createTransport, HttpTransportSymbol, HttpAuthTransportSymbol } = Net;` |

### Folder-based пакеты и алиасы

#### Runtime

| название                      | описание                                                                                                                    |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `@goodt/core`                 | Folder-based пакет, без зависимостей, алиас для доступа к папке `core` этого пакета
| `@goodt/panels`               | Folder-based пакет, без зависимостей, алиас для доступа к папке пакета `Panels` этого пакета |

#### Dev-time

| название                      | описание                                                                                                                    |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `@goodt/config`               | Содержит переиспользуемые конфиги в проектах СУП
| `@goodt/browserslist-config`  | Содержит переиспользуемый конфиг для browserslist |
| `@goodt/eslint-config-base`   | Содержит переиспользуемый конфиг для eslint и связанные с ним зависимости |
| `@goodt/tests`                | Содержит переиспользуемый конфиг для jest и связанные зависимости для его работы |
| `@goodt/scaffold`             | Содержит скрипты для автогенерации кода шаблона виджетов |
| `@goodt/styleguide`           | Содержит зависимости для работа stylguide |

### См. также

[Внесение изменений](CONTRIBUTING.md)
