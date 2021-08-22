export class SignupRequestDto{

    name:string = '';
    surName:string = '';
    email:string = '';
    secondryEmail:string = '';
    birthDate:Date = new Date;
    mobileNo:string = '';
    password:string = '';
    repassword:string = '';

    clear(){
        this.name = '';
        this.surName = '';
        this.email = '';
        this.secondryEmail = '';
        this.birthDate = new Date;
        this.mobileNo = '';
        this.password = '';
        this.repassword = '';
    }
}