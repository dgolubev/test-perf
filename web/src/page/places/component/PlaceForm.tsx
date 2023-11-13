import React, {
  JSX,
  useState,
} from 'react';
import { Place } from '../../../type/Place';

export type PlaceFormProps = {
  place: Place,
  save: (place: Place) => Promise<void>,
}

const PlaceForm = (props:PlaceFormProps):JSX.Element => {
  const [fields, setPlace] = useState({
    name: props.place ? props.place.name : '',
  });

  const [errorMsg, setErrorMsg] = useState('');

  const handleOnSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    props.save({
      ...props.place,
      // @ts-ignore
      name:  ev.currentTarget.elements.name.value,
    })
  };

  return (
    <div className="main-form">
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <form onSubmit={handleOnSubmit}>
        <label>
          name:
          <input name="name" value={fields.name} />
        </label>

        <button type="submit"> Submit</button>
      </form>
    </div>
  );
};

export default PlaceForm;
