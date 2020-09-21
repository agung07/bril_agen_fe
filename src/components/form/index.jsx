import React, { Component } from 'react';
import { Input, Row, Col } from 'reactstrap';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class FormCustom extends Component{
  constructor(props) {
    super(props);

  }

  render() {
    const { props } = this;
    let Componentr = <></>
    switch (props?.type) {
      case 'input':
        Componentr = (
          <>
          <Row className="pt-2 pb-2">
            { props.label && <Col lg={3}><label className="field__label">{props.label}</label></Col> }
            <Col lg={9}>
                <Input
                style={{ backgroundColor: props?.isDisable ? '#E4E7EA' : '#fff'  }}
                onChange={(e) =>{if(props.onChange) props.onChange(props.name, e.target.value, props?.type, props.inputType)}}
                value={props.value}
                type={props.inputType !== 'auto_complete' ? props.inputType: 'text'}
                placeholder={props.placeholder || ''}
                onBlur={() => {if(props.onBlur) props.onBlur(props.name, props.type, props.inputType)}}
                disabled={props?.isDisable}
                />
                {props.error &&  <p className="err-msg">{props.error}</p>}

            </Col>
          </Row>
          </>
        )
        break;
      case 'date':
        Componentr = (
          <>
          <Row className="pt-2 pb-2">
            { props.label && <Col lg={3}><label className="field__label">{props.label}</label></Col> }
            <Col lg={9}>
                <DatePicker 
                    selected={props.value} 
                    onChange={(v) =>{if(props.onChange) props.onChange(props.name, v, props?.type, props.inputType)}} 
                    disabled={props?.isDisable}
                />
                {props.error &&  <p className="err-msg">{props.error}</p>}

            </Col>
          </Row>
          </>
        )
        break;
      case 'select':
        Componentr = (
          <>
          <Row className="pt-2 pb-2">
            { props.label && <Col lg={3}><label className="field__label">{props.label}</label></Col> }
            <Col lg={9}>
                <Select
                    style={{ backgroundColor: props?.isDisable ? '#E4E7EA' : '#fff'  }}
                    onChange={(v) =>{if(props.onChange) props.onChange(props.name, v, props?.type, props.inputType)}}
                    options={props.options}
                    value={props?.value}
                    type={props.inputType !== 'auto_complete' ? props.inputType: 'text'}
                    placeholder={props.placeholder || ''}
                    onBlur={() => {if(props.onBlur) props.onBlur(props.name, props.type, props.inputType)}}
                    isDisabled={props?.isDisable}
                />
                {props.error &&  <p className="err-msg">{props.error}</p>}

            </Col>
          </Row>
          </>
        )
        break;
      case 'check_box':
        Componentr = (
            <Row className="pt-2 pb-2">
              { props.label && <Col lg={3}><label className="field__label">{props.label}</label></Col> }
                <Col lg={9}>
                    <Input
                        type={'checkbox'}
                        onClick={() => props.onChange(props.name, !props.value, props?.type, props.inputType)}
                        checked={props.value}
                    />
                    
                    {props.error &&  <p className="err-msg">{props.error}</p>}
                </Col>
            </Row>
        )
        break;
      default:
        break;
    }
    return Componentr

  }
}

export default FormCustom;