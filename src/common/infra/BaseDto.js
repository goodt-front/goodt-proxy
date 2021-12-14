export class BaseDto {
    /**
     * @typedef {Record<string, any>} DtoJson
     * @param {DtoJson} dtoJson
     * @return {Readonly<DtoJson>}
     */
    constructor(dtoJson) {
        this._validate(dtoJson);

        return Object.freeze(Object.assign(this, dtoJson));
    }

    /**
     *
     * @param {DtoJson} dtoJson
     * @private
     * @throws {Error}
     */
    // eslint-disable-next-line class-methods-use-this
    _validate(dtoJson) {
        // to be implemented
    }
}
