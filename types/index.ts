export type Note = {
    id: number;
    title: string;
    description: string;
}

export type Notes = {
  [key: string]: Note;
};
