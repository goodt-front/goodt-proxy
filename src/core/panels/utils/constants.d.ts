export const SizeUnits: Readonly<['%', 'px', 'rem', 'em', 'vh', 'vw']>;

export const BorderWidthUnits: Readonly<['px', 'rem', 'em']>;

export const BorderStyleOptions: Readonly<[
    { value: 'none'; label: 'Отсутствует' },
    { value: 'dotted'; label: 'Точки' },
    { value: 'dashed'; label: 'Пунктир' },
    { value: 'solid'; label: 'Сплошная' },
    { value: 'double'; label: 'Двойная' },
    { value: 'groove'; label: 'Выемка' },
    { value: 'ridge'; label: 'Гребень ' },
    { value: 'inset'; label: 'Вогнутая' },
    { value: 'outset'; label: 'Выпуклая' }
]>;

export const FontStyleOptions: Readonly<[
    { label: 'Обычный', value: 'normal' },
    { label: 'Курсив', value: 'italic' },
    { label: 'Наклонный', value: 'oblique' }
]>;

export const FontWeightOptions: Readonly<[
    { label: 'Сверхтонкий (100)', value: '100' },
    { label: 'Очень тонкий (200)', value: '200' },
    { label: 'Тонкий (300)', value: '300' },
    { label: 'Нормальный (400)', value: '400' },
    { label: 'Средний (500)', value: '500' },
    { label: 'Полужирный (600)', value: '600' },
    { label: 'Жирный (700)', value: '700' },
    { label: 'Очень жирный (800)', value: '800' },
    { label: 'Сверхжирный (900)', value: '900' },
    { label: 'Тоньше (lighter)', value: 'lighter' },
    { label: 'Толще (bolder)', value: 'bolder' }
]>;
