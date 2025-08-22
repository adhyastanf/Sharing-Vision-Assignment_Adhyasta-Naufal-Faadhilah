export interface IQuestion {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  regency: string;
  questionType: 'multiple-choice' | 'essay';
  isPublic: boolean;
  tags?: string[];
  createdAt: Date;
  // Multiple choice specific
  options?: Array<{ id: string; text: string; isCorrect: boolean }>;
  // Essay specific
  wordLimit?: number;
  gradingRubric?: string;
}

