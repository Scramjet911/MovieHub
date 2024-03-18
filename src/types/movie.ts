export interface IMovieListItem {
  vote_count?: number;
  id?: number;
  video?: boolean;
  vote_average?: number;
  title?: string;
  popularity?: number;
  poster_path?: string;
  original_language?: string;
  original_title?: string;
  genre_ids?: number[];
  backdrop_path?: string;
  adult?: boolean;
  overview?: string;
  release_date?: string;
}

export interface IFetchMoviesResponse {
  page: number;
  results: IMovieListItem[];
}

export interface ISearchMovieParams {
  searchTerm: string;
  page: number;
}
