import { Component, OnInit } from '@angular/core';
import { Photo } from './core/api/v1';
import { MinimalAPIService } from './core/api/v1';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ui';
  photoId: string ='';
  listOfPhotos: Photo[] = [];
  apiLoading: boolean = false;
  constructor(private MinimalAPIService: MinimalAPIService) { }

  ngOnInit(): void {
    this.photoId = '';
    this.apiLoading = false;
  }

  clearAll(){
    this.listOfPhotos = [];
    this.photoId = '';
    this.apiLoading = false;
  }

  getSpecific(){
    this.listOfPhotos = [];
    this.apiLoading = true;
    const id = parseInt(this.photoId);
    if (isNaN(id)) {
      return;
    }
    this.MinimalAPIService.getSpecificGet(id).subscribe((data: Photo[]) => {
      this.listOfPhotos = data;
      this.apiLoading = false;
   });
  }

  getAll = async () =>{
    this.listOfPhotos = [];
    this.apiLoading = true;
    this.MinimalAPIService.getAllGet().subscribe((data: Photo[]) => {
      this.listOfPhotos = data;
      this.apiLoading = false;
    });
  }
}
