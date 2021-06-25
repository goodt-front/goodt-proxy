export class Identifier {
    constructor(value) {
        this.value = value;
    }

    equals(id) {
        if (id == null) {
            return false;
        }
        if (!(id instanceof this.constructor)) {
            return false;
        }
        return id.toValue() === this.value;
    }

    toString() {
        return String(this.value);
    }

    /**
     * Return raw value of identifier
     */
    toValue() {
        return this.value;
    }
}
