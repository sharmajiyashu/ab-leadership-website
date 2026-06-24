export interface ProgramBody {
  title: string;
  description: string;
}

export interface Program {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  body: ProgramBody[];
  image?: string;
}
