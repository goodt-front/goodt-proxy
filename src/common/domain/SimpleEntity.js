import { BaseEntity } from '@goodt-common/domain/BaseEntity';
import { decorateObjectWithProxy } from '@goodt-common/utils';

export class SimpleEntity extends BaseEntity {
    constructor(...args) {
        super(...args);
        return decorateObjectWithProxy(this, this._props);
    }

    toValue() {
        return {
            ...this._props,
            id: this._id.toValue()
        };
    }

    toString() {
        return JSON.stringify(this.toValue());
    }
}
