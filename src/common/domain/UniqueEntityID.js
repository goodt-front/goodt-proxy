import uuid from 'uuid/v4';
import { Identifier } from './Identifier';

export class UniqueEntityID extends Identifier {
    constructor(id) {
        super(id ?? uuid());
    }
}
