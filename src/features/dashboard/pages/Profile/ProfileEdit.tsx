import React, {useState,useEffect,FormEvent,ChangeEvent, useRef} from 'react'
import MainBody from '../../components/MainBody'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../../auth/authSlice'
import useUserImage from '../../../../app/utils/hooks/useUserImage'
import {FaPencilAlt, FaRegTimesCircle} from 'react-icons/fa'
import showToast from '../../../../app/utils/hooks/showToast'
import { useUpdateUserMutation } from '../Users/usersApiSlice'
import { useCheckDuplicateUserMutation } from '../Users/usersApiSlice'
import {useUserUploadMutation , useUserRemoveFileMutation  } from '../Users/usersApiSlice'
// username regex must start with a lowercase or uppercase laters and must be followed by lower or uppercase or digits,- or _ of 3 to 23 characters
const USER_REGEX = /^[a-zA-Z][a-zA-z0-9-_]{3,23}$/;
// requires atleast 0ne uppercase, lowercase,digit, special character and a total of 8 t0 24 characters
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

interface Messages{
    type:string,
    msg:string
}

const ProfileEdit = () => {
    const currentUser = useSelector(selectCurrentUser)
    const userImage = useUserImage(currentUser)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState(currentUser.email)
    const [username, setUsername] = useState(currentUser.username)
    const [firstName, setFirstName] = useState(currentUser.firstName)
    const [lastName, setLastName] = useState(currentUser.lastName)
    const [phone, setPhone] = useState(currentUser.phone)
    const [dob, setDob] = useState(currentUser.dob)
    const [gender, setGender] = useState(currentUser.gender)
    const [address, setAddress] = useState(currentUser.address)
    const [city, setCity] = useState(currentUser.city)
    const [state, setState] = useState(currentUser.state)
    const [country, setCountry] = useState(currentUser.country)
    const [occupation, setOccupation] = useState(currentUser.occupation)
    const [bio, setBio] = useState(currentUser.bio)
	
    const [validMatch,setValidMatch] = useState(false);
    const userRef = useRef <HTMLInputElement>(null);
    const emailRef = useRef <HTMLInputElement>(null);
    const [validName,setValidName] = useState(false);
    const [validEmail,setValidEmail] = useState(false);

    const [invalidEmailInput,setInvalidEmailInput] = useState(false);
    const [invalidNameInput,setInvalidNameInput] = useState(false);

    const [validPwd,setValidPwd] = useState(false);
	const [userRemoveFile,
		{
		  data:removeFileRes,
		  isSuccess:removeFileIsSuccess,
		  isError:removeFileIsError,
		  error:removeFileError
		}]:any= useUserRemoveFileMutation()
	
	const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error:updateUserError
    }]:any = useUpdateUserMutation()
	const [checkDuplicateUser,{
		error:checkDuplicateUserError,
		data:response,
		isLoading:isCheckDuplicateUserLoading,
		isError:isCheckDuplicateUserError,
		isSuccess:isCheckDuplicateUserSuccess
	}]:any = useCheckDuplicateUserMutation();
	 
	const checkDuplicate = async (key:string) =>{
	  const data ={ user:key }
		   await checkDuplicateUser({data})
		
		if(!checkDuplicateUserError  && isCheckDuplicateUserSuccess && !isCheckDuplicateUserLoading){
			if(response.message === 'available'){
				showToast('success',`${key} Available`)
	
			}else if(response.message === 'taken'){
				showToast('error',`${key} Taken`)
				if(EMAIL_REGEX.test(email!)){
					setInvalidEmailInput(true)
				}else{
					setInvalidNameInput(true)
				}
	
			}else if(isCheckDuplicateUserError){  
			showToast('error',checkDuplicateUserError.data.message) 
		}	
			
		}
	}
useEffect(()=>{
    userRef.current?.focus();
}, [])

useEffect(()=>{
    // setMsg(undefined)
}, [username,email,password,confirmPassword]);

useEffect(()=>{
    const result = USER_REGEX.test(username!);
   setValidName(result)
}, [username]);

useEffect(()=>{
    const result = EMAIL_REGEX.test(email!);
    setValidEmail(result)
}, [email]);

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

    const genderOptions = ['male','female'].map((userGender,i)=>(<option key={i} value={userGender}>{userGender.toUpperCase()}</option>))
useEffect(()=>{
    const result = PWD_REGEX.test(password);
    setValidPwd(result);
    const match = password === confirmPassword && password !== "";
    setValidMatch(match)
}, [password,confirmPassword]);

	const [userUpload,{isError:isUploadError,isSuccess:isUploadSuccess,error:uploadError}]:any= useUserUploadMutation()
