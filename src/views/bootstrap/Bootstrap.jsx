import React, { Fragment, Component, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { routes } from './constants/routes';
import SideBar from './components/side_bar';
import './Bootstrap.css';
class Bootstrap extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <Router>
                <div className="d-flex">
                    <SideBar />
                    <div className="p-5">
                    <Suspense fallback={<div>Loading...</div>}>
                        <Switch>
                        {
                            routes.map((route, idx) => {
                            return (
                                <Route
                                key={idx}
                                path={`${route.path}`}
                                exact={route.exact}
                                name={route.name}
                                render={(props) => (
                                    <route.component {...props} />
                                )}
                                />
                            )
                            })
                        }
                        </Switch>
                    </Suspense>
                    </div>
                </div>
            </Router>
        )
    }
}

export default Bootstrap;