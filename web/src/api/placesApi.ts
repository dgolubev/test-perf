import { Place } from '../type/Place';

const PlacesApi = (): {
  getList: (
    searchFor: string | undefined,
    orderBy: string | undefined,
  ) => Promise<Place[]>,

  getThumbnail: (name: string) => Promise<string | undefined>,
  save: (place: Place) => Promise<Place>,
  destroy: (id: string) => Promise<void>,
} => {
  const apiUrl = process.env.REACT_APP_API_URL + '/places';

  /**
   * get list of images
   */
  const getList = async (
    searchFor: string | undefined,
    orderBy: string | undefined,
  ): Promise<Array<Place>> => {
    console.log('A10: searchFor: ', searchFor);
    console.log('A10: orderBy: ', orderBy);

    const searchParams = new URLSearchParams();
    if (searchFor) {
      searchParams.append('search', searchFor);
    }

    if (orderBy) {
      searchParams.append('orderBy', orderBy);
    }

    const url = apiUrl + '?' + searchParams.toString();
    console.log('A20:url: ', url);

    const res = await fetch(
      url,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      } as RequestInit);

    const result = await res.json() as unknown as {
      data?: Place[],
    };

    return res.status === 200 ? result.data! : [];
  }

  /**
   * Get thumbnail image
   * @param name search for name
   */
  const getThumbnail = async (name: string): Promise<string | undefined> => {
    const url = apiUrl + '/thumbnail/' + encodeURI(name);

    const res = await fetch(
      url,
      {
        method: 'GET',
      } as RequestInit);

    return res.status === 200 ? (await res.json()).data! : undefined;
  };

  /**
   * Save place
   * @param place
   */
  const save = async (place: Place): Promise<Place> => {
    if (place.id) {
      const res = await fetch(
        apiUrl + '/' + place.id,
        {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(place),
        } as RequestInit);

      console.log('Q90: res: ', res);

      if (res.status === 422) {
        const errors = await res.json();

        throw new Error(errors.join(', '));
      }

      // return place;
      return (await res.json()).data;
    }

    const res = await fetch(
      apiUrl,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(place),
      } as RequestInit);

    console.log('Q95: res: ', res);

    if (res.status === 422) {
      const errors = await res.json();

      throw new Error(errors.join(', '));
    }

    return (await res.json()).data;
  };

  /**
   * Delete place
   * @param id identifier of deleted place
   */
  const destroy = async (id: string): Promise<void> => {
    if (!id) {
      return;
    }

    const res = await fetch(
      apiUrl + '/' + id,
      {
        method: 'DELETE',
      } as RequestInit);

    if (res.status === 202 || res.status === 404) {
      return;
    }

    //  not deleted
    const errors = await res.json();
    throw new Error(errors.join(', '));
  };

  return {
    getList,
    getThumbnail,
    save,
    destroy,
  };
}

export default PlacesApi(
);

