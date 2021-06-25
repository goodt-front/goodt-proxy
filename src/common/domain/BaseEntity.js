import { UniqueEntityID } from './UniqueEntityID';

export class BaseEntity {
    _id;

    _props;

    static create(props, id) {
        return new this(props, id);
    }

    constructor(props, id) {
        this._id = id ?? new UniqueEntityID();
        this._props = props;
    }

    get id() {
        return this._id;
    }
}
