import React, { Component, Fragment } from 'react';
import { Input, Row, Col, Button } from 'reactstrap';
import Select from 'react-select';
import axios from 'axios';
import { maxNoLisensi, initialState, forms } from './constans';
import {AlertModal} from '../../components';
import { validationList } from '../../contants';
import FormCustom from '../../components/form'
import './FormEntryDataAgen.css'

class FormEntryDataAgen extends Component {
    constructor(props) {
        super(props);
        this.state = initialState 
        
    }

    componentDidMount = () => {
        const {setData} = this;
        this.getData()
            .then(() => setData())
    }

    getData = async () => {
        try {
            const { fields } = this.state
            const agenLevelDropdown = await  axios.get('http://localhost:8000/agen_lavel');
             const daftarWilayah =  await  axios.get('https://dev.farizdotid.com/api/daerahindonesia/provinsi')
            if(agenLevelDropdown.status === 200) {
                const wilayahKerjaOption  = daftarWilayah.data.provinsi.map((d) => ({
                    value: d.id,
                    label: d.nama
                }));
                this.setState({ 
                    fields: {
                        ...fields,
                        id_agen_level: {
                            ...fields['id_agen_level'],
                            options: agenLevelDropdown.data
                        },
                        wilayah_kerja: {
                            ...fields['wilayah_kerja'],
                            options: wilayahKerjaOption
                        },
                    }
                })
            } else {

            }
        } catch (error) {
            console.log("error: ", error)
            
        }
    }

    setData = () => {
        let { fields } = this.state;
        for (const key in fields) {
            fields[key] = {
              ...fields[key],
              onChange: this.onChange,
            }
        }
        this.setState({fields})
    }


    onChange = async (name, value, type, inputType) => {
        const { fields } = this.state;
        if (type === 'input') {
            if (inputType === 'text') {
            this.setState({
            fields: {
                ...fields,
                [name]: {
                ...fields[name],
                value: value,
                }
            }
            })
            } else if (inputType === 'number') {
                const regexNumber = /^\d+(\.\d{1,2})?$/;
                if (value) {
                if (regexNumber.test(value)) {
                    this.setState({
                    fields: {
                        ...fields,
                        [name]: {
                        ...fields[name],
                        value: value,
                        }
                    }
                    })
                }
                } else {
                    this.setState({
                        fields: {
                        ...fields,
                        [name]: {
                            ...fields[name],
                            value: '',
                        }
                        }
                    })
                }
            }
        }  else {
            this.setState({
                fields: {
                    ...fields,
                    [name] : {
                        ...fields[name],
                        value: value
                    }
                }
            })

        }
    }

    onSubmit = async () => {
        const validate = this.onValidation();
        console.log("validate: ", validate)
        if(validate.error) return;
        try {
            const create_agen = await  axios.post('http://localhost:8000/create_agen', validate.data);
            console.log("agenLevelDropdown: ", create_agen)
            if(create_agen.status === 200) {
                this.setState({
                    alert:{
                        show: true,
                        success: true,
                        message: create_agen.data,
                        showConfirm: true,
                        onConfirm: () => this.setState({ alert: initialState.alert }, () => this.props.history.push('/agen_level_base_on_location'))
                    }
                })
            } else throw new Error(create_agen.data)
            
        } catch (error) {
            console.log("error: ", error)
            this.setState({
                alert:{
                    show: true,
                    error: true,
                    message: "Data agen gagal di simpan, no lisensi atau wilayah kerja dan level agen sudah digunakan",
                    showConfirm: true,
                    onConfirm: () => this.setState({ alert: initialState.alert })
                }
            })
            
        }
    }

    onValidation = () => {
        let { fields } = this.state;
        let result = {
            error: false,
            data: {}
        }
        Object.keys(fields).forEach((k) => {
            if(fields[k].validation?.includes(validationList.required)) {
                if(!fields[k].value) {
                    result.error = true;
                    fields[k].error = `*${fields[k].label} can not be null`;
                }
            }
            if(!result.error) {
                if(fields[k].type === 'select') {
                    if(k === 'wilayah_kerja')  result.data[k] = fields[k].value?.label;
                    else result.data[k] = fields[k].value?.value;
                } 
                else if(k === 'status')result.data[k] = fields[k].value ? 1 : 2;
                else result.data[k] = fields[k].value
            }
        })
        if(result.error) this.setState({fields});
        return result;
    }

    renderForm = () => {
        const { fields} = this.state;
        return (
            <>
                <>
                    {
                        Object.keys(fields).map((k) => <FormCustom key={k.name} {...fields[k]} />)
                    }
                </>
                <Button onClick={this.onSubmit} color="primary">Save</Button>
            </>
        )
    }

    render() {
        // console.log("this.state: ", this.state)
        const Form = this.renderForm;
        return(
            <div className="wrapper-form-entry-data-agen">
                <h2>Form Entry Data Agen</h2>
                <Form />
                <AlertModal {...this.state.alert} />
            </div>
        )
    }
}

export default FormEntryDataAgen;