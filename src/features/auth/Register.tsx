import {useDispatch, useSelector } from 'react-redux';
import React, {useRef,useState,useEffect,useDeferredValue, FormEvent, FormEventHandler } from 'react';
import { Link } from 'react-router-dom';
import {GoKey} from 'react-icons/go';
import {GrMail} from 'react-icons/gr';
import {FaUser,FaRegUserCircle,FaKeycdn, FaRegEye, FaRegEyeSlash} from 'react-icons/fa'; 
import {useCompanyDetails, useSiteImages} from '../dashboard/pages/Settings/settingsConfigSlice';
import {useRegisterMutation} from './authApiSlice';
import { useCheckDuplicateUserMutation } from '../dashboard/pages/Users/usersApiSlice';
import OtherBody from '../dashboard/components/OtherBody';
import { ClipLoader } from 'react-spinners';
import $ from 'jquery'
import showToast from '../../app/utils/hooks/showToast';

// username regex must start with a lowercase or uppercase laters and must be followed by lower or uppercase or digits,- or _ of 3 to 23 characters
const USER_REGEX = /^[a-zA-Z][a-zA-z0-9-_]{3,23}$/;
// requires atleast 0ne uppercase, lowercase,digit, special character and a total of 8 t0 24 characters
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;






interface Messages{
    type:string,
    msg:string | unknown
}

