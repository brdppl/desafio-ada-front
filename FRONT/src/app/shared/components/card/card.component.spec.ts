import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { MaterialModule } from '../../../core/material.module';
import { LMarkdownEditorModule } from 'ngx-markdown-editor';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import * as ace from 'ace-builds';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertMsg } from '../../models/messages.enum';
import { ICard } from '../../models/card.model';

ace.config.set('basePath', '/assets/ui/');
ace.config.set('modePath', '');
ace.config.set('themePath', '');

Object.defineProperty(window, 'marked', {
  value: {
    Renderer: jest.fn() 
  }
});

Object.defineProperty(window, 'ace', {
  value: ace
});

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let _snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent],
      imports: [
        MaterialModule,
        LMarkdownEditorModule,
        FormsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    _snackBar = TestBed.inject(MatSnackBar);
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('remove', () => {
    const id = '123';

    it('should emit removeItem event', () => {
      jest.spyOn(component.removeItem, 'emit').mockImplementation();

      component.remove(id);

      expect(component.removeItem.emit).toHaveBeenCalledWith(id);
    });
  });

  describe('add', () => {
    beforeEach(() => {
      component.form = new FormGroup({
        id: new FormControl('123'),
        titulo: new FormControl('card title', [Validators.required]),
        conteudo: new FormControl('card content', [Validators.required]),
        lista: new FormControl('ToDo')
      });
    });

    it('should emit addItem event', () => {
      jest.spyOn(component.addItem, 'emit').mockImplementation();

      component.add();

      expect(component.addItem.emit).toHaveBeenCalled();
    });
    
    it('should not emit addItem event', () => {
      component.form.reset();
      jest.spyOn(_snackBar, 'open').mockImplementation();

      component.add();

      expect(_snackBar.open).toHaveBeenCalledWith(AlertMsg.FILL_REQUIRED_FIELDS, '', { duration: 5000 });
    });
  });

  describe('edit', () => {
    it('should emit editItem event', () => {
      jest.spyOn(component.editItem, 'emit').mockImplementation();

      component.edit();

      expect(component.editItem.emit).toHaveBeenCalled();
    });
  });

  describe('enableEditMode', () => {
    it('should enable edit mode', () => {
      component.data = {
        titulo: 'abc',
        conteudo: 'abc-123',
        lista: 'ToDo',
        isEditMode: true,
      };

      component.enableEditMode();

      expect(component.form.get('titulo')?.value).toEqual('abc');
      expect(component.form.get('conteudo')?.value).toEqual('abc-123');
    });
  });

  describe('moveColumn', () => {
    const item: ICard = <ICard>{
      id: '321',
      titulo: 'abc',
      conteudo: 'abc-123',
      lista: 'ToDo'
    };
    const back = 'back';
    const forward = 'forward';

    it('should move item from ToDo column to Doing column', () => {
      jest.spyOn(component.editItem, 'emit').mockImplementation();
      
      component.moveColumn(item, forward);

      expect(component.editItem.emit).toHaveBeenCalledWith({ ...item, lista: 'Doing' });
    });

    it('should move item from Doing column to Done column', () => {
      item.lista = 'Doing';
      jest.spyOn(component.editItem, 'emit').mockImplementation();
      
      component.moveColumn(item, forward);

      expect(component.editItem.emit).toHaveBeenCalledWith({ ...item, lista: 'Done' });
    });

    it('should move item from Done column to Doing column', () => {
      item.lista = 'Done';
      jest.spyOn(component.editItem, 'emit').mockImplementation();
      
      component.moveColumn(item, back);

      expect(component.editItem.emit).toHaveBeenCalledWith({ ...item, lista: 'Doing' });
    });

    it('should move item from Doing column to ToDo column', () => {
      item.lista = 'Doing';
      jest.spyOn(component.editItem, 'emit').mockImplementation();
      
      component.moveColumn(item, back);

      expect(component.editItem.emit).toHaveBeenCalledWith({ ...item, lista: 'ToDo' });
    });
  });
});
