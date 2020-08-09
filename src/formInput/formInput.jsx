import React, { Component } from 'react';
import _ from 'lodash';

import ButtonEnhanced from '@naschpitz/button-enhanced';
import '@naschpitz/button-enhanced/dist/index.css';

import Checkbox from "./checkbox/checkbox.jsx";
import GenericInput from "./genericInput/genericInput.jsx";
import NumberInput from "./numberInput/numberInput.jsx";
import SearchSelect from "./searchSelect/searchSelect.jsx";
import TextArea from "./textArea/textArea.jsx";

import {getSizeClassName} from "../common/common.js";

import './formInput.css';

export default class FormInput extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.renderInput = this.renderInput.bind(this);
    }

    onClick() {
        if (this.props.onEvent)
            this.props.onEvent('onClick', this.props.name, this.props.value);
    }

    renderInput() {
        const props = _.cloneDeep(this.props);
        props.type = props.subtype;

        if (this.props.type === 'field') {
            if (this.props.subtype === 'number' || this.props.subtype === 'percent') {
                return (<NumberInput {...props}/>);
            }

            else {
                return (<GenericInput {...props}/>);
            }
        }

        if (this.props.type === 'dropdown') {
            return (<SearchSelect {...props}/>);
        }

        if (this.props.type === 'checkbox') {
            return (<Checkbox {...props}/>);
        }

        if (this.props.type === 'textarea') {
            return (<TextArea {...props}/>);
        }

        if (this.props.type === 'button') {
            return (
                <div className="text-center">
                    <ButtonEnhanced buttonOptions={{regularText: this.props.buttonLabel,
                                                    className: this.props.className,
                                                    type: "button",
                                                    onClick: this.onClick}}
                    />
                </div>
            );
        }
    }

    render() {
        return (
            <div className="form-group" id="formInput">
                {this.props.type !== 'separator' ?
                    this.props.labelPos === 'top' ?
                        <div>
                            <div className="row vertical-center">
                                <div className={getSizeClassName(this.props.labelSizes) + " text-center"}>
                                    <span id="title" htmlFor={this.props.name}>{this.props.label}</span>
                                </div>
                            </div>

                            <div className={getSizeClassName(this.props.inputSizes)}>
                                {this.props.children ?
                                    this.props.children :
                                    this.renderInput()
                                }
                            </div>
                        </div>
                        :
                        <div className="row vertical-center">
                            {this.props.label ?
                                <div className={getSizeClassName(this.props.labelSizes)}>
                                    <span id="title" htmlFor={this.props.name}>{this.props.label}:</span>
                                </div> : null
                            }

                            <div className={getSizeClassName(this.props.inputSizes)}>
                                {this.props.children ?
                                    this.props.children :
                                    this.renderInput()
                                }
                            </div>
                        </div>
                    :
                    <hr/>
                }
            </div>
        );
    }
}
