class User {

    firstname:string;
    lastname:string;
    age:number;

    name():string {
        return this.firstname + ' ' + this.lastname;
    }
    
}