import { Model } from 'sequelize';

export abstract class BaseModel<T extends object, U extends object> extends Model<T, U> {
  // Campo abstracto que cada modelo debe implementar para indicar su ID principal
  abstract get idField(): string;

  // Método que obtiene el nombre deseado para el ID en el JSON
  protected getIdOutputName(): string {
    return 'id'; // Por defecto siempre será 'id'
  }

  // Método que obtiene el orden de las propiedades
  protected abstract getFieldOrder(): string[];

  // Método toJSON centralizado
  toJSON(): object {
    const values: any = { ...this.get() };
    
    // Reemplazar el campo ID original con 'id'
    const idValue = values[this.idField];
    delete values[this.idField];
    
    // Eliminar timestamps por defecto
    delete values.createdAt;
    delete values.updatedAt;
    
    // Crear un objeto ordenado
    const orderedValues: any = {};
    
    // Primero añadir el ID con el nombre deseado
    orderedValues[this.getIdOutputName()] = idValue;
    
    // Luego añadir el resto de campos en el orden definido
    this.getFieldOrder().forEach(field => {
      if (values[field] !== undefined) {
        orderedValues[field] = values[field];
      }
    });
    
    // Añadir cualquier campo restante no especificado en el orden
    Object.keys(values).forEach(key => {
      if (orderedValues[key] === undefined) {
        orderedValues[key] = values[key];
      }
    });
    
    return orderedValues;
  }
}