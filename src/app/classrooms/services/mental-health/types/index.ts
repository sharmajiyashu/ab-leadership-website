export interface ProgramBody {
  title: string;
  description: string;
}

export interface FlagshipProgram {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  body: ProgramBody[];
  learningOutcomes?: string[]; // Optional array of learning outcome strings
  image?: string; // Optional image path for the program card
}
