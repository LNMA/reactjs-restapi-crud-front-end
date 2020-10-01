const axios = require("axios").default;

export interface DeleteUserRequest {
    deleteUser(userId: number): any;
}

export class DeleteUserRequestImpl implements DeleteUserRequest {

    public deleteUser(userId: number): any {
        const urlDeleteUser: string = "http://localhost:8080/api/user/" + userId + "/delete-user";
        return axios.delete(urlDeleteUser);
    }
}

