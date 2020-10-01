const axios = require("axios").default;

export interface HomeRequest {
    getUsers(): any;
}

export class HomeRequestImpl implements HomeRequest {
    private readonly urlGetUsers: string = "http://localhost:8080/api/user/get-all-users";

    public getUsers(): any {
        return axios.get(this.urlGetUsers);
    }

}