const Register:React.FC = () => {

    const {siteName,contact} = useSelector(useCompanyDetails);
    const {logo} = useSelector(useSiteImages);


const userRef = useRef <HTMLInputElement>(null);
const emailRef = useRef <HTMLInputElement>(null);
const errRef = useRef <HTMLInputElement>(null);
const successRef = useRef <HTMLInputElement>(null);
const pwdRef = useRef <HTMLInputElement>(null);
const cpwdRef = useRef <HTMLInputElement>(null);

const [checkDuplicateUser,{
    error:checkDuplicateUserError,
    data:response,
    isLoading:isCheckDuplicateUserLoading,
    isError:isCheckDuplicateUserError,
    isSuccess:isCheckDuplicateUserSuccess
}] = useCheckDuplicateUserMutation();
const [user,setUser] = useState('');
const [validName,setValidName] = useState(false);
const [userFocus,setUserFocus] = useState(false);

const [email,setEmail] = useState('');
const [validEmail,setValidEmail] = useState(false);
const [emailFocus,setEmailFocus] = useState(false);

const [pwd,setPwd] = useState('');
const [validPwd,setValidPwd] = useState(false);
const [pwdFocus,setPwdFocus] = useState(false);

const [matchPwd,setMatchPwd] = useState('');
const [validMatch,setValidMatch] = useState(false);
const [matchFocus,setMatchFocus] = useState(false);

const [msg,setMsg] = useState<Messages>();
const [success,setSuccess] = useState(false);
// const [userFocus,setUserFocus] = useState(false);

const [showPassword,setShowPassword] = useState(false);
const [showCPassword,setShowCPassword] = useState(false);
const deferredEmail = useDeferredValue(email)
const deferredUsername = useDeferredValue(user)
const dispatch = useDispatch()
const [register,{
    isLoading,
    data,
    error,
    isSuccess
}] = useRegisterMutation();
useEffect(()=>{
    userRef.current?.focus();
}, [])

useEffect(()=>{
    setMsg(undefined)
}, [user,email,pwd,matchPwd]);
 const checkDuplicate = async (key:string) =>{
  const data ={ user:key }
       await checkDuplicateUser({data})
    
    if(!checkDuplicateUserError  && isCheckDuplicateUserSuccess && !isCheckDuplicateUserLoading){
            if(response.message === 'available'){
            setMsg({type:'success',msg:`${key} Available`}) 
            }else if(response.message === 'taken'){
            setMsg({type:'danger',msg:` Conflict: User with ${key} already exist!`})}

        }else if(isCheckDuplicateUserError){
        setMsg({type:'danger',msg:checkDuplicateUserError})    
    }
    }

const checkUser = (key:string)=>{
    const result = USER_REGEX.test(key);
   setValidName(result)
   if(result){
    checkDuplicate(key)
   }    
       
    
}

const checkEmail = (key:string)=>{
    const result = EMAIL_REGEX.test(key);
   setValidEmail(result)
   if(result){
    checkDuplicate(key)
   }  
}

useEffect(()=>{
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd && pwd !== "";
    setValidMatch(match)
}, [pwd,matchPwd]);

const handleShowPassword = function(type:string){
  if(type === 'pwd'){
    if($('#password').attr('type') === 'password'){
        setShowPassword(true)
        $('#password').attr('type','text');
    }else if($('#password').attr('type') === 'text'){
        $('#password').attr('type','password');
        setShowPassword(false)
    }
    pwdRef.current?.focus()
}else{
    if($('#cpassword').attr('type') === 'password'){
        setShowPassword(true)
        $('#cpassword').attr('type','text');
    }else if($('#cpassword').attr('type') === 'text'){
        $('#cpassword').attr('type','password');
        setShowCPassword(false)
    }
    cpwdRef.current?.focus()   
}
}


const handleRegistration:FormEventHandler = async (e:FormEvent) =>{
    e.preventDefault();
        await register({username:user,email,password:pwd})
            if(error){
                setMsg({type:'danger',msg:'No Server Response'});
            }else if(data?.status === 400){
                setMsg({type:'warning',msg:'Missing form detail(s)'} )
            }else if(data?.status === 409){
                setMsg({type:'danger',msg:'Conflict: User with Username or email already exist!'} )
            }else{
                setMsg({type:'danger',msg:'Registration Failed<br/>'+error})
            errRef.current?.focus();
            }
    if(!isLoading && isSuccess){
        setMsg({type:'success',msg:'New Account successfully created!'}) 
        showToast('sucess','New Account successfully created!')
        setSuccess(true);
        setUser('');
        setEmail('');
        setPwd('');
        setMatchPwd('');
   }
    }

  return (
    <OtherBody>
    
        <div className="container h-100">
            <div className="row justify-content-center h-100 align-items-center">
                <div className="col-md-6">
                    <div className="authincation-content">
                        <div className="row no-gutters">
                            <div className="col-xl-12">
                                <div className="auth-form">
									<div className="text-center  mb-3">
										<Link to="index-2.html" className="brand-logo d-flex justify-content-center 
 align-items-center">
                                        {logo && logo !== ''?
  <img src={process.env.REACT_APP_BASE_URL+"/uploads/settings/"+logo} alt={siteName} width='150' />
   : <h3 className='fw-900 text-secondary'>{siteName}</h3> }
										</Link>
									</div>
                                    <h4 className="text-center mb-4">Sign up your account</h4>
                                    <form action="" onSubmit={handleRegistration}>
                                        {success && <div ref={successRef} aria-live='assertive' className={`alert alert-success alert-dismissible suserhow`}>
                                        <span className="d-flex"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="me-2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg> <strong>Success!</strong><div> &ensp; Account Registered Successfully!<br/>You can now <strong><Link to='/auth/login'>Login</Link></strong></div></span>
                                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="btn-close">
                                        </button>
                                    
                                        </div>
                                        }
                                    {msg && <div ref={errRef} aria-live='assertive' className={`alert alert-${msg.type} alert-dismissible suserhow`}>
									<>{
                                    msg.type === 'success'
                                    ?<><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="me-2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg> <strong>Success!</strong></>
									:
                                    msg.type === 'warning'
                                    ?<><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="me-2"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg><strong>Warning!</strong></>
									:msg.type === 'danger'
                                    ? <>
                                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="me-2"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                                    <strong>Error!</strong></>
                                    :msg.type === 'danger'
                                    ? <><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="me-2"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg><strong>Success!</strong></> 
                                    :msg.type === 'info'
                                    ? <><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="me-2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg><strong>Info!</strong></> :null} {msg.msg}.
									<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="btn-close">
                                    </button>
                                    </>
                                </div>} 
                                        <div className="form-group"><label className="mb-1"><strong>Username</strong></label>
                                            <div className={validName? "input-group input-success":"input-group input-default"}>
                                            <span className="input-group-text"><FaRegUserCircle fontSize='1rem'/></span>
                                                
                                                <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="username"
                                                autoComplete='off'
                                                ref={userRef}
                                                required
                                                aria-invalid ={validName ? "false": "true"}
                                                aria-describedby="uidnote"
                                                onChange={(e)=> setUser(e.target.value)}
                                                onFocus={()=>setUserFocus(true)}
                                                onBlur={()=>{setUserFocus(false); checkUser(user);}}
                                                value={user}
                                                />{isCheckDuplicateUserLoading && <span className="input-group-text"><ClipLoader loading={isCheckDuplicateUserLoading} color={'#ffffff'} size={'0.8rem'}/></span>}
                                            </div>
                                        </div>
                                        {(userFocus && !validName) && <p className='alert alert-danger' id='uidnote'>4 to 24 characters.<br/>Must begin with  a letter.<br/> Letters, numbers, underscore,hyphens, % allowed</p>}
                                        <div className="form-group"><label className="mb-1"><strong>Email</strong></label>
                                        <div className={validEmail? "input-group input-success":"input-group input-default"}>
                                        <span className="input-group-text"><GrMail fontSize='1rem' /></span>
                                            
                                            <input 
                                            type="email"
                                            className="form-control" 
                                            placeholder="hello@example.com"
                                            onChange={(e)=>setEmail(e.target.value)}
                                            autoComplete='off'
                                            required
                                            ref={emailRef}
                                            aria-invalid ={validEmail ? "false": "true"}
                                            aria-describedby="uemailnote"
                                            onKeyUp={(e)=> setEmail(email)}
                                            onFocus={()=>setEmailFocus(true)}
                                            onBlur={()=>{setEmailFocus(false); checkEmail(email);}}
                                            value={email}
                                             />
                                        </div>
                                        </div>
                                        {(emailFocus &&  !validEmail) &&<p className='alert alert-danger' id='uemailnote'>Must begin with letter follwed by @ and a provider and end with a '.com'. eg. youremail@provider.com</p>}
                                        <div className="form-group"><label className="mb-1"><strong>Password</strong></label>
                                         <div className={validPwd? "input-group input-success":"input-group input-default"}>
                                         <span className="input-group-text"><GoKey fontSize='1rem'/></span>
                                         
                                            <input 
                                            type="password" 
                                            id="password" 
                                            className="form-control" 
                                            required
                                            ref={pwdRef}
                                            aria-invalid ={validPwd ? "false": "true"}
                                            aria-describedby="pwdnote"
                                            onChange={(e)=> setPwd(e.target.value)}
                                            onFocus={()=>setPwdFocus(true)}
                                            onBlur={()=>setPwdFocus(false)}
                                            placeholder="password"
                                            value={pwd}
                                            
                                            />
                                            <span className="input-group-text" onClick={()=>handleShowPassword('pwd')}>{showPassword?<FaRegEye fontSize='1rem'/>: <FaRegEyeSlash fontSize={'1rem'} />}</span>
                                          
                                            </div>
                                        </div>
                                        {(pwdFocus && ! validPwd) && <p className='alert alert-danger' id='pwdnote'>8 to 24 characters.<br/>Must include uppercase and lowercase letters, a number and a special character.<br/> Allowed Special characters: <span aria-label="underscore">_</span> <span aria-label="hyphens">-</span><span aria-label="at symbol">@</span><span aria-label="hashtag">#</span><span aria-label="dollar sign">$</span><span aria-label="percent">% </span> </p>}
                                        <div className="form-group"><label className="mb-1"><strong>Confirm Password</strong></label>
                                         <div className={validMatch? "input-group input-success":"input-group input-default"}>
                                         <span className="input-group-text"><FaKeycdn fontSize='1rem'/></span>
                                         
                                            <input 
                                            type="password" 
                                            className="form-control" 
                                            required
                                            ref={cpwdRef}
                                            id="cpassword"
                                            aria-invalid ={validMatch ? "false": "true"}
                                            aria-describedby="confirmpwdnote"
                                            onChange={(e)=> setMatchPwd(e.target.value)}
                                            onFocus={()=>setMatchFocus(true)}
                                            onBlur={()=>setMatchFocus(false)}
                                            value={matchPwd}
                                            placeholder="confirm password"
                                            />
                                             <span className="input-group-text" onClick={()=>handleShowPassword('cpwd')}>{showCPassword?<FaRegEye fontSize='1rem'/>: <FaRegEyeSlash fontSize={'1rem'} />}</span>
                                           
                                            </div>
                                        </div>
                                        {(matchFocus && !validMatch) && <p className='alert alert-danger' id='confirmpwdnote'>Passwords do not match!</p>}
                                        <div className="text-center mt-4">
                                            <button type="submit" 
                                            disabled={!(validEmail && validPwd && validName && validMatch)? true : false} className="btn btn-secondary btn-block">{isLoading?"Registering...":"Register Me"} {isLoading && <ClipLoader loading={isLoading} color={'#ffffff'} size={'0.8rem'}/>}</button>
                                        </div>
                                    </form>
                                    <div className="new-account mt-3">
                                        <p>Already have an account? <Link className="text-secondary" to="/auth/login">Login</Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   
    </OtherBody>
  )
}

export default Register
