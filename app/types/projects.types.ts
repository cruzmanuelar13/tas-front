export interface Project {
  id: number;
  title: string;
  description: string;
  domain: string | null;

  complexity: 'LOW' | 'MEDIUM' | 'HIGH';

  teamSize: number;
  raised: number;
  deadLine: string;
  durationMonths: number;
  budget: number;

  studentGpaAvg: number | null;
  supervisorExperience: number;

  hasDataset: boolean | null;
  priorSimilarProjects: number;

  milestonesCompleted: number | null;
  successLabel: boolean | null;

  hasPrototype: boolean;
  hasTechnicalDoc: boolean;

  objectiveClarity: number;

  hasMarketStudy: boolean;
  hasMonetizationModel: boolean;

  sector: number;

  hasDirectCompetitors: boolean;

  successScore: number | null;

  ownerId: number;

  createdAt: string;
  updatedAt: string;

  isFavorite?: boolean;
}