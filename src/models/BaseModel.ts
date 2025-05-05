import { Model } from 'sequelize';

export abstract class BaseModel<T extends object, U extends object> extends Model<T, U> {

  abstract get idField(): string;

  protected getIdOutputName(): string {
    return 'id'; 
  }
  protected abstract getFieldOrder(): string[];
  

  toJSON(): object {
    const values: any = { ...this.get() };
    
    const idValue = values[this.idField];
    delete values[this.idField];
    
    delete values.createdAt;
    delete values.updatedAt;
    
    const orderedValues: any = {};

    orderedValues[this.getIdOutputName()] = idValue;
    
    this.getFieldOrder().forEach(field => {
      if (values[field] !== undefined) {
        orderedValues[field] = values[field];
      }
    });
    
    Object.keys(values).forEach(key => {
      if (orderedValues[key] === undefined) {
        orderedValues[key] = values[key];
      }
    });
    
    return orderedValues;
  }
}