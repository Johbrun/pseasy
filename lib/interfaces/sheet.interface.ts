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

export interface SheetHistory {
  id: string;
  idCategory: number;
  version: string;
  updatedDate: Date;
}

export interface SheetExtended extends Sheet{
  history:SheetHistory[]
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
