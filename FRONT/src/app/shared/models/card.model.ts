type ListType = 'ToDo' | 'Doing' | 'Done';

export interface ICard {
  titulo : string;
  conteudo: string; 
  lista: ListType;
  id?: string;
  isEditMode?: boolean;
}