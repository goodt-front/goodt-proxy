# CУП: Ядро

## Общие сведения

Базовая функциональность (классы, `Vue.js`-компоненты, `Vue.js`-миксины) переиспользуемая в проектах СУП: Библиотеке Виджетов, Плеере, Редакторе.

## Термины
- **component** — `Vue.js` компонент, выполняющий требуемую бизнес логику.
- **widget** — совокупность **component** + **panel.**
- **panel** — `Vue.js` компонент, настраивающий с помощью ui элементов управления свойства **component**,
  которые описаны в дескрипторе.
  
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
├── CONTRIBUTING.md  # 
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

## Публичная функциональность пакета

### Экспортируемые агрегаты и члены модулей

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

### Дополнительные folder-based npm-пакеты и алиасы

#### Runtime-алиасы

| название                      | описание                                                                                                                    |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `@goodt/core`                 | без зависимостей, алиас для доступа к папке `core` этого пакета
| `@goodt/panels`               | без зависимостей, алиас для доступа к папке пакета `Panels` этого пакета |

#### Dev-mode пакеты
npm-пакеты, которые используются как самим ядром при разработке, так и переиспользуются в режиме разработки проектов СУП: Плеер, Библиотека виджетов, Редактор
| название                      | описание                                                                                                                    |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `@goodt/config`               | Содержит переиспользуемые конфиги в проектах СУП
| `@goodt/browserslist-config`  | Содержит конфиг для browserslist |
| `@goodt/eslint-config-base`   | Содержит конфиг для eslint и связанные с ним зависимости |
| `@goodt/tests`                | Содержит конфиг для jest и связанные зависимости для его работы |
| `@goodt/scaffold`             | Содержит скрипты для ыс кода шаблона виджетов |
| `@goodt/styleguide`           | Содержит зависимости для работы styleguide |

#### Особенности установки dev-mode folder-based npm-пакетов для внешнего использования
Поскольку dev-mode npm-пакеты не являются самостоятельными npm-пакетами,
находящимися в отдельном выделенном npm-репозитории или отдельном git-репозитории, а являются внутренними folder-based пакетами `goodt-wcore`,
то для установки не могут быть 
указаны напрямую в `package.json` проектов, где предполагаются к использованию.
Их можно установить в проект вручную ТОЛЬКО ПОСЛЕ УСТАНОВКИ `goodt-wcore`.

```bash
npm i --no-save @goodt/config @goodt/browserslist-config @goodt/eslint-config-base @goodt/scaffold @goodt/styleguide
```

# @goodt/common
## BaseApiService
API-сервис – функциональность, ответственностями которой являются:
* подготовка запросов для серверного API в требуемом формате;
* совершение запросов к серверному API;
* обработка ответов от серверного API:
  - проверка валидности служебного формата представление данных ответа; 
  - приведение формата валидного ответа к контрактным DTO,
* обработка ошибок транспортного / уровня HTTP клиента
  - ошибок прав доступа клиента к ресурсам;
  - приведение ошибок инфраструктурного слоя к ошибкам слоя приложения. 

`BaseApiService` – Базовый класс для наследования собственным API-сервисом.
```js
class BaseApiService extends IApiService {
    /**
     * @param {string} url
     */
    apiBaseURL: string | undefined;
    /**
     * @param {import('./ApiHttpClient').ApiHttpClient} client
     */
    setClient(client: ApiHttpClient): void;
    /**
     * @param {IApiServiceOptions} options
     */
    setOptions(options: IApiServiceOptions): void;
    /**
     *
     * @param {import('./ApiServiceRequest')} request
     * @return {Promise<SafeResult>}
     */
    request(request: IApiServiceRequest): Promise<any>;
    /**
     * Освобождает ресурсы, используемые сервисом
     */
    dispose(): void;
    /**
     * Билдит конфиг реквеста для клиента
     *
     * @param {IApiServiceRequest} request
     * @return {import('@goodt/core/net').ITransportRequest} ITransportRequest
     */
}
```

