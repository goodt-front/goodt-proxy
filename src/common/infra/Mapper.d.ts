export abstract class Mapper<T> {
    public static toEntity(dtoJson: Record<string, any>): T;
    public static toDto(entity: T): Record<string, any>;
}
