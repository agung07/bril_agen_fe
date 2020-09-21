import React, { Component } from 'react';
import Select from 'react-select';
import { Input, Button, Row, Table } from 'reactstrap';
import axios from 'axios'
import { initialState } from './constans';

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
            const getAgenLevel = await  axios.get('http://localhost:8000/structur_agen');
            console.log("getAgenLevel: ", getAgenLevel )
            if(getAgenLevel.status === 200) {
                this.setState({list: getAgenLevel.data})
            }
        } catch (error) {
            
        }
    }

    renderFilter = () => {
        return (
            <div className="row col-lg-12 mt-4">
                <div className="row col-lg-8">
                    <span className="col-lg-6">Pilih Wilayah Kerja: </span>
                    <Select className="col-lg-6" />
                </div>
                <div className="row col-lg-4">
                    <span className="ml-3">status: </span> 
                    <input className="mt-2 ml-2" type={'checkbox'} />
                    <Button className="ml-3" color={'primary'}>View</Button>
                </div>
            </div>
        )
    }

    renderTable = () => {
        const { list } = this.state;
        return(
            <Table className="mt-3" striped>
                <tr> 
                    <th className="align-middle" rowspan="2">NO.</th>
                    <th className="align-middle" rowspan="2">WILAYAH</th> 
                    <th className="text-center" colSpan="4">LEVEL AGEN</th> 
                </tr> 
                <tr> 
                    <th>RM</th><th>SM</th> <th>UM</th> <th>FU</th> 
                </tr> 
                {
                    Object.keys(list).length > 0 &&
                    Object.keys(list).map((k, i) => (
                        <tr> 
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
            <>
                <h2>AGEN LEVEL BERDASARKAN WILAYAH KERJA</h2>
                <Filter />
                <TableAgen />
            </>
        )
    }
}

export default AgenLevelBaseOnLocation;