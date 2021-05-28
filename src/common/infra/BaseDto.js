export class BaseDto {
    constructor(dto) {
        this._validate(dto);
        return Object.freeze(dto);
    }

    /**
     * @private
     * @throws {TypeError}
     */
    // eslint-disable-next-line class-methods-use-this
    _validate() {
        // to be implemented
    }
}
