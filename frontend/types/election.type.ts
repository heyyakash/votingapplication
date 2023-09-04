export interface Election {
    _id: string;
    electionName: string;
    electionTopic: string;
    electionDescription: string;
    createdBy: string;
    candidates?: (null)[] | null;
    votersList?: (string)[] | null;
    endDate: string;
    __v: number;
  }
  