import { BaseApiService } from '@goodt-common/api';
import { SafeResult } from '@goodt-common/utils';
import { TaskDto, UserTaskTreeDto, TaskLinkDto } from './dto';

export class TaskSettingsApiService extends BaseApiService {
    /**
     *
     * @param {number|number[]} userIds
     * @param {number} typeId
     * @return {Promise<SafeResult<UserTaskTreeDto[], Error>>}
     */
    getUserTaskTrees(userIds: number | number[], typeId: number): Promise<SafeResult<UserTaskTreeDto[], Error>>;
    /**
     *
     * @param {number} userId
     * @param {number} typeId
     * @return {Promise<SafeResult<TaskDto[], Error>>}
     */
    getTaskTree(userId: number, typeId: number): Promise<SafeResult<TaskDto[], Error>>;
    /**
     *
     * @param {number|number[]} userIds
     * @param {number} linkTypeId
     * @return {Promise<SafeResult<TaskLinkDto[], Error>>}
     */
    getTaskLinks(userIds: number | number[], linkTypeId: number): Promise<SafeResult<TaskLinkDto[], Error>>;
    /**
     *
     * @param {number|number[]} taskId
     * @return {Promise<SafeResult<TaskDto, Error>>}
     */
    getTaskById(taskId: number): Promise<SafeResult<TaskDto, Error>>;
}
