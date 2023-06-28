import React,{FormEvent, useEffect,useState,useContext} from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar'
import MainBody from '../../components/MainBody';
import pageProps from '../../../../app/utils/props/pageProps';
import useWindowSize from '../../../../app/utils/hooks/useWindowSize';
import { selectCurrentUser } from '../../../auth/authSlice';
import useUserImage from '../../../../app/utils/hooks/useUserImage';
import { useSelector } from 'react-redux';
import $ from 'jquery'
import { Link } from 'react-router-dom';
// import useSocketIO from '../../../../app/utils/hooks/useSocketIO';
import Notes from './components/Notes';

const Diary:React.FC<pageProps> = ({pageData}:pageProps) => {
	const { width,height } = useWindowSize()
	const currentUser = useSelector(selectCurrentUser)
	const userImage = useUserImage(currentUser)

	// const socket = useSocketIO()
	const [notes, setNotes] = useState('')
	const [attchment, setAttchment] = useState([])
	const [imageUpload, setImageUpload] = useState([])
	const [isUpload, setIsUpload] = useState(false)
	const [room, setRoom] = useState('')
	const [toUser, setToUser] = useState('')

	useEffect(() => {
		const handleChatSidebar = function(){
			$('.chat-hamburger').on('click',function(){
				$('.chat-left-sidebar').toggleClass('show');
			})
		}
		handleChatSidebar()
		const vHeight = function(){
			const ch = height! - 206;
			$(".chatbox .msg_card_body").css('height',ch);
		}
		vHeight()
		const handleDzChatUser = function() {
			$('.dz-chat-user-box .dz-chat-user').on('click',function(){
				$('.dz-chat-user-box').addClass('d-none');
				$('.dz-chat-history-box').removeClass('d-none');
			}); 
			
			$('.dz-chat-history-back').on('click',function(){
				$('.dz-chat-user-box').removeClass('d-none');
				$('.dz-chat-history-box').addClass('d-none');
			}); 
			
			$('.dz-fullscreen').on('click',function(){
				$('.dz-fullscreen').toggleClass('active');
			});
		}
		handleDzChatUser()
	  return () => {
		
	  };
	}, [])


  return (
    <MainBody>
		<div className='container-fuid' style={{position:'relative'}}>
		     <div className="row">
					<div className="col-xl-12">
						<div className="card">
							<div className="card-body chat-wrapper p-0">
								<div className="chat-hamburger">
									<span></span>
									<span></span>
									<span></span>
								</div>
								<div className="chat-left-sidebar">
									<div className="d-flex chat-fix-search align-items-center">
										<img src={userImage} alt="" className="rounded-circle me-3"/>
										<div className="input-group diary-search-area">
											<input type="text" className="form-control" placeholder="Search here.."/>
											<div className="input-group-append">
												<button className="input-group-text"><i className="flaticon-381-search-2"></i></button>
											</div>
										</div>
									</div>
									<div className="card-action card-tabs">
										<ul className="nav nav-tabs style-3" role="tablist">
											<li className="nav-item">
												<a className="nav-link active" data-bs-toggle="tab" href="#AllDiary" role="tab" aria-selected="false">
													All Diary
												</a>
											</li>
											<li className="nav-item">
												<a className="nav-link" data-bs-toggle="tab" href="#Unread" role="tab" aria-selected="false">
													Unread
												</a>
											</li>
											<li className="nav-item">
												<a className="nav-link " data-bs-toggle="tab" href="#Archived" role="tab" aria-selected="true">
													Archived
												</a>
											</li>
										</ul>
									</div>
									<div className="card-body diary-bx px-0 pt-3" >
										<PerfectScrollbar className="tab-content dz-scroll" id="diary-bx">
											<div className="tab-pane fade show active" id="AllDiary" role="tabpanel">
											
											</div>
											<div className="tab-pane fade" id="Unread" role="tabpanel">
												
											</div>
											<div className="tab-pane fade" id="Archived" role="tabpanel">
												
											</div>
										</PerfectScrollbar>
									</div>
								</div>
								<div className="chart-right-sidebar">
									<div className="diary-bx chat-box">
										<div className="d-flex justify-content-between chat-box-header">
											<div className="d-flex align-items-center">
												<img src="dashboard-assets/images/users/pic2.jpg" alt="" className="rounded-circle main-img me-3"/>
												<h5 className="text-black font-w500 mb-sm-1 mb-0 title-nm">Baby Joies</h5>
											</div>
											<div className="d-flex align-items-center">	
												<span className="d-sm-inline-block d-none">Last seen 4:23 AM</span>
												<div className="dropdown ms-2">
													<Link to='#' data-bs-toggle="dropdown" aria-expanded="false">
														<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="../../www.w3.org/2000/svg.html">
															<path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#575757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
															<path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="#575757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
															<path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="#575757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
														</svg>
													</Link>
													<div className="dropdown-menu dropdown-menu-end">
														<Link className="dropdown-item" to="">Edit</Link>
														<Link className="dropdown-item" to="">Delete</Link>
													</div>
												</div>
											</div>	
										</div>
										<PerfectScrollbar className="chat-box-area dz-scroll" id="chartBox" style={{backgroundImage:"url('dashboard-assets/images/chat-bg.png')"}}>
											<div  className="chat">
												<Diary/>
												
											</div>
											
										</PerfectScrollbar>
										
									</div>
								</div>
							</div>
		{/* <div className="fab-container">
		<div className=" fab-btn fab-icon-holder"><i className="fa fa-question"></i></div>
			<ul className="fab-options">
				<li><span className="fab-label">Assign Task</span><div className="fab-icon-holder" id="assign-task"><i className="fa fa-edit"></i></div></li>
				<li><span className="fab-label">Create Todo</span><div className="fab-icon-holder" id="create-todos"><i className="fa fa-calendar"></i></div></li>
				<li><span className="fab-label">Send Memo</span><div className="fab-icon-holder rate" id="send-memo"><i className="icon icon-note "></i></div></li>
				<li><span className="fab-label">Assign Roles</span><div className="fab-icon-holder" id="assign-roles"><i className="icon icon-badge"></i></div></li>
				<li><span className="fab-label">Assign Courses</span><div className="fab-icon-holder" id="assign-courses"><i className="fa fa-graduation-cap"></i></div></li>

					</ul>
			</div> */}
						</div>
					</div>
			</div> 
		</div>
    </MainBody>
  )
}

export default Diary