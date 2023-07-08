import React,{useEffect} from 'react'
import MainBody from '../../components/MainBody'
import { useSelector } from 'react-redux'
import { useGetUrlQuery } from './urlShortenerApiSlice'
import AnalyticsTableData from './components/AnalyticsTableData'
import { selectCurrentUser } from '../../../auth/authSlice'
import Breadcrum from '../../components/Breadcrum'
import PageHeading from '../../components/PageHeading'
import { useParams,useNavigate } from 'react-router-dom'
import {Chart, CategoryScale,LinearScale} from 'chart.js/auto'
// import { LineController } from 'chart.js/auto'
import {Line} from 'react-chartjs-2'
import DeviceTypeChart from './components/DeviceTypeChart'
import { BiLinkAlt } from 'react-icons/bi'
import { FaUsers } from 'react-icons/fa'
import { MdTraffic } from 'react-icons/md'
import { HiUsers } from 'react-icons/hi2'
// import useDataTables from '../../../../app/utils/initDataTables'



const URLAnalytics:React.FC =  () =>{
    const {id} = useParams()
    const navigate = useNavigate()
    const currentUser = useSelector(selectCurrentUser)
	if(!id){
        navigate('/error/404')
    }

const { url } = useGetUrlQuery("urlList", {
    selectFromResult: ({ data }) => ({
        url: id && data?.entities[id]
    }),
})
    Chart.register(CategoryScale,LinearScale)

    if(!url){
        navigate('/error/404')
} else if(url?.user !== currentUser?._id){ 
     navigate('/error/402')} 

  

   
const currentDate = new Date();
const labels = [];
const dataPoints = [];

for (let i = 6; i >= 0; i--) {
  const date = new Date(currentDate);
  date?.setDate(currentDate?.getDate() - i);

  const formattedDate =  new Date(date).toLocaleString('en-US', { day: 'numeric', month: 'short', year:'numeric' })//formatDate(date); Helper function to format date as required

  const trafficCount = url?.traffic?.filter((entry:any) => {
    return entry?.date?.toDateString() === date?.toDateString();
  }).length;

  labels.push(formattedDate);
  dataPoints.push(trafficCount);
}
// Helper function to format date as 'YYYY-MM-DD'
function formatDate(date:Date) {
  const year = date?.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date?.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


let tableContent = url && url?.traffic?.map((c:any ,i:number) => <AnalyticsTableData key={c?._id} url={c} index={i} />)
const currentDay = currentDate?.getDate();
const currentMonth = currentDate?.getMonth();
const currentYear = currentDate?.getFullYear();
const currentWeekStart = new Date(currentDate.setDate(currentDay - currentDate.getDay()));
const currentMonthStart = new Date(currentYear, currentMonth, 1);

let dailyTraffic = 0;
let weeklyTraffic = 0;
let monthlyTraffic = 0;

  url && url?.traffic?.forEach((t:any)=>{
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
});


  function detectDeviceType(userAgent:string) {
    if (/mobile|iphone|ipad|ipod|android|blackberry|opera mini|iemobile|wpdesktop/i.test(userAgent)) {
      return 'Mobile';
    } else if (/ipad/i.test(userAgent)) {
      return 'Tablet';
    } else {
      return 'Laptop';
    }
  }
// Initialize data objects for Morris.js 5
const morrisData = [];
const deviceCounts: any = {} ;

// Loop through the traffic data
url?.traffic?.forEach((entry:any) => {
  const deviceType =  detectDeviceType(entry?.userAgent);

  // Increment the device count
  deviceCounts[deviceType] = (deviceCounts[deviceType] || 0) + 1;
});

// Generate data for Morris.js
for (const deviceType in deviceCounts) {
  if (deviceCounts.hasOwnProperty(deviceType)) {
    morrisData.push({
      label: deviceType,
      value: deviceCounts[deviceType],
    });
  }
}
// const table = document.getElementById('dataTable')!
// console.log(table)
// useDataTables(table,"Generated Links")
 return (
	<MainBody>
	<div className="container-fluid">
	<PageHeading pageHeading='Analytics' />
	<Breadcrum pageData={{pageTitle:'Analytics'}}/>


<div className="row">
					<div className="col-xl-3 col-sm-6 m-t35">
						<div className="card card-coin">
							<div className="card-body text-center">
								
								 <h2 className="text-black mb-2 font-w600">
								<BiLinkAlt fontSize={'3rem'}/>	{url?.traffic?.length}
								</h2>
								<p className="mb-0 fs-14">
								
									Total clicks
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
		<div className="row col-12">
        <div className="col-xl-6 col-lg-12 col-sm-12">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Monthly Traffic</h4>
                    </div>
                    <div className="card-body">
                        <Line 
                        data={{
                        labels: labels,
                        datasets: [
                            {
                                label: "Clicks",
                                data: dataPoints,
                                borderColor: 'rgba(235, 129, 83, 1)',
                                borderWidth: 2,
                                backgroundColor: 'transparent',  
                                pointBackgroundColor: 'rgba(235, 129, 83, 1)'
                            }
                        ]
                    }}
                        />
                         </div>
                </div>
            </div>		
            <div className="col-xl-6 col-lg-6">
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-title">Devices</h4>
                                    </div>
                                    <div className="card-body">
                                       
      <DeviceTypeChart data={morrisData} />
                                     </div>
                                </div>
                            </div>
                            <div className="card  col-md-12 col-sm-12 card-body">
                            <div className="table-responsive table-scrollable">
									<table id="dataTable" className="table table-striped mt-10 table-bordered table-hover table-checkable order-column valign-middle border mb-0 align-items-centerid" style={{minWidth: '845px'}}>
										<thead>
											<tr>
												<th>S/N</th>
												<th style={{maxWidth:'250px'}}>Referred From</th>
												<th style={{maxWidth:'250px'}}>User Agent</th>
												<th>Ip Address</th>
												<th>Region</th>
												<th>country</th>
												<th>Timezone</th>
												<th>ISPN</th>
												<th>Date Viewed</th>
											</tr>
										</thead>
										<tbody>
										   
										   
										   {tableContent}
										
										</tbody>
									</table>
                                 </div>
							</div>
                            {/* <div className="col-md-4 col-sm-12">
                            <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-title">Map</h4>
                                    </div>
                                    <div className="card-body">
                                       <CountryChart />
                                     </div>
                                </div>
                            </div> */}
			 </div>
         </div>
	</MainBody>
    )
}

export default React.memo(URLAnalytics)