export interface CrudService<T> {
  create(entity: T): Promise<T>;
  findAll(): Promise<T[]>;
  findOne(id: number): Promise<T | null>;
  update(id: number, entity: T): Promise<T | null>;
  remove(id: number): Promise<boolean>;
}
