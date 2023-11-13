import { Place } from '../../../type/Place';
import PlaceListItem from './PlaceListItem';
import React from 'react';
import { FetchPlacesParams } from '../PlacesPage';

// @ts-ignore
const PlacesList = (
  {
    places,
    updateList,
    updateFetchParams,
  }: {
    places: Place[],
    updateList: (places: Place[]) => void,
    updateFetchParams: (params: FetchPlacesParams) => void,
  }) => {
  /**
   * Filter list by search text. Start searching when length is more then 2
   * @param ev Event
   */
  const handleListSearch = (ev: React.FormEvent<HTMLInputElement>): void => {
    ev.preventDefault();

    const text = ev.currentTarget.value;

    updateFetchParams({
      search: text.length >= 3 ? text : undefined,
    });
  }

  /**
   * Order list by selected order text
   * @param ev Event
   */
  const handleListOrderBy = (ev: React.MouseEvent<HTMLAnchorElement>): void => {
    ev.preventDefault();

    updateFetchParams({
      orderBy: ev.currentTarget.dataset.orderby,
    });
  }

  /**
   * Remove item from list
   * @param item Item object
   */
  const updateItem = (item: Place) => {
    const idx = places.findIndex((place: Place) => place.id === item.id);

    places[idx] = item;

    updateList(places);
  }

  /**
   * Remove item from list
   * @param id
   */
  const deleteItem = (id: string) => {
    updateList(places.filter((place: Place) => place.id !== id));
  }

  if (Object.keys(places).length === 0) {
    return <p>no places</p>;
  }

  const tBody =
    Object.values(places)
      .map((item: Place) => (<PlaceListItem
          key={item.id}
          item={item}
          updateItem={updateItem}
          deleteItem={deleteItem}
        />
      ));

  return (
    <>
      <div>
        <label>Search:</label>
        <input name="search" onChange={handleListSearch}/>
      </div>

      <table className="images-list">
        <thead>
        <tr>
          <th>Place (
            <a href="" data-orderby="name|0" onClick={handleListOrderBy}>&uarr;</a>
            |
            <a href="" data-orderby="name|1" onClick={handleListOrderBy}>&darr;</a>
            )
          </th>
          <th>image</th>
        </tr>
        </thead>
        <tbody>{tBody}</tbody>
      </table>
    </>
  );
}

export default PlacesList;
