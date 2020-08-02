import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {getInputSizeClassName} from "../../common/common.js";

import './checkbox.css';

const Checkbox = (props) => {
    const [ value, setValue ] = useState(false);
    const [ hasFocus, setHasFocus ] = useState(false);

    useEffect(() => {
        if (hasFocus)
            return;

        setValue(props.value);
    }, [props.value]);

    function onBlur(event) {
        setHasFocus(false);
    }

    function onChange(event) {
        const target = event.target;
        const name = target.name;
        const newValue = target.checked;

        setValue(newValue);

        if (props.onEvent)
            props.onEvent('onChange', name, newValue);
    }

    function onFocus() {
        setHasFocus(true);
    }

    return (
        <div id="checkbox">
            <input name={props.name}
                   disabled={props.disabled}
                   checked={value}
                   onChange={onChange}
                   onBlur={onBlur}
                   onFocus={onFocus}
                   type="checkbox"
                   className={"form-control form-check-input " + getInputSizeClassName(props.size)}
            />
        </div>
    )
}

Checkbox.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.bool,
    disabled: PropTypes.bool,
    size: PropTypes.string,
    onEvent: PropTypes.func,
}

export default Checkbox;
