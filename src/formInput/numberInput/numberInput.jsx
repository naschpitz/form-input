import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {getInputGroupSizeClassName, getType, onKeyPress} from "../../common/common.js";
import NumberFormat from "react-number-format";
import sToD from 'scientific-to-decimal';

import './numberInput.css';

const NumberInput = (props) => {
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

        let newValue = props.value;

        newValue = (newValue || newValue === 0) ? Number(newValue) : null;

        if (newValue || newValue === 0) {
            if (props.type === 'percent' && (newValue || newValue === 0))
                newValue *= 100;

            if (newValue !== Infinity && newValue !== -Infinity) {
                if (props.decimalScale)
                    newValue = Math.abs(newValue) < 10 ** -props.decimalScale ? 0 : newValue;
            }
        }

        setValue(newValue);
    }, [props.type, props.value, hasFocus]);

    function getStyle() {
        const style = {};

        if (props.align)
            style.textAlign = props.align;

        else
            style.textAlign = 'right';

        return style;
    }

    function getDecimalSeparator() {
        //fallback
        let decSep = ".";

        try {
            // this works in FF, Chrome, IE, Safari and Opera
            let sep = parseFloat(3/2).toLocaleString().substring(1,2);

            if (sep === '.' || sep === ',') {
                decSep = sep;
            }
        }

        catch(e) {}

        return decSep;
    };

    function getThousandSeparator() {
        switch (getDecimalSeparator()) {
            case '.':
              return ',';

            case ',':
              return '.';
        }
    };

    function getValue() {
        return (value || value === 0) ? sToD(value) : '';
    }

    function onBlur(event) {
        const target = event.target;
        const name = target.name;
        let   newValue = value;

        newValue = (newValue || newValue === 0) ? Number(newValue) : null;

        if (props.positiveOnly && newValue)
            newValue = Math.abs(newValue);

        if (props.negativeOnly && newValue)
            newValue = - Math.abs(newValue);

        if (props.subtype === 'percent' && (newValue || newValue === 0))
            newValue /= 100;

        setHasFocus(false);

        if (props.onEvent)
            props.onEvent('onBlur', name, newValue);
    }

    function onChange(values) {
        const name = props.name;
        let newValue = values.floatValue;

        // This method called from NumberFormat has a peculiar behaviour: it will be triggered even when prop changed.
        // So, props.onEvent() was being called even if the value hasn't changed at all.
        // A check must be made to be sure that the value has really changed thus avoiding false prop.onEvent() calls.
        const changed = newValue !== value;

        setValue(newValue);

        if (props.type === 'percent' && (newValue || newValue === 0))
            newValue /= 100;

        if (props.positiveOnly)
            newValue = Math.abs(newValue);

        if (props.negativeOnly)
            newValue = - Math.abs(newValue);

        if (props.onEvent && changed)
            props.onEvent('onChange', name, newValue);
    }

    function onFocus(event) {
        const target = event.target;
        const name = target.name;

        setHasFocus(true);

        if (props.onEvent)
            props.onEvent('onFocus', name);
    }

    return (
        <div className={"input-group " + getInputGroupSizeClassName(props.size)}>
            {props.prepend ?
                <div className="input-group-prepend">
                    <span className="input-group-text">{props.prepend}</span>
                </div> : null
            }
            <NumberFormat name={props.name}
                          disabled={props.disabled}
                          value={getValue()}
                          placeholder={props.placeholder}
                          onValueChange={onChange}
                          onFocus={onFocus}
                          onBlur={onBlur}
                          onKeyPress={onKeyPress}
                          className={"form-control"}
                          allowNegative={props.allowNegative}
                          thousandSeparator={props.thousandSeparator ? getThousandSeparator() : undefined}
                          decimalSeparator={getDecimalSeparator()}
                          decimalScale={props.decimalScale}
                          autoComplete={props.autoComplete != null ? (props.autoComplete ? "on" : "off") : "on"}
                          fixedDecimalScale={true}
                          isNumericString={true}
                          format={getType(props.type) === "text" ? (val) => (val) : undefined}
                          style={getStyle()}
            />
            {props.append ?
                <div className="input-group-append">
                    <span className="input-group-text">{props.append}</span>
                </div> : null
            }
        </div>
    );
}

NumberInput.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    autoComplete: PropTypes.bool,
    value: PropTypes.number,
    align: PropTypes.string,
    decimalScale: PropTypes.number,
    allowNegative: PropTypes.bool,
    thousandSeparator: PropTypes.bool,
    positiveOnly: PropTypes.bool,
    negativeOnly: PropTypes.bool,
    placeholder: PropTypes.string,
    append: PropTypes.string,
    onEvent: PropTypes.func
}

export default NumberInput;
