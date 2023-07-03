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
  constructor(private MinimalAPIService: MinimalAPIService) { }

  ngOnInit(): void {
    this.photoId = '';
  }

  clearAll(){
    this.listOfPhotos = [];
    this.photoId = '';
  }

  getSpecific(){
    const id = parseInt(this.photoId);
    if (isNaN(id)) {
      return;
    }
    this.MinimalAPIService.getSpecificGet(id).subscribe((data: Photo[]) => {
      this.listOfPhotos = data;
   });
  }

  getAll(){
    this.MinimalAPIService.getAllGet().subscribe((data: Photo[]) => {
       this.listOfPhotos = data;
    });
  }
}
