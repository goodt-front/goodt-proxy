import { BaseError } from '@goodt-common/errors';

export class PresentableError extends BaseError {
    constructor(message, { title, level } = {}) {
        super(message);
        this.title = title ?? 'Ошибка';
        if (level) {
            this.level = level;
        }
    }

    toString() {
        return `${this.title}: ${this.message}`;
    }
}
