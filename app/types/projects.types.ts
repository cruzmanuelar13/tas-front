

export interface AttachmentProject {
  description: string;
  id: number;
  url: string;
  filename: string;
}

export interface Contribution {
  amount: number;
  createdAt: string;
  user: UserContribution;
}

export interface UserContribution {
  name: string;
}

export interface TierProject {
  id: number;
  amount: number;
  benefit: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  domain: string | null;
  resume: string;
  allowFree: boolean;
  tiers: TierProject[];

  complexity: 'LOW' | 'MEDIUM' | 'HIGH';

  contributions: Contribution[];

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
  attachments: AttachmentProject[]
}