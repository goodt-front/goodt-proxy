import { v4 as uuid } from 'uuid';
import { Identifier } from './Identifier';

export class UniqueEntityID extends Identifier {
    constructor(id) {
        super(id ?? uuid());
    }
}
