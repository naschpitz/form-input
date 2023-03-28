import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import _ from "lodash"

import { getInputGroupSizeClassName, getInputSizeClassName, onKeyPress } from "../../common/common.js"
import { FaSearch } from "react-icons/fa"

import "./searchSelect.css"

const SearchSelect = props => {
  const [search, setSearch] = useState(null)
  const [value, setValue] = useState(null)
  const [options, setOptions] = useState([])
  const [hasFocus, setHasFocus] = useState(false)

  useEffect(() => {
    if (props.isLoading || hasFocus) return

    if (props.value != null)
      //Will also pass for 'undefined' values.
      setValue(props.value)
    else setValue(null)

    if (props.type === "number") setValue(props.value || props.value === 0 ? Number(props.value) : null)
  }, [props])

  useEffect(() => {
    let options = getOptions()

    options = _.filter(options, option => {
      if (option[0] === "" || option[0] === props.value) return true

      const searchWords = _.split(search, " ")
      let result = true

      searchWords.forEach(word => {
        result &= _.toLower(option[1]).includes(_.toLower(word))
      })

      return result
    })

    setOptions(options)
  }, [props.value, props.options, search])

  function getOptions() {
    if (props.options instanceof Map) return Array.from(props.options)

    if (props.options instanceof Array) {
      return props.options.map(option => [option.value, option.text])
    }
  }

  function getValue(value) {
    return value != null ? value : ""
  }

  function onDropdownChange(event) {
    const target = event.target

    const name = target.name
    let value = target.value

    if (props.type === "number" || props.type === "percent") value = value || value === 0 ? Number(value) : null
    else value = value ? value : null

    setValue(value)

    if (props.onEvent) props.onEvent("onChange", name, value)
  }

  function onSearchChange(event) {
    const target = event.target
    const value = target.value

    setSearch(value)
  }

  function onFocus() {
    setHasFocus(true)
  }

  function onBlur() {
    setHasFocus(false)
  }

  function renderSelect() {
    return (
      <select
        name={props.name}
        disabled={props.disabled}
        value={getValue(value)}
        onBlur={onBlur}
        onChange={onDropdownChange}
        onFocus={onFocus}
        onKeyPress={onKeyPress}
        className={"form-control " + getInputSizeClassName(props.size)}
      >
        {options.map((option, index) => (
          <option key={index} value={option[0]}>
            {option[1]}
          </option>
        ))}
      </select>
    )
  }

  if (props.search) {
    return (
      <div className={"input-group " + getInputGroupSizeClassName(props.size)}>
        <div className="input-group-prepend">
          <div className={"input-group " + getInputGroupSizeClassName(props.size)}>
            <div className="input-group-prepend">
              <span className={"input-group-text"}>
                <FaSearch />
              </span>
            </div>
            <input className={"form-control"} onChange={onSearchChange} />
          </div>
        </div>

        {renderSelect()}
      </div>
    )
  } else return renderSelect()
}

SearchSelect.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.instanceOf(Map)]).isRequired,
  size: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  search: PropTypes.bool,
  isLoading: PropTypes.bool,
  onEvent: PropTypes.func,
}

export default SearchSelect
