export interface QuizzAnswerCreation {
    idQuestion: number;
    idUser?: string;
    answer1Choice: boolean;
    answer2Choice: boolean;
    answer3Choice: boolean;
}

export interface QuizzAnswer extends QuizzAnswerCreation {
    id: string;
    idUser: string;
}
