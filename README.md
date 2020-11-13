# @naschpitz/form-input

> A multitype form input field for React.js and Boostrap 4, can handle numeric, string, datetime, checkbox, select and textarea types.

[![NPM](https://img.shields.io/npm/v/@naschpitz/form-input.svg)](https://www.npmjs.com/package/@naschpitz/form-input) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @naschpitz/form-input
```

## Usage
App.css
```css
.container {
    margin-top: 50px;
    font-size: 14px;
}

.vertical-center {
    display: flex;
    align-items: center;
}
```


App.jsx
```jsx
import React, {useState} from 'react';
import _ from 'lodash';

import FormInput from '@naschpitz/form-input';
import '@naschpitz/form-input/dist/index.css';
import '@naschpitz/button-enhanced/dist/index.css';

import './App.css';

const App = () => {
    const [ values, setValues ] = useState({});
    const [ events, setEvents ] = useState([]);

    function onEvent(event, name, value) {
        const newValues = _.clone(values);
        newValues[name] = value;

        setValues(newValues);

        const newEvents = _.clone(events);
        newEvents.push({event: event, name: name, value: value});

        setEvents(newEvents);
    }

    const options = new Map();
    options.set('', "Select Type");
    options.set('bikes', "Merida, Cannondale, Specialized");
    options.set('cars', "Ferrari, Porsche, Lamborghini");
    options.set('planes', "Embraer, Boeing, Airbus");

    return (
        <div className="container">
            <FormInput label="Name"
                       name="name"
                       value={_.get(values, 'name')}
                       type="field"
                       subtype="string"
                       size="small"
                       labelSizes={{sm: 12, md: 6, lg: 4, xl: 3}}
                       inputSizes={{sm: 12, md: 6, lg: 8, xl: 9}}
                       onEvent={onEvent}
            />

            <FormInput label="Type"
                       name="type"
                       value={_.get(values, 'type')}
                       type="dropdown"
                       subtype="string"
                       size="small"
                       options={options}
                       search={true}
                       labelSizes={{sm: 12, md: 6, lg: 4, xl: 3}}
                       inputSizes={{sm: 12, md: 6, lg: 8, xl: 9}}
                       onEvent={onEvent}
            />

            <FormInput label="Verified"
                       name="verified"
                       value={_.get(values, 'verified')}
                       type="dropdown"
                       subtype="boolean"
                       size="small"
                       options={[{ value: "", text: "-- Select -- " }, { value: false, text: "False" }, { value: true, text: "True " }]}
                       labelSizes={{sm: 12, md: 6, lg: 4, xl: 3}}
                       inputSizes={{sm: 12, md: 6, lg: 8, xl: 9}}
                       onEvent={onEvent}
            />

            <FormInput label="Money"
                       name="money"
                       value={_.get(values, "money")}
                       type="field"
                       subtype="number"
                       thousandSeparator={true}
                       decimalScale={0}
                       prepend="$"
                       append=",00"
                       allowNegative={false}
                       size="small"
                       labelSizes={{sm: 12, md: 6, lg: 4, xl: 3}}
                       inputSizes={{sm: 12, md: 6, lg: 8, xl: 9}}
                       onEvent={onEvent}
            />

            <FormInput label="Small Value"
                       name="smallValue"
                       value={_.get(values, "smallValue")}
                       type="field"
                       subtype="number"
                       thousandSeparator={true}
                       allowNegative={false}
                       size="small"
                       labelSizes={{sm: 12, md: 6, lg: 4, xl: 3}}
                       inputSizes={{sm: 12, md: 6, lg: 8, xl: 9}}
                       onEvent={onEvent}
            />

            <FormInput label="Date"
                       name="date"
                       value={_.get(values, "date")}
                       type="field"
                       subtype="date"
                       thousandSeparator={true}
                       allowNegative={false}
                       size="small"
                       labelSizes={{sm: 12, md: 6, lg: 4, xl: 3}}
                       inputSizes={{sm: 12, md: 6, lg: 8, xl: 9}}
                       onEvent={onEvent}
            />

            <FormInput label="Check this"
                       name="check"
                       value={_.get(values, "check")}
                       type="checkbox"
                       size="small"
                       labelSizes={{sm: 12, md: 6, lg: 4, xl: 3}}
                       inputSizes={{sm: 12, md: 6, lg: 8, xl: 9}}
                       onEvent={onEvent}
            />

            <FormInput label="Text Area"
                       name="textarea"
                       value={_.get(values, "textarea")}
                       type="textarea"
                       size="small"
                       labelSizes={{sm: 12, md: 6, lg: 4, xl: 3}}
                       inputSizes={{sm: 12, md: 6, lg: 8, xl: 9}}
                       onEvent={onEvent}
            />

            <div style={{marginTop: 50}}>
                <h6>Events</h6>
                {events.map((event) => (<div>{JSON.stringify(event)}</div>))}
            </div>
      </div>
    );
}

export default App
```

## License

MIT © [naschpitz](https://github.com/naschpitz)
