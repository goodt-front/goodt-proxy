import { BaseDto } from '@goodt/common/infra';
import { ApiServiceError } from '@goodt/common/services/ApiService/errors';

export class PollInfoDto extends BaseDto {
    // eslint-disable-next-line class-methods-use-this
    _validate(dto) {
        if (false) {
            throw new ApiServiceError('PollInfoDto type is not valid', {
                code: ApiServiceError.Code.VALIDATION,
                data: dto
            });
        }
    }
}
