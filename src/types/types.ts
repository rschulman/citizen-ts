export type CommentModel = {
    id: number;
    title: string;
    author: string;
    content: string;
    agreeq: number;
    thoughtfulness: [number];
}

export enum EmitType {
    Sentiment = "Sentiment",
    Disagree = "Disagree",
    CommentContent = "CommentContent"
}

export type ModalReturn = {
    emit_type: EmitType;
    payload: any;
}
