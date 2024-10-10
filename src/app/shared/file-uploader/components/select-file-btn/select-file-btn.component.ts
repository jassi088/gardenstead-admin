import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  HostListener,
  Output,
  EventEmitter,
  Input,
  forwardRef,
  HostBinding,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Upload } from '@models/upload.model';
import { AppService } from 'src/app/core/services/app.service';
import { FileUploaderDirective } from '../../directives/file-uploader/file-uploader.directive';
import { ImageCropperDirective } from '../../directives/image-cropper/image-cropper.directive';
import { CropperOption, UploaderOption } from '../../file-uploader.constants';
import { SelectImgComponent } from '../select-img/select-img.component';

@Component({
  selector: 'select-file-btn',
  template: `
    <img
      class="selectImage"
      *ngIf="fileType(value) == 'image'"
      [src]="value"
      alt=""
    />
    <video
      class="selectImage"
      [src]="value"
      *ngIf="fileType(value) == 'video'"
      controls
    ></video>
    <input
      type="file"
      hidden
      #fileInput
      (change)="onInputChange($event)"
      (click)="fileInput.value = ''"
    />
    <div class="cross-btn" *ngIf="value">
      <button class="icon-btn" type="button" (click)="value = ''">
        <img src="assets/images/close-black.svg" alt="" />
      </button>
    </div>
    <ng-content *ngIf="!value"></ng-content>
  `,
  styles: [
    `
      :host {
        border-radius: 10px;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        position: relative;
        height: 100%;
        &.ng-invalid.ng-touched {
          border-color: #ff5727 !important;
        }
      }
      .cross-btn {
        position: absolute;
        top: -10px;
        right: -10px;
        button {
          background: transparent;
        }
      }
      img.selectImage {
        width: 100%;
        border-radius: 10px;
        height: 100%;
        object-fit: cover;
      }
    `,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectFileBtnComponent),
      multi: true,
    },
  ],
})
export class SelectFileBtnComponent implements OnInit, ControlValueAccessor {
  @Input() cropper?: ImageCropperDirective;
  @Input() cropperOptions: CropperOption = { ratio: 1 };
  @Input() fileUploader?: FileUploaderDirective;
  @Input() uploaderOption?: UploaderOption;
  @ViewChild('fileInput') fileInput?: ElementRef<HTMLInputElement>;
  @Output('onSelectFile') afterSelectFile: EventEmitter<File> =
    new EventEmitter();
  @Output('onCropFile') afterCropFile: EventEmitter<File> = new EventEmitter();
  @Output('onUploadFile') afterUploadFile: EventEmitter<Upload[]> =
    new EventEmitter();

  constructor(private appService: AppService, private dialog: MatDialog) {}

  ngOnInit() {}

  selectFile(data: any) {
    this.dialog
      .open(SelectImgComponent, {
        autoFocus: false,
        panelClass: 'prf-modal',
        width: '576px',
        height: '445px',
        data: { data: data },
      })
      .afterClosed()
      .subscribe((result: any) => {
        if (result) {
          this.afterUploadFile.emit(result);
        }
      });
  }

  add_image() {
    this.fileInput?.nativeElement?.click();
  }

  @HostListener('dragover', ['$event']) dragover(ev: DragEvent) {
    ev.preventDefault();
  }

  @HostListener('drop', ['$event']) drop(ev: DragEvent) {
    ev.preventDefault();
    if (ev.dataTransfer?.items.length) {
      if (ev.dataTransfer.items[0].kind === 'file') {
        const file = ev.dataTransfer.items[0].getAsFile();
        if (file) {
          this.onSelectFile(file);
        }
      }
    } else {
      if (ev.dataTransfer?.files.length) {
        const file = ev.dataTransfer.files[0];
        this.onSelectFile(file);
      }
    }
  }

  onInputChange(ev: any) {
    const files: File[] = ev.target.files || [];
    if (files.length) {
      this.onSelectFile(files[0]);
    }
  }

  onSelectFile(file: File) {
    this.afterSelectFile.emit(file);
    if (this.cropper) {
      this.cropImage(file);
    } else if (this.fileUploader) {
      this.uploadFile([file]);
    }
  }

  async cropImage(file: File) {
    if (!this.cropper) return;
    try {
      const cropFile = await this.cropper?.cropImage(file, this.cropperOptions);
      this.afterCropFile.emit(cropFile);
      this.uploadFile([cropFile]);
    } catch (error) {
      console.log('Crop image cancelled.');
    }
  }

  async uploadFile(files: File[]) {
    if (!this.fileUploader) return;
    try {
      const uploaders: Upload[] = await this.fileUploader?.uploadFile(
        files,
        this.uploaderOption
      );
      if (!uploaders.length) return;
      if (this.value instanceof Array) {
        this.value = [...this.value, ...uploaders];
      } else {
        this.value = uploaders[0].id;
      }
      this.afterUploadFile.emit(uploaders);
    } catch (error) {
      console.log('upload image Cancelled.');
    }
  }

  onChange: any = () => {};
  onTouch: any = () => {};
  private _value: any;
  get value() {
    return this._value;
  }
  set value(v) {
    this._value = v;
    this.onChange(v);
    this.onTouch(v);
  }

  writeValue(value: any) {
    this.value = value;
  }
  // method to be triggered on UI change
  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  // method to be triggered on component touch
  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  @HostBinding('class.selected') get isSelected() {
    return !!this.value?.length;
  }

  fileType(url: any) {
    let file = url?.split('.')?.pop();
    switch (file) {
      case 'jpg':
        return 'image';
      case 'png':
        return 'image';
      case 'jpeg':
        return 'image';
      case 'gif':
        return 'image';
      case 'JPG':
        return 'image';
      case 'mp4':
        return 'video';
      case 'mov':
        return 'video';
      case 'wmv':
        return 'video';
      case 'flv':
        return 'video';
      case 'avi':
        return 'video';
      case 'mkv':
        return 'video';
      default:
        break;
    }
    return;
  }
}
