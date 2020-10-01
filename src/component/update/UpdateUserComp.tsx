import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import {NavLink} from "react-router-dom";
import {Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {UpdateUserRequest, UpdateUserRequestImpl} from "../../service/UpdateUserRequest";
import {type} from "os";

//{this.props.match.params.userId}
export class UpdateUserComp extends React.Component<any, any> {
    private readonly updateUserRequest: UpdateUserRequest = new UpdateUserRequestImpl();
    private forenameModel: any;
    private surnameModel: any;
    private userImageModel: any;

    public constructor(props: Readonly<any>) {
        super(props);
        this.state = {forenameInput: "", surnameInput: "", userImageInput: "", imageBase64Encode: "", userId: ""};
        this.getUser = this.getUser.bind(this);
        this.updateUserSubmit = this.updateUserSubmit.bind(this);

        this.forenameModel = (e: any) => {
            this.setState({forenameInput: e.target.value});
        };

        this.surnameModel = (e: any) => {
            this.setState({surnameInput: e.target.value});
        };

        this.userImageModel = (e: any) => {
            this.setState({userImageInput: e.target.files[0]});
        };
    }

    private updateUserSubmit(e:any){
        e.preventDefault();
        const formData:FormData = new FormData();
        formData.append("userId", this.state.userId);
        formData.append("forename", this.state.forenameInput);
        formData.append("surname", this.state.surnameInput);
        formData.append("userIdMultiPart", this.state.userImageInput);
        console.log(this.state.userImageInput);
       this.updateUserRequest.updateUser(formData)
            .then((response:any) => {
                console.log(response.data);
            })
            .catch((response:any) => {
                console.log(response.data);
            });

    }

    private getUser(){
        const userId:string = this.props.match.params.userId;
        this.updateUserRequest.getUser(userId)
            .then((response:any) => {
                const image:any[] = new Array(response.data.userImage);
                const fileImage:File = new File(image, "userImage");
                this.setState({imageBase64Encode: response.data.imageBase64Encode, forenameInput: response.data.forename,
                   surnameInput: response.data.surname, userImageInput: fileImage, userId: response.data.userId});
            });
    }

    componentDidMount() {
        this.getUser();
    }

    render() {
        return (
            <div>
                <header>
                    <AppBar position="static" color={"default"}>
                        <Toolbar>
                            <Tooltip title="Home Page">
                                <NavLink style={{color: "coral", fontWeight: "bolder"}} exact to="/home">
                                    <IconButton edge="start" color="inherit" aria-label="menu">
                                        CRUD App
                                    </IconButton>
                                </NavLink>
                            </Tooltip>
                        </Toolbar>
                        <Typography variant="h6" style={{textAlign: "center", color: "coral"}}>
                            Update User
                        </Typography>
                    </AppBar>
                </header>
                <form style={{textAlign: "center"}} onSubmit={this.updateUserSubmit}>
                    <br/>
                    <div>
                        <TextField id="standard-basic" style={{width: "75%"}} label="Forename" value={this.state.forenameInput}
                                   onChange={this.forenameModel}/>
                    </div>
                    <br/>
                    <br/>
                    <div>
                        <TextField id="standard-basic" style={{width: "75%"}} label="Surname" value={this.state.surnameInput}
                                   onChange={this.surnameModel}/>
                    </div>
                    <br/>
                    <br/>
                    <div>
                        <img src={"data:image/*;base64," + this.state.imageBase64Encode} width={"265"} alt="user picture"/>
                    </div>
                    <div>
                        <input accept="image/*" id="contained-button-file" type="file" onChange={this.userImageModel}
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
        );
    }
}