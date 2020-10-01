import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import {NavLink} from "react-router-dom";
import {Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MuiAlert from '@material-ui/lab/Alert';
import {AddUserRequest, AddUserRequestImpl} from "../../service/AddUserRequest";

export class AddUserComp extends React.Component<any, any> {
    private forenameModel: any;
    private surnameModel: any;
    private userImageModel: any;
    private addUserSubmit: any;
    private showAlert: boolean = false;
    private alertMessage: string = "";

    public constructor(props: Readonly<any>) {
        super(props);
        this.state = {forenameInput: "", surnameInput: ""};
        this.forenameModel = (e: any) => {
            this.setState({forenameInput: e.target.value});
        };

        this.surnameModel = (e: any) => {
            this.setState({surnameInput: e.target.value});
        };

        this.userImageModel = React.createRef();

        this.addUserSubmit = (e: any) => {
            e.preventDefault();
            const sendRequest: AddUserRequest = new AddUserRequestImpl();
            const formData: FormData = new FormData();
            formData.append("forename", this.state.forenameInput);
            formData.append("surname", this.state.surnameInput);
            formData.append("userIdMultiPart", this.userImageModel.current.files[0]);

            sendRequest.addUser(formData)
                .then((response: any) => {
                    this.showAlert = true;
                    this.alertMessage = response.data;
                    this.userImageModel = null;
                    this.forenameModel = null;
                    this.surnameModel = null;
                    this.setState({forenameInput: "", surnameInput: ""});
                });
        };

    }

    public getAlert() {
        if (this.showAlert) {
            return (<MuiAlert severity="success" variant="filled" hidden>{this.alertMessage}</MuiAlert>);
        } else {
            return;
        }
    }


    public render() {
        return (
            <div>
                <header>
                    <AppBar position="static" color={"primary"}>
                        <Toolbar>
                            <Tooltip title="Home Page">
                                <NavLink style={{color: "white", fontWeight: "bolder"}} exact to="/home">
                                    <IconButton edge="start" color="inherit" aria-label="menu">
                                        CRUD App
                                    </IconButton>
                                </NavLink>
                            </Tooltip>
                        </Toolbar>
                        <Typography variant="h6" style={{textAlign: "center"}}>
                            Save User
                        </Typography>
                    </AppBar>
                </header>
                <div>
                    {this.getAlert()}
                    <form style={{textAlign: "center"}} onSubmit={this.addUserSubmit}>
                        <br/>
                        <div>
                            <TextField id="standard-basic" style={{width: "75%"}} label="Forename"
                                       onChange={this.forenameModel}/>
                        </div>
                        <br/>
                        <br/>
                        <div>
                            <TextField id="standard-basic" style={{width: "75%"}} label="Surname"
                                       onChange={this.surnameModel}/>
                        </div>
                        <br/>
                        <br/>
                        <div>
                            <input accept="image/*" id="contained-button-file" type="file" ref={this.userImageModel}
                                   hidden/>
                            <label htmlFor="contained-button-file">
                                <Button variant="contained" color="primary" component="span">
                                    Upload Image
                                </Button>
                            </label>
                        </div>
                        <br/>
                        <br/>
                        <Button type="submit" variant="contained" color="secondary">+ Add User</Button>
                    </form>
                </div>
            </div>
        );
    }
}