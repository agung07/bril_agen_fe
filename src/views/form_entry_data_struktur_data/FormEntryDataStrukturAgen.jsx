import React, { Component, Fragment } from 'react';
import { Button } from 'reactstrap';
import { initialState } from './constans';
import FormCustom from '../../components/form';
import {AlertModal} from '../../components';
import axios from 'axios';
import { validationList } from '../../contants';

class FormEntryDataStrukturAgen extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }


    componentDidMount = () => {
        const {setData} = this;
        this.getData()
            .then(() => setData())
    }

    getData = async () => {
        try {
            const getAgenDropdown = await  axios.get('http://localhost:8000/agen');
            
            if(getAgenDropdown.status === 200 ){ 
                const { fields } = this.state;
                this.setState({
                    fields: {
                        ...fields,
                        id_agen: {
                            ...fields['id_agen'],
                            options: getAgenDropdown.data
                        }
                    }
                })
            } else throw new Error(getAgenDropdown.data)
        } catch (error) {
            
        }
    }


    getDataAtasan = async (wilayah, level) => {
        try {
            const getAtasanAgenLevelDropdown = await  axios.get(`http://localhost:8000/atasan_agen?urutan=${level}&wilayah=${wilayah}`);

            if(getAtasanAgenLevelDropdown.status === 200) {
                const { fields } = this.state;
                this.setState({
                    fields: {
                        ...fields,
                        parent_id: {
                            ...fields['parent_id'],
                            options: getAtasanAgenLevelDropdown.data,
                            isDisable: false,
                        }
                    }
                })
            } else {

            }
        } catch (error) {
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
        } else if(name === 'id_agen'){
            this.setState({
                fields: {
                    ...fields,
                    [name] : {
                        ...fields[name],
                        value: value
                    },
                    parent_id : {
                        ...fields['parent_id'],
                        value: null
                    },
                }
            }, () =>  this.getDataAtasan(value?.wilayah, value?.level))
        } else {
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
        const validate = this.onValidation()
        if(validate.error) return;
        try {
            const createStrukturAgen = await axios.post(`http://localhost:8000/create_struktur_agen`, validate.data);

            if(createStrukturAgen.status === 200) {
                this.setState({
                    alert:{
                        show: true,
                        success: true,
                        message: createStrukturAgen.data,
                        showConfirm: true,
                        onConfirm: () => this.setState({ alert: initialState.alert }, () => this.props.history.push('/agen_level_base_on_location'))
                    }
                })
            } else throw new Error(createStrukturAgen?.data)
            
        } catch (error) {
            this.setState({
                alert:{
                    show: true,
                    error: true,
                    message: 'Data struktur agen gagal dibuat',
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
                if(fields[k].type === 'select') result.data[k] = fields[k].value?.value;
                else if(k === 'status')result.data[k] = fields[k].value ? 'A' : 'N';
                else result.data[k] = fields[k].value
            }
        })

        if(fields.berlaku_mulai.value?.getTime() >= fields.berlaku_akhir.value?.getTime()) {
            fields.berlaku_akhir.error = '*Berlaku Akhir tidak bisa sama atau sebelum Berlaku Mulai';
            result.error = true;
        }
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
        const Form = this.renderForm;
        return (
            <Fragment>
                <h2>Form Entry Data Struktur Agen</h2>
                <Form />
                <AlertModal {...this.state.alert} />
            </Fragment>
        )
    }
}

export default FormEntryDataStrukturAgen;