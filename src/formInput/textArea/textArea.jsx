import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './textArea.css';

const TextArea = (props) => {
    const [ value, setValue ] = useState(null);
    const [ hasFocus, setHasFocus ] = useState(false);

    useEffect(() => {
        if (hasFocus)
            return;

        setValue(props.value);
    }, [props.value]);

    function onBlur(event) {
        const target = event.target;
        const name = target.name;
        const newValue = target.value;

        setValue(newValue);

        if (props.onEvent)
            props.onEvent('onBlur', name, newValue);

        setHasFocus(false);
    }

    function onChange(event) {
        const target = event.target;
        const name = target.name;
        const newValue = target.value;

        setValue(newValue);

        if (props.onEvent)
            props.onEvent('onChange', name, newValue);
    }

    function onFocus() {
        setHasFocus(true);
    }

    return (
        <textarea name={props.name}
                  disabled={props.disabled}
                  onBlur={onBlur}
                  onFocus={onFocus}
                  onChange={onChange}
                  rows={props.rows}
                  maxLength={props.maxLength}
                  style={{width: '100%'}}
                  defaultValue={!props.readOnly ? value : undefined}
                  value={props.readOnly ? value : undefined}
                  placeholder={props.placeholder}
                  readOnly={props.readOnly}
        />
    );
}

TextArea.propTypes = {
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    rows: PropTypes.number.isRequired,
    maxLength: PropTypes.number.isRequired,
    readOnly: PropTypes.bool,
    value: PropTypes.string,
    placeHolder: PropTypes.string,
    onEvent: PropTypes.func
}

export default TextArea;