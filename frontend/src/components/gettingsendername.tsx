import { jwtDecode } from "jwt-decode";


interface JwtPayload{
    username:string,
    password:string,
    balance:string,
    id:string
}

export const GetSenderDetails=():JwtPayload | null=>{
    const token = localStorage.getItem("token");
    if(!token){
        throw new Error("not able to fetch token for this account");
    }
    const decode = jwtDecode<JwtPayload>(token);
    return decode;
}