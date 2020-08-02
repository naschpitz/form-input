import React, {useState} from 'react';
import _ from 'lodash';

import FormInput from '@naschpitz/form-input';

const App = () => {
  const [ value, setValue ] = useState('');
  const [ events, setEvents ] = useState([]);

  function onEvent(event, name, value) {
    setValue(value);

    const newEvents = _.clone(events);
    newEvents.push({event: event, name: name, value: value});

    setEvents(newEvents);
  }

  return (
    <div>
      <FormInput label="My input"
                 name="myInput"
                 value={value}
                 type="field"
                 subtype="string"
                 size="small"
                 labelSizes={{sm: 12, md: 6, lg: 4, xl: 3}}
                 inputSizes={{sm: 12, md: 6, lg: 8, xl: 9}}
                 onEvent={onEvent}
      />

      <h4>Events</h4>
      {events.map((event) => (<div>{JSON.stringify(event)}</div>))}
    </div>
  );
}

export default App
