export interface QuizzQuestion {
    id: number;
    question : string;
    difficulty : string;
    level : string;
    answer1 : string;
    answer2 : string;
    answer3 : string;
  }

export interface QuizzQuestionFull extends QuizzQuestion{
  sheetReference : string;
  explaination :string;
    answer1IsOk : boolean;
    answer2IsOk : boolean;
    answer3IsOk : boolean;
  }
  
  