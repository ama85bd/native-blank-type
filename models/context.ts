export interface IContext {
  ids: string[];
  addFavorite: (id: any) => void;
  removeFavorite: (id: any) => void;
}
