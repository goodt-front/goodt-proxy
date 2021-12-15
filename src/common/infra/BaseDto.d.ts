export type DtoJson = Record<string, any>;

export interface IBaseDto {
    new (dtoJson: DtoJson): IBaseDto;
    _validate(dtoJson: DtoJson): void;
}

export class BaseDto implements IBaseDto {
    /**
     * @param {DtoJson} dtoJson
     * @return {Readonly<BaseDto>}
     */
    constructor(dtoJson: DtoJson): BaseDto;

    /**
     *
     * @param {DtoJson} dtoJson
     * @throws {Error}
     * @protected
     */
    // eslint-disable-next-line class-methods-use-this
    protected _validate(dtoJson: DtoJson): void;
}
