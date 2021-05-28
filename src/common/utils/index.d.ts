import { SafeResult } from '@goodt/common/utils';
export * from './either';
export * from './proxy-decorator';

export type SafeResult = InstanceType<typeof SafeResult>;
