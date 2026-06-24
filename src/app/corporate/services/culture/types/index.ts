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
  description2?: string;
  body: ProgramBody[];
  benefits: string[];
}
