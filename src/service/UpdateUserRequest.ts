const axios = require("axios").default;

export interface UpdateUserRequest {
    getUser(userId: string): any;

    updateUser(formData: FormData): any;
}

export class UpdateUserRequestImpl implements UpdateUserRequest {
    public getUser(userId: string): any {
        const urlGetUser: string = "http://localhost:8080/api/user/" + userId + "/get-user";
        return axios.get(urlGetUser);
    }

    public updateUser(formData: FormData): any {
        const urlUpdateUser: string = "http://localhost:8080/api/user/update-user";
        return axios({
            method: "POST",
            url: urlUpdateUser,
            headers: {'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': '*'},
            data: formData
        });
    }
}