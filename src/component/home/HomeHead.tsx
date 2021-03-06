import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AppBar from "@material-ui/core/AppBar";
import {NavLink} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

export class HomeHead extends React.Component<any, any> {


    render() {
        return (
            <div>
                <AppBar position="static" color={"secondary"}>
                    <Toolbar>
                        <Tooltip title="Home Page">
                            <NavLink style={{color: "white", fontWeight: "bolder"}} exact to="/home">
                                <IconButton edge="start" color="inherit" aria-label="menu">
                                    CRUD App
                                </IconButton>
                            </NavLink>
                        </Tooltip>
                    </Toolbar>
                    <Tooltip title="Add User">
                        <Button color="inherit">
                            <NavLink to='/add-user' style={{color: "white"}}>
                                <PersonAddIcon style={{fontSize: 40}}/>
                            </NavLink>
                        </Button>
                    </Tooltip>
                </AppBar>
            </div>
        );
    }
}