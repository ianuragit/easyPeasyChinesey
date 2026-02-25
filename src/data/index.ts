import { VocabWord } from '@/types';
import { vocab1 } from './vocab1';
import { vocab2 } from './vocab2';
import { vocab3 } from './vocab3';
import { vocab4 } from './vocab4';
import { vocab5 } from './vocab5';

export const vocabulary: VocabWord[] = [
  ...vocab1,
  ...vocab2,
  ...vocab3,
  ...vocab4,
  ...vocab5,
].sort((a, b) => a.rank - b.rank);
