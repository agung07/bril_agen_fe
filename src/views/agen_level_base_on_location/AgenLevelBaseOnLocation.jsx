import React, { Component } from 'react';
import Select from 'react-select';
import { Input, Button, Row, Table } from 'reactstrap';
import {AlertModal} from '../../components';
import axios from 'axios'
import { initialState } from './constans';
import './AgenLevelBaseOnLocation.css'

class AgenLevelBaseOnLocation extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount = () => {
        this.getData()
    }

    getData = async () => {
        try {
            const getAgenLevel = await  axios.get('http://localhost:8000/agen_level');
            const getWilayah = await axios.get('https://dev.farizdotid.com/api/daerahindonesia/provinsi')
            
            if(getAgenLevel.status === 200) {
                const wilayah = getWilayah?.data?.provinsi ?
                                getWilayah?.data?.provinsi.map((d) => ({
                                    ...d,
                                    label: d?.nama,
                                    value: d.id,
                                })) : [];
                this.setState({list: getAgenLevel.data, wilayah})
            } else throw new Error(getAgenLevel?.data)
        } catch (error) {
            this.setState({
                alert:{
                    show: true,
                    error: true,
                    message: 'Oops! something wrong while fetching data',
                    showConfirm: true,
                    confirmBtnText: 'Retry',
                    onConfirm: () => this.setState({ alert: initialState.alert }, this.getData),
                    showCancel: true,
                    onCancel: () => this.setState({ alert: initialState.alert })
                }
            })
        }
    }

    onChange = (value, name) =>  this.setState({ filter: {...this.state.filter, [name]: value }})

    onFilter = async () => {
        try {
            const { wilayah, status } = this.state.filter;
            let query = ''

            if(wilayah?.label) query = `?wilayah_kerja=${wilayah?.label}&status=${status ? 1 : 0}`;
            else query = `?status=${status}`;
            
            const getAgenLevel = await  axios.get(`http://localhost:8000/agen_level${query}`);
            
            if(getAgenLevel.status === 200) {
                this.setState({list: getAgenLevel.data})
            } else throw new Error(getAgenLevel?.data)
        } catch (error) {
            this.setState({
                alert:{
                    show: true,
                    error: true,
                    message: 'Oops! something wrong while fetching data',
                    showConfirm: true,
                    confirmBtnText: 'Retry',
                    onConfirm: () => this.setState({ alert: initialState.alert }, this.onFilter),
                    showCancel: true,
                    onCancel: () => this.setState({ alert: initialState.alert })
                }
            })
            
        }

    }

    onResetFilter = () => {
        this.setState({
            filter: initialState.filter
        },this.getData)
    }

    renderFilter = () => {
        console.log("this.state: ", this.state)
        return (
            <div className="row col-lg-12">
                <div className="row col-lg-8 mt-3">
                    <span className="col-lg-4">Pilih Wilayah Kerja: </span>
                    <Select 
                        value={this.state.filter.wilayah}  
                        options={this.state.wilayah} 
                        className="col-lg-8 " 
                        onChange={(d) => this.onChange(d, 'wilayah')}
                    />
                </div>
                <div className="row col-lg-4 mt-3 justify-content-center">
                    <span className="ml-3">status: </span> 
                    <input  
                        checked={this.state.filter.status} 
                        className="mt-2 ml-2" 
                        type={'checkbox'} 
                        onClick={() => this.onChange(!this.state.filter.status, 'status')}
                    />
                    <div className="d-flex">
                        <Button onClick={this.onFilter} className="ml-3" color={'primary'}>View</Button>
                        <Button onClick={this.onResetFilter} className="ml-3" color={'warning'}>Reset</Button>
                    </div>  
                </div>
            </div>
        )
    }

    renderTable = () => {
        const { list } = this.state;
        return(
            <Table className="mt-3" striped>
                <tr> 
                    <th className="align-middle" rowspan={2}>NO.</th>
                    <th className="align-middle" rowspan={2}>WILAYAH</th> 
                    <th className="text-center" colSpan={4}>LEVEL AGEN</th> 
                </tr> 
                <tr> 
                    <th>RM</th><th>SM</th> <th>UM</th> <th>FU</th> 
                </tr> 
                {
                    Object.keys(list).length > 0 &&
                    Object.keys(list).map((k, i) => (
                        <tr key={k}> 
                            <td>{i + 1}</td>
                            <td>{k?.toUpperCase()}</td>
                            <td>{list[k].RM}</td>
                            <td>{list[k].SM}</td>
                            <td>{list[k].UM}</td>
                            <td>{list[k].FU}</td>
                        </tr> 

                    ))
                }
            </Table>
        )
    }

    render() {
        const Filter = this.renderFilter;
        const TableAgen = this.renderTable;
        return (
            <div>
                <h2>AGEN LEVEL BERDASARKAN WILAYAH KERJA</h2>
                <Filter />
                <TableAgen />
                <AlertModal {...this.state.alert} />
            </div>
        )
    }
}

export default AgenLevelBaseOnLocation;