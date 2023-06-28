import React from 'react'
import {useGetUsersQuery, useDeleteUserMutation } from '../usersApiSlice'
import showToast from '../../../../../app/utils/hooks/showToast'
import useUserImage from '../../../../../app/utils/hooks/useUserImage'
import { Link } from 'react-router-dom'
import { FaEye } from 'react-icons/fa'
import Swal from 'sweetalert2'

interface modalDataProps {
    modalData:{
       data:{
          user:any;
      } | null,
      showModal:boolean,
    } 
    }
const UserTableData = ({userId,index,showEditForm}:any) => {
    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[userId]
        }),
      })   

    const userImage = useUserImage(user)

    const [deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }]:any = useDeleteUserMutation()
    const onDeleteUser = async () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-sm m-2 btn-success',
              cancelButton: 'btn btn-sm m-2 btn-danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then(async(result) => {
            if (result.isConfirmed) {  
        await deleteUser({ _id: user._id })
        if(isDelError) return showToast('error',JSON.stringify(delerror?.data))
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'User has been deleted.',
                'success'
              )
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelled',
                'Operation aborted, entry is safe  :)',
                'error'
              )
            }
          })
      
    }
// 
console.log(user)
    
    if (user) {
        const userData = {
        data:{
       user
        },
        showModal:true
    }
        const created = new Date(user.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year:'numeric' })
        let acctStatus;
        switch (user.accountStatus) {
        case 'pending':
            acctStatus =<span className="badge badge-primary">{user.accountStatus}</span>
            break;
        case 'active':
            acctStatus =<span className="badge badge-success">{user.accountStatus}</span>
            break;
        case 'banned':
            acctStatus =<span className="badge badge-danger">{user.accountStatus}</span>
            break;
        case 'blocked':
            acctStatus =<span className="badge badge-danger">{user.accountStatus}</span>
            break;
        case 'disabled':
            acctStatus =<span className="badge badge-info">{user.accountStatus}</span>
            break;
        case 'deactivated':
            acctStatus =<span className="badge badge-danger">{user.accountStatus}</span>
            break;
        case 'deleted':
            acctStatus =<span className="badge badge-danger">{user.accountStatus}</span>
            break;
    
        default:
            acctStatus = ""
            break;
    }
    let verificationStatus
        switch (user.verificationStatus) {
        case 'verified':
            verificationStatus =<span className="badge badge-primary"></span>
            break;
        case 'unverified':
            verificationStatus =<span className="badge badge-success"></span>
            break;
       
        default:
            verificationStatus = ""
            break;
    }
    
        return (
            <tr role="row" className="odd" key={user._id}>
										<td className="sorting_1">
											<h6>{++index}.</h6>
										</td>
										<td>
											<div className="media style-1">
												<img src={userImage} className="img-fluid me-2" alt={user.username}/>
												<div className="media-body">
													<h6>{user?.firstName && user?.lastName && user?.firstName+" "+user?.lastName}</h6>
													<span><a href={`mailto:${user.email}}`}>{user.email}</a></span>
													<span><a href={`tel:${user.phone}}`}>{user.phone}</a></span>
												</div>
											</div>
										</td>
										<td>
											{user.username}
										</td>
										<td>
											{verificationStatus}
										</td>
										<td>
											<div>
												<h6>{user.country}</h6>
												{/* <span>COde:En</span> */}
											</div>
										</td>
										<td>{acctStatus}</td>
										<td>
											<div>
												<h6 className="text-primary">{created}</h6>
												{/* <span>Paid</span> */}
											</div>
										</td>
										<td>
											<div className="d-flex action-button">
												<button className="btn btn-info btn-xs light px-2"   onClick={()=>showEditForm(userData)}>
													<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M17 3C17.2626 2.73735 17.5744 2.52901 17.9176 2.38687C18.2608 2.24473 18.6286 2.17157 19 2.17157C19.3714 2.17157 19.7392 2.24473 20.0824 2.38687C20.4256 2.52901 20.7374 2.73735 21 3C21.2626 3.26264 21.471 3.57444 21.6131 3.9176C21.7553 4.26077 21.8284 4.62856 21.8284 5C21.8284 5.37143 21.7553 5.73923 21.6131 6.08239C21.471 6.42555 21.2626 6.73735 21 7L7.5 20.5L2 22L3.5 16.5L17 3Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
													</svg>
												</button>
                                                <Link to={`/dashboard/users/user/${user._id}`} className='btn btn-primary btn-xs light px-2 ms-2'>
                                                    <FaEye fontSize={'1.2rem'}/>
                                                </Link>
												<button className="ms-2 btn btn-xs px-2 light btn-danger" onClick={onDeleteUser}>
													<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M3 6H5H21" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
														<path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
													</svg>

												</button>
											</div>
										</td>
									</tr>
        
        )
    
    } else return null
  
}

export default React.memo(UserTableData)
