import React,{Component} from 'react';
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import MailView from "./components/mailView";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";


function App (){
        return(
            <Router>
                <Routes/>
            </Router>
        )
}

const Routes = () => {
    return (
        <Switch>
            <Route path={"/login"} component={Login}/>
            <Route path={"/dashboard"} component={Dashboard}/>
            <Route path={"/mail/:id"} component={MailView} />
            <Redirecter/>
        </Switch>
    )
}

const Redirecter = ({component:Component,...rest}) => {
    const username = localStorage.getItem("username");
    return (
        <Route
            {...rest}
            render = {()=> username !== null ?
                (
                    <Redirect to={"/dashboard"} />
                ) :
                (
                    <Redirect to={"/login"} />
                )
            }
        />
    )
}



export default App;
