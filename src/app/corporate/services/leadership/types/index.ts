export interface ProgramBody {
  title: string;
  description: string;
}

export interface FlagshipProgram {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  body: ProgramBody[];
  benefits?: string[];
}
