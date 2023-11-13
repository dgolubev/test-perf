import React, {
  JSX,
  useEffect,
  useState,
} from 'react';
import placesApi from '../../api/placesApi';
import { Place } from '../../type/Place';
import PlaceForm, { PlaceFormProps } from './component/PlaceForm';
import PlacesList from './component/PlacesList';

export interface FetchPlacesParams {
  search?: string,
  orderBy?: string,
}

const PlacesPage = (): JSX.Element => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [fetchParams, setFetchParams] = useState<FetchPlacesParams>({});

  useEffect(() => {
    fetchPlaces(fetchParams);
  }, [
    fetchParams,
  ]);

  /**
   * Fetch places data from api
   * @param params Fetch places parameters
   */
  async function fetchPlaces(
    params: FetchPlacesParams,
  ) {
    const res = await placesApi.getList(params.search, params.orderBy);

    if (!res) {
      return;
    }

    setPlaces(res);
  }

  const updateList = (places: Place[]) => {
    setPlaces([...places]);
  }

  const addToList = (place: Place) => {
    setPlaces([...places, place]);
  }


  const updateFetchParams = (params: FetchPlacesParams) => {
    setFetchParams({
      ...fetchParams,
      ...params,
    });
  }

  const renderForm = () => {
    return PlaceForm({
      place: {},
      save: async (place: Place) => {
        try {
          addToList(await placesApi.save(place));
        } catch (e: any) {
          return e.message;
        }
      },
    } as PlaceFormProps);
  }

  return (
    <>
      <h1>Places Page</h1>

      <hr/>
      <h3>Add/Edit place:</h3>
      {renderForm()}

      <hr/>
      <h3>List of places:</h3>
      <PlacesList
        places={places}
        updateList={updateList}
        updateFetchParams={updateFetchParams}
      />
    </>
  );
}

async function loader() {
  return null;
}

export {
  PlacesPage as component,
  loader,
};
