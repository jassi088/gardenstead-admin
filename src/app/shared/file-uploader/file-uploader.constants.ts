export interface CropperOption {
    ratio?: number;
    notCrop?: boolean;
    roundCropper?: boolean;
}

export interface UploaderOption{
    fileType:string
}

export interface CropperFileOption extends CropperOption {
    file: File;
}