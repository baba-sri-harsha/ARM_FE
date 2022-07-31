import { CategoryVO } from './category-vo';

export interface ContractDetails {
  productionName: string;
  contractNo: string;
  projectName: string;
  talentName: string;
  contractDate?: Date;
  categories?: CategoryVO[];
}
