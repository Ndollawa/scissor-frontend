export interface authProps{
auth?:{
       userInfo:{
              user:string,
              username?:string,
              email?: string,
              fullName?:string,
              roles?:number[],
              accessToken?:string
              }
       },
setAuth?:React.Dispatch<any>, 
}

export interface allowedRolesProps{
       allowedRoles:number[]
       
}