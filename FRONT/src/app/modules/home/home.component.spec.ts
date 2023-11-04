import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from '../../core/material.module';
import { SharedModule } from '../../shared/shared.module';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { ICard } from '../../shared/models/card.model';
import { CardsService } from '../../shared/services/cards.service';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../shared/services/login.service';
import { AlertMsg, ErrorMsg } from '../../shared/models/messages.enum';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let cardsService: CardsService;
  let _snackBar: MatSnackBar;
  let loginService: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        HttpClientTestingModule,
        MaterialModule,
        SharedModule,
        DragDropModule
      ]
    });
    cardsService = TestBed.inject(CardsService);
    _snackBar = TestBed.inject(MatSnackBar);
    loginService = TestBed.inject(LoginService);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('createCard', () => {
    beforeEach(() => {
      component.toDoCards = [{
        id: 'abc-123',
        titulo: 'abc',
        conteudo: 'def',
        lista: 'ToDo',
        isEditMode: true
      }];
    });

    it('should create a new card', () => {
      component.createCard();

      expect(component.toDoCards).toHaveLength(2);
    });

    it('should cancel a new card', () => {
      component.tempCards = [{
        titulo: '',
        conteudo: '',
        lista: 'ToDo',
        isEditMode: true
      }];

      component.createCard();

      expect(component.toDoCards).toHaveLength(1);
    });
  });

  describe('addCard', () => {
    const cardFormValue: ICard = <ICard>{
      titulo: 'abc',
      conteudo: 'abc-123',
      lista: 'ToDo'
    };

    it('should add a new card', () => {
      const res = { ...cardFormValue, id: '321'};
      jest.spyOn(cardsService, 'addCard').mockReturnValue(of(res));
      jest.spyOn<HomeComponent, any>(component, 'getCards').mockImplementation();

      component.addCard(cardFormValue);

      expect(cardsService.addCard).toHaveBeenCalledWith(cardFormValue);
      expect(component['getCards']).toHaveBeenCalled();
    });

    it('should token has expired when try to add a new card', () => {
      const error: HttpErrorResponse = <HttpErrorResponse>{
        status: 401
      };
      jest.spyOn(cardsService, 'addCard').mockReturnValue(throwError(() => error));
      jest.spyOn<HomeComponent, any>(component, 'handleToast').mockImplementation();
      jest.spyOn(loginService, 'logout').mockImplementation();

      component.addCard(cardFormValue);

      expect(cardsService.addCard).toHaveBeenCalledWith(cardFormValue);
      expect(component['handleToast']).toHaveBeenCalledWith(AlertMsg.SESSION_EXPIRED);
      expect(loginService.logout).toHaveBeenCalled();
    });

    it('should get error when try to add a new card', () => {
      const error: HttpErrorResponse = <HttpErrorResponse>{
        status: 500
      };
      jest.spyOn(cardsService, 'addCard').mockReturnValue(throwError(() => error));
      jest.spyOn<HomeComponent, any>(component, 'handleToast').mockImplementation();

      component.addCard(cardFormValue);

      expect(cardsService.addCard).toHaveBeenCalledWith(cardFormValue);
      expect(component['handleToast']).toHaveBeenCalledWith(ErrorMsg.ADD_CARD_ERROR);
    });
  });

  describe('removeCard', () => {
    const id = '321';

    it('should remove a card', () => {
      const res: ICard[] = [];
      jest.spyOn(cardsService, 'removeCard').mockReturnValue(of(res));
      jest.spyOn<HomeComponent, any>(component, 'getCards').mockImplementation();

      component.removeCard(id);

      expect(cardsService.removeCard).toHaveBeenCalledWith(id);
      expect(component['getCards']).toHaveBeenCalled();
    });

    it('should token has expired when try to remove a card', () => {
      const error: HttpErrorResponse = <HttpErrorResponse>{
        status: 401
      };
      jest.spyOn(cardsService, 'removeCard').mockReturnValue(throwError(() => error));
      jest.spyOn<HomeComponent, any>(component, 'handleToast').mockImplementation();
      jest.spyOn(loginService, 'logout').mockImplementation();

      component.removeCard(id);

      expect(cardsService.removeCard).toHaveBeenCalledWith(id);
      expect(component['handleToast']).toHaveBeenCalledWith(AlertMsg.SESSION_EXPIRED);
      expect(loginService.logout).toHaveBeenCalled();
    });

    it('should get error when try to remove a card', () => {
      const error: HttpErrorResponse = <HttpErrorResponse>{
        status: 500
      };
      jest.spyOn(cardsService, 'removeCard').mockReturnValue(throwError(() => error));
      jest.spyOn<HomeComponent, any>(component, 'handleToast').mockImplementation();

      component.removeCard(id);

      expect(cardsService.removeCard).toHaveBeenCalledWith(id);
      expect(component['handleToast']).toHaveBeenCalledWith(ErrorMsg.REMOVE_CARD_ERROR);
    });
  });

  describe('editCard', () => {
    const cardFormValue: ICard = <ICard>{
      id: '321',
      titulo: 'abc',
      conteudo: 'abc-123',
      lista: 'ToDo'
    };

    it('should edit a card', () => {
      const res = { ...cardFormValue };
      jest.spyOn(cardsService, 'editCard').mockReturnValue(of(res));
      jest.spyOn<HomeComponent, any>(component, 'getCards').mockImplementation();

      component.editCard(cardFormValue);

      expect(cardsService.editCard).toHaveBeenCalledWith(cardFormValue);
      expect(component['getCards']).toHaveBeenCalled();
    });

    it('should token has expired when try to edit a card', () => {
      const error: HttpErrorResponse = <HttpErrorResponse>{
        status: 401
      };
      jest.spyOn(cardsService, 'editCard').mockReturnValue(throwError(() => error));
      jest.spyOn<HomeComponent, any>(component, 'handleToast').mockImplementation();
      jest.spyOn(loginService, 'logout').mockImplementation();

      component.editCard(cardFormValue);

      expect(cardsService.editCard).toHaveBeenCalledWith(cardFormValue);
      expect(component['handleToast']).toHaveBeenCalledWith(AlertMsg.SESSION_EXPIRED);
      expect(loginService.logout).toHaveBeenCalled();
    });

    it('should get error when try to edit a card', () => {
      const error: HttpErrorResponse = <HttpErrorResponse>{
        status: 500
      };
      jest.spyOn(cardsService, 'editCard').mockReturnValue(throwError(() => error));
      jest.spyOn<HomeComponent, any>(component, 'handleToast').mockImplementation();

      component.editCard(cardFormValue);

      expect(cardsService.editCard).toHaveBeenCalledWith(cardFormValue);
      expect(component['handleToast']).toHaveBeenCalledWith(ErrorMsg.EDIT_CARD_ERROR);
    });
  });

  describe('drop', () => {
    const ev: CdkDragDrop<ICard[]> = <CdkDragDrop<ICard[]>>{
      container: {
        id: 'toDoList'
      },
      previousContainer: {
        data: [<ICard>{
          lista: 'Doing'
        }]
      },
      previousIndex: 0
    };

    it('should drop card to ToDo column', () => {
      const card: ICard = <ICard>{
        ...ev.previousContainer.data[0],
        lista: 'ToDo'
      };
      jest.spyOn(component, 'editCard').mockImplementation();

      component.drop(ev);

      expect(component.editCard).toHaveBeenCalledWith(card);
    });

    it('should drop card to Doing column', () => {
      ev.container.id = 'doingList';
      const card: ICard = <ICard>{
        ...ev.previousContainer.data[0],
        lista: 'Doing'
      };
      jest.spyOn(component, 'editCard').mockImplementation();

      component.drop(ev);

      expect(component.editCard).toHaveBeenCalledWith(card);
    });

    it('should drop card to Done column', () => {
      ev.container.id = 'doneList';
      const card: ICard = <ICard>{
        ...ev.previousContainer.data[0],
        lista: 'Done'
      };
      jest.spyOn(component, 'editCard').mockImplementation();

      component.drop(ev);

      expect(component.editCard).toHaveBeenCalledWith(card);
    });
  });

  describe('getCards', () => {
    const cardFormValue: ICard = <ICard>{
      id: '321',
      titulo: 'abc',
      conteudo: 'abc-123',
      lista: 'ToDo'
    };

    it('should get cards', () => {
      const res: ICard[] = [];
      jest.spyOn(cardsService, 'getCards').mockReturnValue(of(res));
      jest.spyOn<HomeComponent, any>(component, 'filterCards').mockImplementation();

      component['getCards']();

      expect(component['filterCards']).toHaveBeenCalledWith(res);
    });

    it('should token has expired when try to get cards', () => {
      const error: HttpErrorResponse = <HttpErrorResponse>{
        status: 401
      };
      jest.spyOn(cardsService, 'getCards').mockReturnValue(throwError(() => error));
      jest.spyOn<HomeComponent, any>(component, 'handleToast').mockImplementation();
      jest.spyOn(loginService, 'logout').mockImplementation();

      component['getCards']();

      expect(cardsService.getCards).toHaveBeenCalled();
      expect(component['handleToast']).toHaveBeenCalledWith(AlertMsg.SESSION_EXPIRED);
      expect(loginService.logout).toHaveBeenCalled();
    });

    it('should get error when try to get cards', () => {
      const error: HttpErrorResponse = <HttpErrorResponse>{
        status: 500
      };
      jest.spyOn(cardsService, 'getCards').mockReturnValue(throwError(() => error));
      jest.spyOn<HomeComponent, any>(component, 'handleToast').mockImplementation();

      component['getCards']();

      expect(cardsService.getCards).toHaveBeenCalled();
      expect(component['handleToast']).toHaveBeenCalledWith(ErrorMsg.GET_CARDS_ERROR);
    });
  });

  describe('handleToast', () => {
    it('shuold handle toast', () => {
      const msg = 'some message';
      jest.spyOn(_snackBar, 'open').mockImplementation();

      component['handleToast'](msg);

      expect(_snackBar.open).toHaveBeenCalledWith(msg, '', { duration: 5000 });
    });
  });

  describe('filterCards', () => {
    const cards: ICard[] = [
      <ICard>{ lista: 'ToDo'},
      <ICard>{ lista: 'Doing'},
      <ICard>{ lista: 'Done'},
    ];

    it('shuold filter list of cards', () => {
      component['filterCards'](cards);

      expect(component.toDoCards).toHaveLength(1);
      expect(component.doingCards).toHaveLength(1);
      expect(component.doneCards).toHaveLength(1);
    });
  });
});