Пример
```js
// services/ExampleApiService.js
import { createTransport, HttpAuthTransportSymbol } from '@goodt/core/net';
import { buildDtoSafeResult } from '@/common/infra/utils';
import { useApiService } from '@goodt/common/mixins';
import { BaseApiService } from '@goodt/common/services/ApiService';
import { ItemDto } from './dto';

const ApiEndpointsPath = {
    GET_ITEM: '/item/:id',
    CREATE_ITEM: '/item',
    UPDATE_ITEM: '/item/:id',
    DELETE_ITEM: '/item/:id',
};

class ExampleApiService extends BaseApiService {
  /**
   * Получить итем по id

   * @param {number} itemId
   * @return {Promise<SafeResult<ItemDto, ApiServiceError>>}
   */
  async getItemById(itemId) {
    const url = ApiEndpointsPath.GET_ITEM.replace(':id', String(itemId));
    const itemDtoRequest = createApiServiceRequest(url);
    const itemDtoJsonResult = await this.request(itemDtoRequest);

    /**
     * @member {ApiServiceError} error
     * // error.code =
     * // ApiServiceErrorCode.INTERNAL |      - сервер не смог обработать запрос (HTTP status code 500 для REST)
     * // ApiServiceErrorCode.INVALID |       - сервер не смог обработать запрос из-за неверного формата или
     * // сервер ответил, но клиент не смог обработать ответ
     * // ApiServiceErrorCode.FORBIDDEN |     - сервер ответил, что у нас нет прав доступа к ресурсу
     * // ApiServiceErrorCode.NOT_FOUND |     - сервер ответил, что ресурс не найден или не существует
     * // ApiServiceErrorCode.UNAUTHORIZED |  - сервер ответил, что мы не авторизованы для совершения запросов
     * // ApiServiceErrorCode.UNKNOWN |       - сломалось что-то при работеклиента
     */
    const { isError, result: itemDtoJson, error } = itemDtoJsonResult;
    if (isError) {
      // прокидываем ошибочный ответ дальше
      return itemDtoJsonResult;
    }
    // пытаемся создать Dto-инстанс класса `BaseDto` для полученного json
    // в случае ошибки проверки типа и формата json, можем получить 
    // ApiServiceError с кодом ApiServiceErrorCode.VALIDATION.
    const itemDtoResult = buildDtoSafeResult(ItemDto, itemDtoJson);

    return itemDtoResult;
  }

  async createItem(dto) {
    const itemDtoJsonResult = await this.request({
      url: ApiEndpointsPath.CREATE_ITEM,
      params: dto,
      options: { method: 'post' }
    });
    // ...
    // const itemSafeResult = buildDtoSafeResult(ItemDto, itemDtoJsonResult);
    //
    // return itemSafeResult;
  }

  async updateItemById(id, dto) {
    const itemDtoJsonResult = await this.request({
      url: ApiEndpointsPath.UPDATE_ITEM.replace(':id'),
      params: dto,
      options: { method: 'put' }
    });
    // ...
    // const itemSafeResult = buildDtoSafeResult(ItemDto, itemDtoJsonResult);
    //
    // return itemSafeResult;
  }

  async deleteItemById(id) {
    // ...
    const deleteResult = await this.request({
      url: ApiEndpointsPath.DELETE_ITEM.replace(':id', String(id)),
      options: { method: 'delete' }
    });
  }
}

const create = ({ options }) => {
  const transport = createTransport(HttpAuthTransportSymbol);
  const apiService = new ExampleApiService({ transport, options });

  return apiService;
};

/**
 *
 * @return {IApiServiceMixin}
 */
const useApiServiceMixin = ({ name, apiBaseURL }) => {
  const { mixin: ServiceMixin } = useApiService(create, {
    name,
    apiBaseURL
  });

  return ServiceMixin;
};

/**
 *
 */
export { create, useApiServiceMixin };
```

```js
// ElemWidget.vue
import { Elem } from '@goodt/core';
import { useApiService } from '@goodt/common/mixins';
import { fail, success } from '@goodt/common/utils';
import { PresentableError } from '@goodt/common/errors';
import { descriptor } from './descriptor';
import { useApiServiceMixin } from './service/ExampleApiService';

/**
 * @param {ApiServiceError} error
 */
/**
 * @param {ApiServiceError} error
 * @return {PresentableErroe}
 */
const processApiServiceError = (error) => {
    if (error.code === error.constructor.Code.NOT_FOUND) {
        return new PresentableError('Ресурс не найден');
    }

    if (error.code === error.constructor.Code.FORBIDDEN) {
        return new PresentableError('У вас нет прав доступа к этому ресурсу');
    }

    return new PresentableError('Неизвестная ошибка');
};

// ...
/**
 * @type {IComponentOptions}
 */
export default {
    // ...
    extends: Elem,
    data() {
        return {
            descriptor: descriptor(),
            apiResponseResult: success(null),
            apiURL: null
        };
    },
    mixins: [useApiServiceMixin({ name: '$apiService', apiBaseURL: 'apiURL' })],

    created() {
        this.apiURL = this.props.apiURL;
    },
    mounted() {
        this.doApiRequest();
    },
    methods: {
        async doApiRequest() {
            this.apiResponseResult = success(null);

            const safeResult = await this.$apiService.getPollInfo(1);
            const { isFail, error, result: pollInfo } = safeResult;
            if (isFail) {
                const presentableError = processApiServiceError(error);
                this.apiResponseResult = fail(presentableError);
                return;
            }

            this.apiResponseResult = pollInfo;
        }
    }
};
```

См. также [Внесение изменений](CONTRIBUTING.md#common-api-services)

### См. также

[Внесение изменений](CONTRIBUTING.md)