const updateProfilePicture = async(e:ChangeEvent<HTMLInputElement>)=>{
	 const files = e.target.files!
	 const formData = new FormData()
	 formData.append("avatar", files[0]!)
	 formData.append('_id',currentUser._id!);
	//  
	 await userUpload(formData)
	 if(isUploadError){ return showToast('error',`Sorry, couldn't Upload Profile Picture: ${uploadError?.data?.message}` )}
	showToast('success','Profile Picture Uploaded successfully')
}
const updateProfilePassword = async(e:FormEvent)=>{
	if(validMatch){
		await updateUser({_id:currentUser._id,type:'passwordUpdate',data:{password}})
		if(isError) return showToast('error',updateUserError?.data?.message)
		showToast('success', 'Profile updated successfully!')
	}
}
const updateProfile = async(e:FormEvent)=>{
e.preventDefault()
if(USER_REGEX.test(username!) && EMAIL_REGEX.test(email!)){
	const data={email,firstName,lastName,username,phone,dob,gender,address,city,state,country,occupation,bio,
	}
await updateUser({_id:currentUser._id,data,type:'profileUpdate'})
if(isError)return showToast('error',updateUserError?.data?.message)
showToast('success', 'Profile updated successfully!')
}}
  
const removeImage = async(file:string,type:string)=>{
	if(file){
  await userRemoveFile({_id:currentUser._id,file,type})
  if(removeFileIsError){ return showToast('error',`Sorry, couldn't remove Image: ${removeFileError.data.message}` )}
  showToast('success',' Image removed successfully')
   
	}
   }
  return (
    <MainBody>
		<div className="container-fluid">
        <div className='panel card-topline-primary'>
        <div className="side-app"> 
			
			<div className="row "> 
				<div className="col-lg-4"> 
					<div className="card" style={{height:'60%'}}> 
						<div className="card-header"> 
							<h3 className="card-title">Change Password</h3>  
							</div> 
							<div className="card-body"> 
								<div className="add-contact-box">
									<div className="add-contact-content">
								<form method="post"onSubmit={updateProfilePassword} > 
											<div className="image-placeholder">
												<div className="avatar-edit">
													<input type="file" id="imageUpload"  onChange={updateProfilePicture} accept=".png, .jpg, .jpeg"/>
													<label htmlFor="imageUpload" title="Upload Profile Image"></label>
													<span title="Remove Profile Image" onClick={()=>removeImage(currentUser?.userImage!,"avatar")} className="remove-avatar"><FaRegTimesCircle fontSize={'1rem'} color={'#ffffff'}/></span>
												</div>
												<div className="avatar-preview">
													<div id="imagePreview" style={{backgroundImage: `url(${userImage})`}}>
													 </div>
												</div>
											</div>
											<div className="form-group">
												<label className="text-black font-w500">New Password</label>
												<div className="contact-name">
													<input type="password" id="password" name="password" className="form-control" 
                                            onChange={(e)=> setPassword(e.target.value)}/>
													<span className="validation-text"></span>
												</div>
											</div>
											
											<div className="form-group">
												<label className="text-black font-w500">Confirm Password</label>
												<div className="contact-occupation">
													<input type="password" id="confirmpassword" name="confirmpassword" className="form-control"
                                            onChange={(e)=> setConfirmPassword(e.target.value)}/>
												</div>
											</div>
											<div className="form-footer"> 
											<button type="submit" className=" btn btn-primary btn-block" name="submit">Save Changes</button>
										</div> 
										</form>
									</div>
								</div>
							</div> 
									</div> 
								</div> 
								<div className="col-lg-8"> 
									<form className="card" onSubmit={updateProfile}> 
										<div className="card-header"> 
											<h3 className="card-title">Edit Profile</h3> 
											 
											</div> 
											<div className="card-body"> 
												<div className="row"> 
												<div className="col-sm-6 col-md-6"> 
													<div className="form-group"> 
														<label className="form-label">First Name</label> <input type="text" className="form-control" name="fname" value={firstName} 
                                                        onChange={(e)=> setFirstName(e.target.value)} placeholder="First Name"/> 
													</div> 
												</div> 
												<div className="col-sm-6 col-md-6"> 
													<div className="form-group"> 
														<label className="form-label">Last Name</label> <input type="text" className="form-control" name="lname" value={lastName} 
                                                        onChange={(e)=> setLastName(e.target.value)}placeholder="Last Name"/> 
													</div> 
												</div>
											<div className="col-sm-6 col-md-4"> 
												<div className="form-group"> 
													<label className="form-label">Username</label> <input type="text" className="form-control" name="username" id="username" placeholder="Username" value={username} ref={userRef} onKeyUp={()=>checkDuplicate(username!) }
                                                        onChange={(e)=> setUsername(e.target.value)}
														onBlur={()=>checkUser(username!)} required/> 
												</div> 
												
											</div> 
											<div className="col-sm-6 col-md-4"> 
												<div className="form-group"> 
													 <label className="form-label">Email address</label> <div className={validEmail? "input-group input-success":"input-group input-default"}>
                                         <input type="email" className="form-control invalid-input" name="email" placeholder="Email" 
										 value={email} 
										 ref={emailRef}
										 onBlur={()=>checkEmail(email!)}
										 onChange={(e)=> setEmail(e.target.value)} required/> 
												 </div> 
										 	</div>
										 </div>
											<div className="col-sm-6 col-md-4"> 
												<div className="form-group"> 
													 <label className="form-label">Date of birth address</label> <input type="date" className="form-control" name="dob" placeholder="Dob" value={dob} 
                                                        onChange={(e)=> setDob(e.target.value)}/> 
													</div> 
												</div> 
											<div className="col-sm-6 col-md-4"> 
												<div className="form-group"> 
													 <label className="form-label">Phone</label> <input type="tel" className="form-control" name="phone" placeholder="Phone" value={phone} 
                                                        onChange={(e)=> setPhone(e.target.value)}/> 
													</div> 
												</div> 
											<div className="col-sm-6 col-md-4"> 
												<div className="form-group"> 
													 <label className="form-label">Gender</label> <select className="form-control" name="gender" placeholder="Gender" value={gender} 
                                                        onChange={(e)=> setGender(e.target.value)}>
                                                            {genderOptions}</select> 
													</div> 
												</div> 
											
											<div className="col-sm-6 col-md-4"> 
												<div className="form-group"> 
													 <label className="form-label">Occupation </label> <input type="text" className="form-control" name="occupation" placeholder="Occupation" value={occupation} 
                                                        onChange={(e)=> setOccupation(e.target.value)}/> 
													</div> 
												</div> 
												 
												<div className="col-md-12"> 
													<div className="form-group"> 
														<label className="form-label">Address</label> <input type="text" className="form-control" name="address" value={address} 
                                                        onChange={(e)=> setAddress(e.target.value)} placeholder="Home Address"/> 
													</div> 
												</div> 
												<div className="col-sm-6 col-md-4"> 
													<div className="form-group"> 
														<label className="form-label">City</label> <input type="text" className="form-control" name="city" value={city} 
                                                        onChange={(e)=> setCity(e.target.value)} placeholder="City"/> 
													</div> 
												</div> 
                                                <div className="col-sm-6 col-md-4"> 
												<div className="form-group"> 
													 <label className="form-label">State or Provinence</label> <input type="text" className="form-control" name="state" placeholder="State" value={state} 
                                                        onChange={(e)=> setState(e.target.value)}/> 
													</div> 
												</div> 
												{/* <div className="col-sm-6 col-md-4"> 
													<div className="form-group"> 
														<label className="form-label">Postal Code</label> <input type="number" className="form-control" name="zip-code" value={zipcode} 
                                                        onChange={(e)=> setZipcode(e.target.value)}placeholder="ZIP Code"/> 
													</div> 
												</div>  */}
												<div className="col-sm-6 col-md-4"> 
													<div className="form-group"> 
														<label className="form-label">Country</label> <input type="text" className="form-control" name="country" 
                                                        value={country} 
                                                        onChange={(e)=> setCountry(e.target.value)}placeholder=" Country"/> 
													</div> 
												</div> 
												{/* <div className="col-sm-6 col-md-4"> 
													<div className="form-group"> 
														<label className="form-label">Facebook Link</label> <input type="text" className="form-control" name="fblink" value={facebookLink} 
                                                        onChange={(e)=> setFacebookLink(e.target.value)}placeholder="http://facebook.com/username"/> 
													</div> 
												</div> 
												<div className="col-sm-6 col-md-4"> 
													<div className="form-group"> 
														<label className="form-label">Instagram Handle</label> <input type="text" className="form-control" name="instagrampavalue={instagramLink} 
                                                        onChange={(e)=> setInstagramLink(e.target.value)}placeholder="Instagram page link"/> 
													</div> 
												</div> 
												<div className="col-sm-6 col-md-4"> 
													<div className="form-group"> 
														<label className="form-label">Youtube</label> <input type="text" className="form-control" name="youtube" value={youtubeLink} 
                                                        onChange={(e)=> setYoutubeLink(e.target.value)} placeholder=" Youtube"/> 
													</div> 
												</div> 
												<div className="col-sm-6 col-md-4"> 
													<div className="form-group"> 
														<label className="form-label">Twitter Handle</label> <input type="text" className="form-control" name="twitterhandle" value={twitterHandle} 
                                                        onChange={(e)=> setTwitterHandle(e.target.value)} placeholder=" Twitter"/> 
													</div> 
												</div>
												<div className="col-sm-6 col-md-6"> 
													<div className="form-group"> 
														<label className="form-label">Cover Picture</label> 
														<input type="file" className="form-control" name="coverpic"></input> 
													</div> 
												</div>  */}
												<div className="col-md-12"> 
													<div className="form-group mb-0"> 
														<label className="form-label">Bio</label> <textarea rows={5} className="form-control" name="bio" 
                                                        onChange={(e)=> setBio(e.target.value)}placeholder="Enter your bio or favourite qoute" value={bio}></textarea>
														 </div> 
														</div> 
													</div> 
												</div> 
												<div className="card-footer text-right d-flex justify-content-end"> 
													<button type="submit"  className="btn btn-primary ">Update Profile</button> 
												</div> 
											</form> 
										</div> 
									</div>
                                </div>
							</div>
        </div>
        
    </MainBody>
  )
}

export default React.memo(ProfileEdit)