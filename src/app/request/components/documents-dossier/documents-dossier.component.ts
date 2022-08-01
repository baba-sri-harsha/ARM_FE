import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, of } from 'rxjs';
import { Assets } from 'src/app/models/assets';
import { RequestView } from 'src/app/models/requestView';
import { UploadService } from 'src/app/services/upload/upload.service';

type Files = {
  file: string;
};
@Component({
  selector: 'app-documents-dossier',
  templateUrl: './documents-dossier.component.html',
  styleUrls: ['./documents-dossier.component.scss']
})
export class DocumentsDossierComponent implements OnInit {
  displayedColumns: string[] = ['DocName', 'Actions'];

  selectedFiles!: FileList;
  progressInfos = [];
  message = '';
  fileInfos!: Observable<any>;
  filesArray: Assets[] = [];
  dataSource = new MatTableDataSource(this.filesArray);
  @Input() request = {} as RequestView;

  constructor(private _uploadService: UploadService) {}

  ngOnInit(): void {
    console.log(`Inside DocumentDossier`);
    this.getFiles();
  }

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
            this.getFiles();
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
                this.getFiles();
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
    this._uploadService
      .getAllFiles(1, null)
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
  };

  preview(file: Assets) {
    let fileName = `${file.assetName}`;
    this._uploadService.previewFile(fileName).subscribe((data: any) => {
      console.log(data);
      const fileURL = URL.createObjectURL(data);
      window.open(fileURL, '_blank');
    });
  }

  download(file: Assets) {
    let fileName = file.assetName;
    console.log(fileName);
    this._uploadService.downloadFile(fileName).subscribe((data: any) => {
      console.log(data);
    });
  }

  delete(file: Assets) {
    console.log(file);

    this._uploadService.deleteFile(file.assetId).subscribe((data: any) => {
      this.getFiles();
      console.log(data);
    });
  }
}
