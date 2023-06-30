import { EmbeddingContext } from 'amazon-quicksight-embedding-sdk/dist/types';
import { createContext } from 'react';

export const QuickSightEmbedContext = createContext<EmbeddingContext | null>(null);
