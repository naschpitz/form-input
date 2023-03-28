import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import moment from "moment"

import { getInputGroupSizeClassName, getType, onKeyPress } from "../../common/common.js"

import "./genericInput.css"

const GenericInput = props => {
  const [value, setValue] = useState(null)
  const [hasFocus, setHasFocus] = useState(false)

  useEffect(() => {
    if (props.isLoading || hasFocus) return

    //Will also pass for 'undefined' values.
    if (props.value == null) {
      setValue(null)
      return
    }

    if (props.type === "string") setValue(props.value)

    if (props.type === "date") {
      if (props.value) {
        try {
          setValue(moment(props.value).utc().format("YYYY-MM-DD"))
        } catch (error) {
          setValue(null)
        }
      } else setValue(null)
    }

    if (props.type === "datetime") {
      if (props.value) {
        try {
          setValue(moment(props.value).format("YYYY-MM-DDTHH:mm:ss"))
        } catch (error) {
          setValue(null)
        }
      } else setValue(null)
    }
  }, [props])

  function getValue(value) {
    return value ? value : ""
  }

  function onBlur(event) {
    const target = event.target
    const name = target.name

    setHasFocus(false)

    if (props.onEvent) props.onEvent("onBlur", name, value)
  }

  function onFocus(event) {
    const target = event.target
    const name = target.name

    setHasFocus(true)

    if (props.onEvent) props.onEvent("onFocus", name, value)
  }

  function onChange(event) {
    const target = event.target
    const name = target.name

    let newValue = target.value ? target.value : null
    setValue(newValue)

    newValue = props.type === "date" || props.type === "datetime" ? new Date(newValue) : newValue

    if (props.onEvent) props.onEvent("onChange", name, newValue)
  }

  return (
    <div id="input" className={"input-group " + getInputGroupSizeClassName(props.size)}>
      <input
        name={props.name}
        disabled={props.disabled}
        value={getValue(value)}
        placeholder={props.placeholder}
        autoComplete={props.autoComplete != null ? (props.autoComplete ? "on" : "off") : "on"}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyPress={onKeyPress}
        className={"form-control"}
        type={getType(props.type)}
      />
      {props.append ? (
        <div className="input-group-append">
          <span className="input-group-text">{props.append}</span>
        </div>
      ) : null}
    </div>
  )
}

GenericInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  autoComplete: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  append: PropTypes.string,
  isLoading: PropTypes.bool,
  onEvent: PropTypes.func,
}

export default GenericInput
