import React from 'react';
import { Link } from 'react-router-dom';

interface notificationProps{
	toggleNotification:boolean;
}

const Notification = () => {
  return (
	<>
                                    <div id="dlab_W_Notification1" className="widget-media dz-scroll p-3 height380">
										<ul className="timeline">
											<li>
												<div className="timeline-panel">
													<div className="media me-2">
														<img alt="avatar" width="50" src="dashboard-assets/images/avatar/1.jpg"/>
													</div>
													<div className="media-body">
														<h6 className="mb-1">Dr sultads Send you Photo</h6>
														<small className="d-block">29 July 2020 - 02:26 PM</small>
													</div>
												</div>
											</li>
											<li>
												<div className="timeline-panel">
													<div className="media me-2 media-info">
														KG
													</div>
													<div className="media-body">
														<h6 className="mb-1">Resport created successfully</h6>
														<small className="d-block">29 July 2020 - 02:26 PM</small>
													</div>
												</div>
											</li>
											<li>
												<div className="timeline-panel">
													<div className="media me-2 media-success">
														<i className="fa fa-home"></i>
													</div>
													<div className="media-body">
														<h6 className="mb-1">Reminder : Treatment Time!</h6>
														<small className="d-block">29 July 2020 - 02:26 PM</small>
													</div>
												</div>
											</li>
											 <li>
												<div className="timeline-panel">
													<div className="media me-2">
														<img alt="avatar" width="50" src="dashboard-assets/images/avatar/1.jpg"/>
													</div>
													<div className="media-body">
														<h6 className="mb-1">Dr sultads Send you Photo</h6>
														<small className="d-block">29 July 2020 - 02:26 PM</small>
													</div>
												</div>
											</li>
											<li>
												<div className="timeline-panel">
													<div className="media me-2 media-danger">
														KG
													</div>
													<div className="media-body">
														<h6 className="mb-1">Resport created successfully</h6>
														<small className="d-block">29 July 2020 - 02:26 PM</small>
													</div>
												</div>
											</li>
											<li>
												<div className="timeline-panel">
													<div className="media me-2 media-primary">
														<i className="fa fa-home"></i>
													</div>
													<div className="media-body">
														<h6 className="mb-1">Reminder : Treatment Time!</h6>
														<small className="d-block">29 July 2020 - 02:26 PM</small>
													</div>
												</div>
											</li>
										</ul>
									</div>
                                    <Link className="all-notification" to=''>See all notifications <i className="ti-arrow-right"></i></Link>
                                </>
  )
}

export default React.memo(Notification)