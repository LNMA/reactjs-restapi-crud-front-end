import React, {ReactNode} from 'react';
import {HomeComp} from "./component/home/HomeComp";
import {Redirect, Route, Router, Switch} from "react-router";
import {createBrowserHistory} from "history";
import {AddUserComp} from "./component/save/AddUserComp";
import {UpdateUserComp} from "./component/update/UpdateUserComp";

class App extends React.Component<any, any> {
    private readonly history: any = createBrowserHistory();


    public render() : ReactNode {
        return (
            <Router history={this.history}>
                <Switch>
                    <Redirect exact from="/" to="/home" />
                    <Route path='/home' component={HomeComp}/>
                    <Route path='/add-user' component={AddUserComp}/>
                    <Route path='/update-user/:userId' component={UpdateUserComp}/>
                </Switch>
            </Router>
        )
    };
}

export default App;
