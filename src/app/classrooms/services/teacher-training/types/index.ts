export interface ProgramBody {
  title: string;
  description: string;
}

export interface TeacherTrainingProgram {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  body: ProgramBody[];
  learningOutcomes: string[]; // Required - all programs have learning outcomes
  image?: string; // Optional image path for the program card
}
