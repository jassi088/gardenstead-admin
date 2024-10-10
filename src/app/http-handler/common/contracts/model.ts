import { IApi, ServerPageInput } from './api';
import * as _ from 'lodash';

export interface ModelOptions<TModel> {
  api: IApi<TModel>;
  properties: TModel;
  fields?: {
    id: string
  };
  formatter?: (model: TModel) => TModel;
  onGet?: (err: any, model?: TModel) => any;
  onClear?: (err: any, model?: TModel) => any;
  onReset?: (err: any, model?: TModel) => any;
  onCreate?: (err: any, model?: TModel) => any;
  onUpdate?: (err: any, model?: TModel) => any;
  onRemove?: (err: any, model?: TModel) => any;
}

export class Model<TModel> {

  private originalModel?: TModel;
  private formatter?: (model: TModel) => TModel;
  properties: TModel;
  errors?: string[];
  id: any;

  isProcessing = false;
  isGetting = false;
  isCreating = false;
  isUpdating = false;
  isRemoving = false;
  isDirty = false;
  filters: any;
  pageNo?: number;
  items: any;
  btnDisable?: boolean;
  valid: any;

  private setModel(model: TModel | any): void {
    this.originalModel = JSON.parse(JSON.stringify(model));
    this.properties = model;
    this.id = this.options.fields ? model[this.options.fields.id] : model['id'];
    this.isDirty = false;
    if (this.errors) { this.errors.splice(0, this.errors.length); }
  };

  private handleError(err: any, callback?: (err: any, model?: TModel) => any): Promise<TModel> {
    if (this.errors) { this.errors.push(err); }
    if (callback) {
      return callback(err);
    } else {
      return Promise.reject(err);
    }
  }

  private handleCallback(model: TModel, callback?: (err: any, model?: TModel) => any): Promise<TModel> {
    if (callback) {
      return callback(null, model);
    } else {
      return Promise.resolve(model);
    }
  }

  markDirty(): Model<TModel> {
    this.isDirty = true;
    return this;
  };

  fetch(options: any, callback?: (err: any, model?: TModel) => any): Promise<TModel> {
    this.isGetting = true;
    this.isProcessing = true;
    // const id = options ? options : this.options.fields ? this.properties[this.options.fields.id] : null;

    return this.options.api.get(options)
      .then(data => {
        this.isGetting = false;
        this.isProcessing = false;
        if (this.formatter) {
          data = this.formatter(data);
        }
        this.setModel(data);
        return this.handleCallback(this.properties, callback || this.options.onGet);
      })
      .catch(err => {
        this.isGetting = false;
        this.isProcessing = false;
        return this.handleError(err, callback || this.options.onCreate);
      });
  };

  get(options: any): Model<TModel> {
    this.fetch(options);
    return this;
  };

  set(data: TModel, callback?: (err: any, model?: TModel) => any): Model<TModel> {
    this.setModel(data);
    if (callback) {
      callback(null, this.properties);
    }
    return this;
  };

  reload(callback?: (err: any, model?: TModel) => any): Promise<TModel> {
    return this.fetch(this.id, callback);
  };

  clear(callback?: (err: any, model?: TModel) => any): Promise<TModel> {
    this.setModel(JSON.parse(JSON.stringify(this.options.properties)));
    return this.handleCallback(this.properties, callback || this.options.onClear);
  };

  reset(callback?: (err: any, model?: TModel) => any): Promise<TModel> {
    this.setModel(this.originalModel);
    return this.handleCallback(this.properties, callback || this.options.onReset);
  };

  create(callback?: (err: any, model?: TModel) => any): Promise<TModel> {
    this.isCreating = true;
    this.isProcessing = true;
    return this.options.api.create(this.properties)
      .then(model => {
        this.setModel(model);
        this.isCreating = false;
        this.isProcessing = false;
        return this.handleCallback(this.properties, callback || this.options.onCreate);
      }).catch(err => {
        this.isCreating = false;
        this.isProcessing = false;
        return this.handleError(err, callback || this.options.onCreate);
      });
  };

  update(callback?: (err: any, model?: TModel) => any, input?: ServerPageInput): Promise<TModel> {
    this.isUpdating = true;
    this.isProcessing = true;
    // const id = this.properties[this.options.fields.id];
    const prop: any = this.properties;
    // const id = prop['id'];
    return this.options.api.update(prop.id, this.properties, input)
      .then(model => {
        this.setModel(model);
        this.isUpdating = false;
        this.isProcessing = false;
        return this.handleCallback(this.properties, callback || this.options.onUpdate);
      }).catch(err => {
        this.isUpdating = false;
        this.isProcessing = false;
        return this.handleError(err, callback || this.options.onUpdate);
      });
  };

  save(callback?: any) {
    // const id = this.properties[this.fields.id];
    const prop: any = this.properties;
    const id = prop['id'];

    if (id && id !== 0) {
      return this.update(callback);
    } else {
      return this.create(callback);
    }
  };

  remove(callback?: (err: any, model?: TModel) => any): Promise<TModel> {
    this.isRemoving = true;
    this.isProcessing = true;
    // const id = this.properties[this.options.fields.id];
    const prop: any = this.properties;
    const id = prop['id'];
    return this.options.api.remove(id)
      .then(() => {
        this.isRemoving = false;
        this.isProcessing = false;
        return this.clear(callback || this.options.onRemove);
      }).catch(err => {
        this.isRemoving = false;
        this.isProcessing = false;
        return this.handleError(err, callback || this.options.onRemove);
      });
  };

  constructor(private options: ModelOptions<TModel>) {
    if (!options.fields) {
      options.fields = { id: 'id' }
    }
    this.properties = options.properties;
  }
};
