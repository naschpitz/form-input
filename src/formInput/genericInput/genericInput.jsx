import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from "moment";

import {getInputGroupSizeClassName, getType, onKeyPress} from "../../common/common.js";

import './genericInput.css';

const GenericInput = (props) => {
    const [ value, setValue ] = useState('');
    const [ hasFocus, setHasFocus ] = useState(false);

    useEffect(() => {
        if (hasFocus)
            return;

        //Will also pass for 'undefined' values.
        if (props.value == null) {
            setValue('');
            return;
        }

        if (props.type === 'string')
            setValue(props.value);

        if (props.type === 'date') {
            if (props.value) {
                try {
                    setValue(moment(props.value).utc().format('YYYY-MM-DD'));
                }

                catch (error) { /* Do nothing. */ }
            }
        }

        if (props.type === 'datetime') {
            if (props.value) {
                try {
                    setValue(moment(props.value).format('YYYY-MM-DDTHH:mm:ss'));
                }

                catch (error) { /* Do nothing. */ }
            }
        }
    }, [props.type, props.value]);

    function onBlur(event) {
        const target = event.target;
        const name = target.name;

        if (props.onEvent)
            props.onEvent('onBlur', name, value);

        setHasFocus(false);
    }

    function onFocus() {
        const target = event.target;
        const name = target.name;

        if (props.onEvent)
            props.onEvent('onFocus', name);

        setHasFocus(true);
    }

    function onChange(event) {
        const target = event.target;
        const name = target.name;

        let newValue = target.value;
        setValue(newValue);

        newValue = (props.type === 'date' || props.type === 'datetime') ? new Date(newValue) : newValue;

        if (props.onEvent)
            props.onEvent('onChange', name, newValue);
    }

    return (
        <div id="input" className={"input-group " + getInputGroupSizeClassName(props.size)}>
            <input name={props.name}
                   disabled={props.disabled}
                   value={value}
                   placeholder={props.placeholder}
                   autoComplete={props.autoComplete != null ? (props.autoComplete ? "on" : "off") : "on"}
                   onChange={onChange}
                   onFocus={onFocus}
                   onBlur={onBlur}
                   onKeyPress={onKeyPress}
                   className={"form-control"}
                   type={getType(props.type)}
            />
            {props.append ?
                <div className="input-group-append">
                    <span className="input-group-text">{props.append}</span>
                </div> : null
            }
        </div>
    );
}

GenericInput.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    autoComplete: PropTypes.bool,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date)
    ]),
    append: PropTypes.string,
    onEvent: PropTypes.func
}

export default GenericInput;
