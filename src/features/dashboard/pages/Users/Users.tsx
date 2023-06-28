    import React,{useState,useEffect} from 'react'
    import MainBody from '../../components/MainBody'
    import { useDispatch } from 'react-redux'
    import { useGetUsersQuery } from './usersApiSlice'
    import { setPreloader } from '../../components/PreloaderSlice'
    import pageProps from '../../../../app/utils/props/pageProps'
    import UsersTableData from './components/UsersTableData'
    import useToggle from '../../../../app/utils/hooks/useToggle'
import UserCard from './components/UserCard'
import { FaListAlt } from 'react-icons/fa'
import { IoGridOutline } from 'react-icons/io5'
    

    
interface modalDataProps {
    data:{
       user:any;
   } | null,
   showModal:boolean,
 }

    const Users = ({pageData}:pageProps)  => {

// const [users, setusers] = useState<any>([])
    const [viewType,toggleViewType] = useToggle('viewType','List');
    const dispatch =useDispatch()
  
    const {
        data:users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('userList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
   
        useEffect(() => {
            dispatch(setPreloader(isLoading?true:false)) 
             
            }, [isLoading])

            const [modalData,setModalData] = useState<modalDataProps>({
                data:null, 
                showModal:false,
                })
          const showEditForm = (modalData:modalDataProps)=>{
                 setModalData(modalData);
                 }
         
          let tableContent
        
let usersCard
   if(isSuccess){
usersCard = users.ids? users?.ids.map((userId:any)=> <UserCard key={userId}  userId={userId} />): null 
tableContent = users?.ids?.length
    ? users?.ids.map((userId:string|number ,i:number) => <UsersTableData key={userId} userId={userId} index={i}
    showEditForm={showEditForm} />
)
    : null
   }
    const setView = ()=>{
        if(viewType){
        toggleViewType(false)
        }else{
        toggleViewType(true)
        }
    }
     return (
        <>
        <MainBody>
        <div className="container-fluid">
            <div className="row">
            <div className="col-12">
            <div className="card-body d-flex justify-content-between align-items-center">
								<div>
									<h4>Users {viewType? "List": "Card"} View</h4>
									<span>Lorem ipsum sit amet</span>
								</div>
								<button className="btn btn-info light" onClick={setView}>{viewType? <FaListAlt fontSize={'1.2rem'}/> : <IoGridOutline fontSize={'1.2rem'} />}</button>
							</div>
                            </div>
                       {viewType? 
                        (
                            <>  <div className="card">
                            <div className="mb-5 d-flex">
                                               
                                               {/* <CreateUserForm/> */}
                                               </div>
                                    <div className="card-body">
                                       <div className="table-responsive table-scrollable">
                                                   <table id="dataTable" className="table table-striped mt-10 table-bordered table-hover table-checkable order-column valign-middle border mb-0 align-items-centerid" style={{minWidth: '845px'}}>
                                                       <thead>
                                                           <tr>
                                                               <th>S/N</th>
                                                               <th>Name</th>
                                                               <th>Username</th>
                                                               <th>Verification Status</th>
                                                               <th>Country</th>
                                                               <th>Account Status</th>
                                                               <th>Date Created</th>
                                                               <th>Action</th>
                                                           </tr>
                                                       </thead>
                                                       <tbody>
                                                          
                                                          
                                                          {tableContent}
                                                       
                                                       </tbody>
                                                   </table>
                                               </div>
                                           </div>
                                       </div>
                                   </>
                        )
                        :
                          <>{ usersCard}</>
                          } 
                        </div>
                    </div>
        </MainBody>
        </>
      )
    }
    

export default React.memo(Users)