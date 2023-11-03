import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { ICard } from '../../models/card.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Direction } from '../../models/direction.enum';
import { ListPosition } from '../../models/list-type.enum';
import { MatSnackBar } from '@angular/material/snack-bar';

type DirectionType = 'back' | 'forward';

const fillRequiredFields = 'Preencha os campos obrigatórios.';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() public data: ICard = <ICard>{};
  @Output() public removeItem = new EventEmitter<string>();
  @Output() public addItem = new EventEmitter<ICard>();
  @Output() public editItem = new EventEmitter<ICard>();

  public form!: FormGroup;
  public direction = Direction;
  public listPosition = ListPosition;

  constructor(
    private _snackBar: MatSnackBar
  ) {}

  public ngOnInit(): void {
    this.buildForm();
  }

  public remove(id: string): void {
    this.removeItem.emit(id);
  }

  public add(): void {
    if (this.form.valid) {
      delete this.form.value.id;
      this.addItem.emit(this.form.value);
    } else {
      this._snackBar.open(fillRequiredFields, '', {
        duration: 5000
      })
    }
  }

  public edit(): void {
    this.editItem.emit(this.form.value);
  }

  public enableEditMode(): void {
    this.data.isEditMode = true;
    this.form.patchValue({
      titulo: this.data.titulo,
      conteudo: this.data.conteudo
    });
  }

  public moveColumn(item: ICard, direction: DirectionType) {
    const card: ICard = { ...item };

    if (direction === Direction.FORWARD) {
      switch (item.lista) {
        case ListPosition.TO_DO:
          card.lista = ListPosition.DOING;
          break;
        case ListPosition.DOING:
          card.lista = ListPosition.DONE;
          break;
      }
    }

    if (direction === Direction.BACK) {
      switch (item.lista) {
        case ListPosition.DONE:
          card.lista = ListPosition.DOING;
          break;
        case ListPosition.DOING:
          card.lista = ListPosition.TO_DO;
          break;
      }
    }

    this.editItem.emit(card);
  }

  private buildForm(): void {
    this.form = new FormGroup({
      id: new FormControl(this.data.id),
      titulo: new FormControl('', [Validators.required]),
      conteudo: new FormControl('', [Validators.required]),
      lista: new FormControl(this.data.lista)
    });
  }
}
