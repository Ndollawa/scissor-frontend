
 interface userInterface{
    user:{
     _id:string | undefined;
     firstName: string | undefined;
     lastName: string | undefined;
     fullName?: string | undefined;
     email: string | undefined;
     username: string | undefined;
     phone: string | undefined;
     dob: string | undefined;
     gender: string | undefined;
     address: string | undefined;
     city: string | undefined;
     state: string | undefined;
     country: string | undefined;
     occupation: string | undefined;
     bio: string | undefined;
     online:{
        status:boolean | undefined;
        lastSeen:Date | undefined;
     }
     userImage: string | undefined;
     accountStatus:string | number | null |undefined;
     verificationStatus:number | boolean | undefined;
     accountSecurity_2FA: boolean | string | null |undefined;
     roles:  {
         User: number | null |undefined;
         Admin?: number | undefined | null;
         Dev?: number | undefined | null;
         Staff?: number | undefined | null;
     } | null | undefined;
     createdAt?:Date;
     updatedAt?:Date;
    }
 }
 export default userInterface