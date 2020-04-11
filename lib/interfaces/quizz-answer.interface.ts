export interface QuizzAnswerCreation {
    idQuestion: string;
    idUser: string;
    answer1Choice : boolean;
    answer2Choice : boolean;
    answer3Choice : boolean;
  }

export interface QuizzAnswer {
    id : string;
    idQuestion: string;
    idUser: string;
    answer1Choice : boolean;
    answer2Choice : boolean;
    answer3Choice : boolean;
  }
  