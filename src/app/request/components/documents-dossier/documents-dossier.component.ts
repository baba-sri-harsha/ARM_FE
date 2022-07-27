import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, of } from 'rxjs';
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
  filesArray: string[] = [];
  dataSource = new MatTableDataSource(this.filesArray);

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
      if (files[i].size >= 3000000) {
        console.log('File size exceeds 3MB');
        return;
      }
      console.log('Size:', files[i].size / Math.pow(10, 6), 'MB');
    }
    this._uploadService
      .uploadFiles((event.target as HTMLInputElement).files, 1, null)

      .subscribe(
        (data) => {
          console.log('Uploads:', data);
          this.getFiles();
        },
        (err) => {
          console.log(err);
        }
      );
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

  // selectFiles(event: any) {
  //   this.progressInfos = [];
  //   this.selectedFiles = event.target.files;
  // }
}
