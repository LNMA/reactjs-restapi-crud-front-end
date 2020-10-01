import React from "react";
import {HomeRequest, HomeRequestImpl} from "../../service/HomeRequest";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {DeleteUserRequest, DeleteUserRequestImpl} from "../../service/DeleteUserRequest";
import {NavLink} from "react-router-dom";

export class HomeBodyComp extends React.Component<any, any> {
    private userEmpty: any;

    public constructor(props: Readonly<any>) {
        super(props);
        this.state = {users: [{}]};
        this.getUsers = this.getUsers.bind(this);
        this.userEmpty = () => this.setState({
            users: [{
                userId: 0,
                forename: "System",
                surname: "There is no record until now."
            }]
        });
    }

    private editUserUrl(userId: number): string {
        return "/update-user/" + userId;
    }

    private deleteUser(userId: number, e: any): any {
        e.preventDefault();
        console.log(userId);
        const deleteUser: DeleteUserRequest = new DeleteUserRequestImpl();
        deleteUser.deleteUser(userId)
            .then((response: any) => {
                console.log(response.data);
            });

    }

    private getUsers(): void {
        const user: HomeRequest = new HomeRequestImpl();
        user.getUsers()
            .then((response: any) => {
                this.setState({users: response.data});
            });
    }

    componentDidMount() {
        this.getUsers();
    }

    render() {
        return (
            <div>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="center">Image</TableCell>
                                <TableCell align="center">Last Modified</TableCell>
                                <TableCell align="center">Forename</TableCell>
                                <TableCell align="center">Surname</TableCell>
                                <TableCell align="center">Delete</TableCell>
                                <TableCell align="center">Edit</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.users.map((users: any) => (
                                <TableRow key={users.userId}>
                                    <TableCell component="th" scope="row">{users.userId}</TableCell>
                                    <TableCell align="center">
                                        <img src={"data:image/*;base64," + users.imageBase64Encode} width={"265"}
                                             alt="user picture"/>
                                    </TableCell>
                                    <TableCell align="center">{users.lastEditDate}</TableCell>
                                    <TableCell align="center">{users.forename}</TableCell>
                                    <TableCell align="center">{users.surname}</TableCell>
                                    <TableCell align="center">
                                        <IconButton onClick={(e: any) => this.deleteUser(users.userId, e)}>
                                            <DeleteIcon style={{fontSize: 25}}/>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="center">
                                        <NavLink to={this.editUserUrl(users.userId)}>
                                            <IconButton>
                                                <EditIcon style={{fontSize: 25}}/>
                                            </IconButton>
                                        </NavLink>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}

