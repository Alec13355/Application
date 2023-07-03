import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MinimalAPIService, Photo } from './core/api/v1';
import { AppComponent } from './app.component';

describe('MinimalAPIService', () => {
  let service: MinimalAPIService;
  let httpMock: HttpTestingController;
  let component: AppComponent;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MinimalAPIService]
    });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(MinimalAPIService);
    component = TestBed.createComponent(AppComponent).componentInstance;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllGet', () => {
    it('should get all photos', () => {
      const photos: Photo[] = [{ id: 1, title: 'test' }];
      service.getAllGet().subscribe((data) => {
        expect(data).toEqual(photos);
      });
  
      const req = httpMock.expectOne('https://webapp.happybay-41fcc3d3.westus2.azurecontainerapps.io/GetAll');
      expect(req.request.method).toBe('GET');
      req.flush(photos);
    });
  });

  describe('GetSpecificGet', () => {
    it('should get a specific with valid id', () => {
      const photos: Photo[] = [{ id: 1, title: 'test' }];
      component.photoId = '1';
      service.getSpecificGet(1).subscribe((data) => {
        expect(data).toEqual(photos);
      });
  
      const req = httpMock.expectOne('https://webapp.happybay-41fcc3d3.westus2.azurecontainerapps.io/GetSpecific?photoId=1');
      expect(req.request.method).toBe('GET');
      req.flush(photos);
    });

    it('should not call api with invalid id', () => {
      const photos: Photo[] = [{ id: 1, title: 'test' }];
      component.photoId = 'test';
      component.getSpecific();
      httpMock.expectNone('https://webapp.happybay-41fcc3d3.westus2.azurecontainerapps.io/GetSpecific?photoId=1');
    });
  });

  describe('clearAll', () => {
    it('should clear all photos', () => {
      const photos: Photo[] = [{ id: 1, title: 'test' }];
      component.listOfPhotos = photos;
      component.clearAll();
      expect(component.listOfPhotos).toEqual([]);
    });
    it('should clear photoId', () => {
      const photos: Photo[] = [{ id: 1, title: 'test' }];
      component.photoId = '123';
      component.clearAll();
      expect(component.photoId).toEqual([]);
    });
  });
});