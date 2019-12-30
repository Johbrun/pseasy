export interface Sheet {
  id: string;
  reference: string;
  version: string;
  updatedDate: Date;
  title: string;
  content: string;
  level: number;
  idCategory: number;
}

export interface SheetLight {
  id: string;
  reference: string;
  version: string;
  updatedDate: Date;
  title: string;
  level: number;
  idCategory: number;
}

export interface SheetCreation {
  id: string;
  reference: string;
  version: string;
  updatedDate: Date;
  title: string;
  content: string;
  level?: number;
}
