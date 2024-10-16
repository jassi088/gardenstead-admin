import { IRemoteData } from './remote-data.interface';

export class ServerDataModel<TModel> implements IRemoteData {
  isSuccess: boolean = false;
  code: string = '';
  message: string = '';
  error: string = '';
  items: Array<TModel> = [];
  data: TModel | any = null;
}
