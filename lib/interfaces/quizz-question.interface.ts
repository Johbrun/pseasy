export interface QuizzQuestion {
    id: number;
    idUser: string;
    question : string;
    difficulty : string;
    level : string;
    answer1 : string;
    answer2 : string;
    answer3 : string;
  }

export interface QuizzQuestionFull {
    id: number;
    idUser: string;
    answer1IsOk : boolean;
    answer2IsOk : boolean;
    answer3IsOk : boolean;
  }
  
  