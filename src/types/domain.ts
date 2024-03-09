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

export interface ICast {
  adult?: boolean;
  gender?: number;
  id?: number;
  known_for_department?: string;
  name?: string;
  original_name?: string;
  popularity?: number;
  profile_path?: string | null;
  cast_id?: number;
  character?: string;
  credit_id?: string;
  order?: number;
}

export interface IMovieDetailsResponse {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: null | {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
  };
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: { name: string }[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: { english_name: string; name: string }[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IMovieDetails extends IMovieDetailsResponse {
  casts: ICast[];
}
