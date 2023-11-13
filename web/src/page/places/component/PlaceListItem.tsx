import React, { useState } from 'react';
import { Place } from '../../../type/Place';
import placesApi from '../../../api/placesApi';

const PlaceListItem = (
  {
    item,
    updateItem,
    deleteItem,
  }: {
    item: Place,
    updateItem: (item: Place) => void,
    deleteItem: (id: string) => void,
  },
) => {
  const [isEditing, setIsEditing] = useState(false);

  /**
   * Delete item
   */
  const handleDelete = async (ev: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    ev.preventDefault();

    await placesApi.destroy(item.id);

    deleteItem(item.id)
  }

  /**
   * Filter list by search text. Start searching when length is more then 2
   * @param ev Event
   */
  const handleFindImage = async (ev: React.MouseEvent<HTMLAnchorElement>): Promise<void> => {
    ev.preventDefault();

    const thumbnailUrl = await placesApi.getThumbnail(item.name);
    if (!thumbnailUrl) {
      return;
    }

    item.thumbnail = thumbnailUrl;

    updateItem(item);
  }

  const handleEdit = () => {
    setIsEditing(true);
  }


  const EditForm = () => {
    const handleSave = async (ev: React.FormEvent<HTMLFormElement>) => {
      ev.preventDefault();

      const updatedPlace = await placesApi.save({
        ...item,
        //  @ts-ignore
        name: ev.currentTarget.elements.name.value,
      });

      setIsEditing(false);

      updateItem(updatedPlace);
    }

    return <form onSubmit={handleSave}>
      <input name="name" defaultValue={item.name}/>
      <button type="submit">save</button>
    </form>;
  }

  return <>
    <tr key={item.id}>
      <td>
        {
          isEditing
            ? <EditForm/>
            : item.name
        }
      </td>
      <td>
        {
          item.thumbnail
            ? <img src={item.thumbnail} width="100"/>
            : <a href="" onClick={handleFindImage}>find</a>
        }
      </td>
      <td>
        <button onClick={handleEdit}>edit</button>
      </td>
      <td>
        <button onClick={handleDelete}>delete</button>
      </td>
    </tr>
  </>
}

export default PlaceListItem;
