import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  withRouter
} from "react-router-dom";
import {routes} from '../../constants/routes';
import './index.css'

class SideBar extends Component {

    constructor(props) {
        super(props);
    }

    onClickMenu = (path) => this.props.history.push(path)

    renderMenu = () => {
        const { pathname } = this.props.location;
        return (
            <div>
            { routes.map((r) => <h2 key={r.path} onClick={() => this.onClickMenu(r.path)} className={`menu-item ${pathname === r.path && 'text-primary'}`}>{r.name}</h2>) }
            </div>
        )
    }

    render() {
        const Menu = this.renderMenu;
        return(
            <div className="wrapper">
                <div>
                    <h1 className="title">BRIL AGEN</h1>
                </div>
                <Menu />
            </div>
        )
    }
}

export default withRouter(SideBar);