import { TestBed } from '@angular/core/testing';

import { CardsService } from './cards.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ICard } from '../models/card.model';

const httpMock = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn()
};

describe('CardsService', () => {
  let service: CardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: HttpClient, useValue: httpMock }
      ]
    });
    service = TestBed.inject(CardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCards', () => {
    it('should create getCards http get method', () => {
      const res: ICard[] = [];
      jest.spyOn(httpMock, 'get').mockReturnValue(of(res));

      service.getCards().subscribe(data => {
        expect(data).toBeDefined();
      });
    });
  });

  describe('addCard', () => {
    const payload: ICard = <ICard>{};

    it('should create addCard http post method', () => {
      const res: ICard = <ICard>{};
      jest.spyOn(httpMock, 'post').mockReturnValue(of(res));

      service.addCard(payload).subscribe(data => {
        expect(data).toBeDefined();
      });
    });
  });

  describe('editCard', () => {
    const payload: ICard = <ICard>{};

    it('should create editCard http put method', () => {
      const res: ICard = <ICard>{};
      jest.spyOn(httpMock, 'put').mockReturnValue(of(res));

      service.editCard(payload).subscribe(data => {
        expect(data).toBeDefined();
      });
    });
  });

  describe('removeCard', () => {
    const id = 'uuid';

    it('should create removeCard http delete method', () => {
      const res: ICard[] = [];
      jest.spyOn(httpMock, 'delete').mockReturnValue(of(res));

      service.removeCard(id).subscribe(data => {
        expect(data).toBeDefined();
      });
    });
  });
});
