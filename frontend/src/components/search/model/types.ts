export interface SearchableContent {
  id: string;
  title: string;
  content: string;
  tags?: string[];
}

export interface SearchResult extends SearchableContent {
  score: number;
  highlightedTitle: string;
}

export interface SearchState {
  query: string;
  results: SearchResult[];
  isOpen: boolean;
  isLoading: boolean;
  groupedResults: Record<string, SearchResult[]>;
}

export interface SearchOptions {
  minQueryLength: number;
  maxResults: number;
  fuzzySearch: boolean;
  categoryOrder: string[];
  debounceDelay: number;
}