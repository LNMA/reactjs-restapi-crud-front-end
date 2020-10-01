const axios = require("axios").default;

export interface AddUserRequest {
    addUser(formData: FormData): any;
}

export class AddUserRequestImpl implements AddUserRequest {
    private readonly urlAddUser: string = "http://localhost:8080/api/user/create-user";

    public addUser(formData: FormData): any {
        return axios({
            method: 'post',
            url: this.urlAddUser,
            headers: {'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': '*'},
            data: formData
        });
    }
}