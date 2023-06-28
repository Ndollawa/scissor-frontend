import React from 'react';
import { Link } from 'react-router-dom';

interface alertProps{
	toggleAlert:boolean;
}
//bages [info, danger, success,primary, warning]
const Notice = () => {
  return (
    <div id="DZ_W_TimeLine11" className="widget-timeline dz-scroll style-1 height370">
										<ul className="timeline">
											<li>
												<div className="timeline-badge primary"></div>
												<Link className="timeline-panel text-muted" to="">
													<span>10 minutes ago</span>
													<h6 className="mb-0">Youtube, a video-sharing website, goes live <strong className="text-primary">$500</strong>.</h6>
												</Link>
											</li>
											
										</ul>
									</div>
  )
}

export default React.memo(Notice)