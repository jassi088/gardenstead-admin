import { IRemoteData } from './remote-data.interface';

export class ServerPageModel<TModel> implements IRemoteData {
    isSuccess: boolean = false;
    code: string = '';
    error: string = '';
    message: string = '';
    pageNo: number = 1;
    pageSize: number = 0;
    total: number = 0;
    totalPage: number = 0;
    totalRecords: number = 0;
    data: Array<TModel> = [];
    items: Array<TModel> = [];
    stats: any;
}
