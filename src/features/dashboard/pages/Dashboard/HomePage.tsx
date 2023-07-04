import React,{useState,useEffect} from 'react'
import MainBody from '../../components/MainBody'
import CreateUrlModal from './components/CreateUrlForm'
import EditUrlForm from './components/EditUrlForm'
import { useDispatch,useSelector } from 'react-redux'
import { useGetUrlQuery } from './urlShortenerApiSlice'
import pageProps from '../../../../app/utils/props/pageProps'
import UrlTableData from './components/UrlTableData'
import { selectCurrentUser } from '../../../auth/authSlice'
import { urlProps } from '../../../../app/utils/props/urlProps'
import Breadcrum from '../../components/Breadcrum'
import PageHeading from '../../components/PageHeading'
import { BiLinkAlt } from 'react-icons/bi'
import { FaUsers } from 'react-icons/fa'
import { MdTraffic } from 'react-icons/md'
import { HiUsers } from 'react-icons/hi2'
import initDataTables, { destroyDataTables } from '../../../../app/utils/initDataTables'





interface modalDataProps {
   data:{
	_id:string | number;
	originalURL: string;
	user: string;
	traffic:any;
	shortURL: string;
	clicks: number;
	status: string;
  } | null,
  showModal:boolean,
}
const Home = ({pageData}:pageProps)  => {
	const dispatch =useDispatch()
const currentUser = useSelector(selectCurrentUser)
	const [modalData,setModalData] = useState<modalDataProps>({
		data:null, 
		showModal:false,
	   })
	   const { urls } = useGetUrlQuery("urlList", {
        selectFromResult: ({ data }) => ({
            urls: data?.ids?.map((id:string)=> data?.entities[id]).filter((u:urlProps)=> u?.user === currentUser?._id)
        }),
    })
const showEditForm = (modalData:modalDataProps)=>{
	setModalData(modalData);
	}

	// useEffect(() => {
	// 	dispatch(setPreloader(true)) 
	// 	 return ()=>{

	// 	dispatch(setPreloader(false)) 
	// 	 }
	// 	}, [])
let tableContent = urls && urls?.map((url:urlProps ,i:number) => <UrlTableData key={url?._id} url={url} index={i}
showEditForm={showEditForm} />
)


const currentDate = new Date();
const currentDay = currentDate?.getDate();
const currentMonth = currentDate?.getMonth();
const currentYear = currentDate?.getFullYear();
const currentWeekStart = new Date(currentDate?.setDate(currentDay - currentDate?.getDay()));
const currentMonthStart = new Date(currentYear, currentMonth, 1);

let dailyTraffic = 0;
let weeklyTraffic = 0;
let monthlyTraffic = 0;


  urls && urls?.forEach((url:urlProps) => url?.traffic?.forEach((t:any)=>{
 const entryDate = t?.createdAt;
  if (entryDate?.getDate() === currentDay) {
    dailyTraffic++;
  }
  if (
    entryDate >= currentWeekStart &&
    entryDate <= currentDate
  ) {
    weeklyTraffic++;
  }
  if (
    entryDate?.getMonth() === currentMonth &&
    entryDate?.getFullYear() === currentYear
  ) {
    monthlyTraffic++;
  }
}));

// useEffect(() => {

//   destroyDataTables($('#dataTable'))
//     initDataTables($('#dataTable'),"Generated Links")
//   return () => {
//    destroyDataTables($('#dataTable'))
//   }
// }, [])

 return (
	<>
	<MainBody>
	<div className="container-fluid">
	<PageHeading pageHeading='Dashboard' />
	<Breadcrum pageData={{pageTitle:'Dashboard'}}/>
	<div className="row">
					<div className="col-xl-3 col-sm-6 m-t35">
						<div className="card card-coin">
							<div className="card-body text-center">
								
								 <h2 className="text-black mb-2 font-w600">
								<BiLinkAlt fontSize={'3rem'}/>	{urls?.length}
								</h2>
								<p className="mb-0 fs-14">
								
									Total Links Generated
								</p>	
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-sm-6 m-t35">
						<div className="card card-coin">
							<div className="card-body text-center">
								
								 <h2 className="text-black mb-2 font-w600">
								<FaUsers fontSize={'3rem'}/>	{dailyTraffic}
								</h2>
								<p className="mb-0 fs-14">
								
									Total Traffic Today
								</p>	
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-sm-6 m-t35">
						<div className="card card-coin">
							<div className="card-body text-center">
								
								 <h2 className="text-black mb-2 font-w600">
								<MdTraffic fontSize={'3rem'}/>	{weeklyTraffic}
								</h2>
								<p className="mb-0 fs-14">
								
									Total Weekly Traffic
								</p>	
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-sm-6 m-t35">
						<div className="card card-coin">
							<div className="card-body text-center">
								
								 <h2 className="text-black mb-2 font-w600">
								<HiUsers fontSize={'3rem'}/>	{monthlyTraffic}
								</h2>
								<p className="mb-0 fs-14">
								
									Monthly Traffic
								</p>	
							</div>
						</div>
					</div>
					
				</div>
		<div className="col-12">
						<div className="card">
							<div className="card-header">
								<h4 className="card-title fs-16 fw-bold">Generated Links</h4>
							</div>
							<div className="card-body">

								<div className="d-flex">
								
					<CreateUrlModal/>
					<EditUrlForm modalData={modalData}/>
								</div>
						<div className="table-responsive table-scrollable">
									<table id="dataTable" className="table table-striped mt-10 table-bordered table-hover table-checkable order-column valign-middle border mb-0 align-items-centerid" style={{minWidth: '845px'}}>
										<thead>
											<tr>
												<th>S/N</th>
												<th>Original URL</th>
												{/* <th>Description</th> */}
												<th>Status</th>
												<th>Click / Views</th>
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
					</div>
			 </div>
	</MainBody>
	</>
  )
}


export default React.memo(Home)