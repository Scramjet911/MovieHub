import type { StackScreenProps } from '@react-navigation/stack';

export type ApplicationStackParamList = {
  MovieCatalog: undefined;
  MovieDetails: { id: string };
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList>;
