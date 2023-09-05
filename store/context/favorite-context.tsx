import { createContext, useState } from 'react';

export const FavoritesContext: any = createContext({
  ids: [],
  addFavorite: (id: any) => {},
  removeFavorite: (id: any) => {},
});

function FavoritesContextProvider({ children }: any) {
  const [favoriteMealIds, setFavoriteMealIds] = useState<any>([]);

  function addFavorite(id: any) {
    setFavoriteMealIds((currentFavIds: any) => [...currentFavIds, id]);
  }
  function removeFavorite(id: any) {
    setFavoriteMealIds((currentFavIds: any[]) =>
      currentFavIds.filter((mealId) => mealId !== id)
    );
  }

  const value = {
    ids: favoriteMealIds,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  };
  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContextProvider;
