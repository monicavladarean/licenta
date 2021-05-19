export class Staff {
    id: number;
    isAdmin: boolean;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    authdata?: string ;

    constructor(id:number,isAdmin:boolean, username:string, firstName:string, lastName:string)
    {
        this.id = id;
        this.isAdmin = isAdmin;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;

    }
}