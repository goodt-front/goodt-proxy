### goodt-wcore

Структура нового ядра ./core/
| | описание |
|-|-|
| **./components/** | директория компонентов |
| **./components/ui/** | директория shared .vue компонентов |
| **./components/panel-ui/** | директория shared panel ui компонентов |
| | |
| **./dremio/** | директория дремио |
| **./dremio/** ~ Dremio.js | фабрика DremioSDK |
| | |
| **./managers/** | директория менеджеров |
| **./managers/auth/adapters/** | директория адаптеров менеджера аутентификации |
| **./managers/** ~ AuthManager.js | менеджер аутентификации (доступен окружению, виджетам, конфигирируется для AppEntity) |
| **./managers/** ~ ConstManager.js | менеджер констант (доступен окружению, виджетам, панелям, хранит константны AppEntity) | **./managers/** ~ EventBus.js | шина событий (доступная окружению, виджета, панелям, другим менеджерам) |
| **./managers/** ~ FileManager | менеджер статичных файлов AppEntity, дает доступ к локальных файлом AppEntity (доступен окружению и панелям) |
| **./managers/** ~ RouteManager | менеджер для связи с vue-router окружения, дает возможность навигации между route AppEntity (доступен окружению и виджетам) |
| **./managers/** ~ StateManager | менеджер глобального state AppEntity в окружении (доступен и виджетам) |
| | |
| **./net/** | директория net-транспортов |
| **./net/** ~ Http | http транспорт |
| | |
| **./panels/** | shared панелей |
| **./panels/** ~ DremioPanel | панель dremio |
| **./panels/** ~ StylePanel | панель настройки стилей |
| **./panels/** ~ VariablePanel | панель настройки переменных |
| | |
| **./sandbox/** | sandbox для разработки |
| **./sandbox/** ~ EnvEmulator | компонент эмульятор работы окружения (редактора) |
| **./sandbox/** ~ WidgetPreview | компонент для рендера виджета и панелей |
| | |
| **./** ~ Const | константы |
| **./** ~ Elem.vue | base elem компонент IElem |
| **./** ~ Panel.vue | base panel компонент IPanel |
