import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ICard } from '../../shared/models/card.model';
import { CardsService } from '../../shared/services/cards.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from '../../shared/services/login.service';
import { ListPosition } from '../../shared/models/list-type.enum';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AlertMsg, ErrorMsg } from '../../shared/models/messages.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public cards: ICard[] = [];
  public toDoCards: ICard[] = [];
  public doingCards: ICard[] = [];
  public doneCards: ICard[] = [];
  
  private subscriptions = new Subscription();

  constructor(
    private cardsService: CardsService,
    private _snackBar: MatSnackBar,
    private loginService: LoginService
  ) { }

  public ngOnInit(): void {
    this.getCards();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public createCard(): void {
    const newCard: ICard = {
      titulo: '',
      conteudo: '',
      lista: ListPosition.TO_DO,
      isEditMode: true
    };
    this.toDoCards.push(newCard);
  }

  public addCard(cardFormValue: ICard): void {
    this.subscriptions.add(
      this.cardsService.addCard(cardFormValue).subscribe({
        next: () => {
          this.getCards();
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.handleToast(AlertMsg.SESSION_EXPIRED);
            this.loginService.logout();
          } else {
            this.handleToast(ErrorMsg.ADD_CARD_ERROR);
          }
        }
      })
    );
  }

  public removeCard(id: string): void {
    this.subscriptions.add(
      this.cardsService.removeCard(id).subscribe({
        next: () => {
          this.getCards();
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.handleToast(AlertMsg.SESSION_EXPIRED);
            this.loginService.logout();
          } else {
            this.handleToast(ErrorMsg.REMOVE_CARD_ERROR);
          }
        }
      })
    );
  }

  public editCard(cardFormValue: ICard): void {
    this.subscriptions.add(
      this.cardsService.editCard(cardFormValue).subscribe({
        next: () => {
          this.getCards();
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.handleToast(AlertMsg.SESSION_EXPIRED);
            this.loginService.logout();
          } else {
            this.handleToast(ErrorMsg.EDIT_CARD_ERROR);
          }
        }
      })
    );
  } 

  public drop(ev: CdkDragDrop<ICard[]>) {
    const card: ICard = ev.previousContainer.data.find((item: ICard, index: number) => index === ev.previousIndex)!;

    switch (ev.container.id) {
      case 'toDoList':
        card.lista = ListPosition.TO_DO;
        break;
      case 'doingList':
        card.lista = ListPosition.DOING;
        break;
      case 'doneList':
        card.lista = ListPosition.DONE;
        break;
    }

    this.editCard(card);
  }

  private getCards(): void {
    this.subscriptions.add(
      this.cardsService.getCards().subscribe({
        next: (data) => {
          this.cards = data;
          this.filterCards(data);
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.handleToast(AlertMsg.SESSION_EXPIRED);
            this.loginService.logout();
          } else {
            this.handleToast(ErrorMsg.GET_CARDS_ERROR);
          }
        }
      })
    );
  }

  private handleToast(msg: string): void {
    this._snackBar.open(msg, '', {
      duration: 5000
    });
  }

  private filterCards(cards: ICard[]): void {
    this.toDoCards = cards.filter(card => card.lista === ListPosition.TO_DO);
    this.doingCards = cards.filter(card => card.lista === ListPosition.DOING);
    this.doneCards = cards.filter(card => card.lista === ListPosition.DONE);
  }
}
