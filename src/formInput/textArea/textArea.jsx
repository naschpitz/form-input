import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './textArea.css';

const TextArea = (props) => {
    const [ value, setValue ] = useState(null);
    const [ hasFocus, setHasFocus ] = useState(false);

    useEffect(() => {
        if (props.isLoading)
            return;

        if (props.value == null) {
            setValue(null);
            return;
        }

        setValue(props.value);
    }, [props]);

    function getValue(value) {
        return value ? value : "";
    }

    function onBlur(event) {
        const target = event.target;
        const name = target.name;

        setHasFocus(false);

        if (props.onEvent)
            props.onEvent('onBlur', name, value);
    }

    function onChange(event) {
        const target = event.target;
        const name = target.name;

        const newValue = target.value ? target.value : null;
        setValue(newValue);

        if (props.onEvent)
            props.onEvent('onChange', name, newValue);
    }

    function onFocus(event) {
        const target = event.target;
        const name = target.name;

        setHasFocus(true);

        if (props.onEvent)
            props.onEvent('onFocus', name, value);
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
                  value={getValue(value)}
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
    isLoading: PropTypes.bool,
    onEvent: PropTypes.func
}

export default TextArea;
