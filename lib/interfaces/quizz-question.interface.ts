export interface QuizzQuestion {
    id: string;
    idUser: string;
    answer1Choice : boolean;
    answer2Choice : boolean;
    answer3Choice : boolean;
  }

export interface QuizzQuestionFull {
    id: string;
    idUser: string;
    answer1IsOk : boolean;
    answer2IsOk : boolean;
    answer3IsOk : boolean;
  }
  
  