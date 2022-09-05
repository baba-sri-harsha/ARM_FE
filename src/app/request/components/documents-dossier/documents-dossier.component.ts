import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, of } from 'rxjs';
import { Assets } from 'src/app/models/assets';
import { RequestView } from 'src/app/models/requestView';
import { UploadService } from 'src/app/services/upload/upload.service';
/**
 * @autho - Madhu Shree
 */
type Files = {
  file: string;
};
@Component({
  selector: 'app-documents-dossier',
  templateUrl: './documents-dossier.component.html',
  styleUrls: ['./documents-dossier.component.scss']
})
export class DocumentsDossierComponent implements OnInit, OnChanges {
  displayedColumns: string[] = ['DocName', 'Actions'];

  selectedFiles!: FileList;
  progressInfos = [];
  message = '';
  fileInfos!: Observable<any>;
  filesArray: Assets[] = [];
  dataSource = new MatTableDataSource(this.filesArray);
  @Input() request = {} as RequestView;

  constructor(private _uploadService: UploadService) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.getFiles();
  }

  ngOnInit(): void {
    console.log(`Inside DocumentDossier`);
    this.getFiles();
  }

  /**
   * to upload a new file
   * @author - Dibya Prakash Ojha
   * @param event 
   * @returns 
   */
  async upload(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (!files) {
      return;
    }
    for (var i = 0; i < files.length; i++) {
      const fileSize = 3000000;
      if (files[i].size >= fileSize) {
        alert('File size exceeds 3MB');
        return;
      }
      console.log('Size:', files[i].size / Math.pow(10, 6), 'MB');
    }
    if (this.request.requestId) {
      console.log('Request Id:', this.request.requestId);
      this._uploadService
        .uploadFiles(
          (event.target as HTMLInputElement).files,
          this.request.requestId,
          null
        )
        .subscribe(
          (data) => {
            alert('Upladed Successfully');
            console.log('Uploads:', data);
            this._uploadService
              .getAllFiles(this.request.requestId, null)
              .pipe(
                map((data) => {
                  console.log('data:', data);
                  return data;
                })
              )
              .subscribe((data) => {
                this.filesArray = data;
                console.log('Files', data);
              });
          },
          (err) => {
            console.log(err);
          }
        );
    } else {
      this.request.tasksList.forEach((task) => {
        if (task.taskId) {
          this._uploadService
            .uploadFiles(
              (event.target as HTMLInputElement).files,
              null,
              task.taskId
            )
            .subscribe(
              (data) => {
                alert('Upladed Successfully');
                console.log('Uploads:', data);
                this._uploadService
                  .getAllFiles(null, task.taskId)
                  .pipe(
                    map((data) => {
                      console.log('data:', data);
                      return data;
                    })
                  )
                  .subscribe((data) => {
                    this.filesArray = data;
                    console.log('Files', data);
                  });
              },
              (err) => {
                console.log(err);
              }
            );
        }
      });
    }
  }

  getFiles = () => {
    if (this.request.requestId) {
      this._uploadService
        .getAllFiles(this.request.requestId, null)
        .pipe(
          map((data) => {
            console.log('data:', data);
            return data;
          })
        )
        .subscribe((data) => {
          this.filesArray = data;
          console.log('Files', data);
        });
    } else {
      if (this.request.tasksList) {
        this.request.tasksList.forEach((task) => {
          if (task.taskId) {
            this._uploadService
              .getAllFiles(null, task.taskId)
              .pipe(
                map((data) => {
                  console.log('data:', data);
                  return data;
                })
              )
              .subscribe((data) => {
                this.filesArray = data;
                console.log('Files', data);
              });
          }
        });
      }
    }
  };

  /**
   * To display the uploaded files
   * @author - Dibya Prakash Ojha
   * @param file 
   */
  preview(file: Assets) {
    let fileName = `${file.assetName}`;
    this._uploadService.previewFile(fileName).subscribe((data: any) => {
      console.log(data);
      const fileURL = URL.createObjectURL(data);
      window.open(fileURL, '_blank');
    });
  }

  /**
   * to download a file to local storage
   * @author - Dibya Prakash Ojha
   * @param file 
   */
  download(file: Assets) {
    let fileName = file.assetName;
    console.log(fileName);
    this._uploadService.downloadFile(fileName).subscribe((data: any) => {
      console.log(data);
    });
  }

  /**
   * To delete a uploaded file
   * @author - Dibya Prakash Ojha
   * @param file 
   */
  delete(file: Assets) {
    console.log(file);

    this._uploadService.deleteFile(file.assetId).subscribe((data: any) => {
      this.getFiles();
      console.log(data);
    });
  }
}
