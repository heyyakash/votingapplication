export interface candidate {
    _id: string;
    uid: Uid;
    election: string;
    votes: number;
    votersList?: (string)[] | null;
    __v: number;
  }
  export interface Uid {
    _id: string;
    email: string;
    firstname: string;
    lastname: string;
    age: number;
    gender: string;
    __v: number;
  }
  