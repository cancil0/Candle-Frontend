import { GeneratePinFileResourcesDto } from "./generatePinFileResourcesDto.model";

export interface ForgotPasswordRequestDto{
    email:string;
    mobilePhone:string;
    userName:string;
    fileResources:GeneratePinFileResourcesDto;
}