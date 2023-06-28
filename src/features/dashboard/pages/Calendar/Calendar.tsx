import React,{useState,useEffect} from 'react'
import MainBody from '../../components/MainBody'
import { Modal } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Alert from 'sweetalert2'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin,{Draggable} from '@fullcalendar/interaction'
import { formatDate } from '@fullcalendar/core'
import Breadcrum from '../../components/Breadcrum'
import PageHeading from '../../components/PageHeading'


const Calendar = () => {

  const events = [
        {
          title: 'All Day Event',
          start: '2023-04-01'
        },
   
        { 
            title: 'Meeting',
        start: new Date()
     }
]  
const [show, setShow] = useState(false)

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
useEffect(()=>{
    let draggableEl = document.getElementById("external-events")!;
    new Draggable(draggableEl, {
      itemSelector: ".external-event",
      eventData: function(eventEl:any) {
        let title = eventEl.getAttribute("title");
        let className = eventEl.getAttribute("data-class");
        return {
          title: eventEl.innerText.trim(),
          className: className
        };
      }
    });
  
		// calendarApi.Draggable(containerEl, {
		//   itemSelector: '.external-event',
		//   eventData: function(eventEl:any) {
		// 	return {
		// 	  title: eventEl.innerText.trim()
		// 	}
		//   }
		 
		// });
},[])
const handleDateSelect = (selectInfo:any) => {
    let calendarApi = selectInfo.view.calendar
    let title = prompt('Please enter a new title for your event')

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({ // will render immediately. will call handleEventAdd
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      }, true) // temporary=true, will get overwritten when reducer gives new events
    }
  }

  const handleEventClick = (eventClick:any) => {
    // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //   clickInfo.event.remove() // will render immediately. will call handleEventRemove
    // }
    Alert.fire({
        title: eventClick.event.title,
        html:
          `<div class="table-responsive">
        <table class="table">
        <tbody>
        <tr >
        <td>Title</td>
        <td><strong>` +
          eventClick.event.title +
          `</strong></td>
        </tr>
        <tr >
        <td>Start Time</td>
        <td><strong>
        ` +
          eventClick.event.start +
          `
        </strong></td>
        </tr>
        </tbody>
        </table>
        </div>`,
  
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Remove Event",
        cancelButtonText: "Close"
      }).then(result => {
        if (result.value) {
          eventClick.event.remove(); // It will remove event from the calendar
          Alert.fire("Deleted!", "Your Event has been deleted.", "success");
        }
      });
  }

  // handlers that initiate reads/writes via the 'action' props
  // ------------------------------------------------------------------------------------------

 const  handleDates = (rangeInfo:any) => {
    // requestEvents(rangeInfo.startStr, rangeInfo.endStr)
    //   .catch(reportNetworkError)
  }

 const  handleEventAdd = (addInfo:any) => {
    // createEvent(addInfo.event.toPlainObject())
    //   .catch(() => {
    //     reportNetworkError()
    //     addInfo.revert()
    //   })
  }

  const handleEventChange = (changeInfo:any) => {
    // updateEvent(changeInfo.event.toPlainObject())
    //   .catch(() => {
    //     reportNetworkError()
    //     changeInfo.revert()
    //   })
  }

  const handleEventRemove = (removeInfo:any) => {
    // deleteEvent(removeInfo.event.id)
    //   .catch(() => {
    //     reportNetworkError()
    //     removeInfo.revert()
    //   })
  }
  function renderSidebarEvent(plainEventObject:any) {
    return (
      <li key={plainEventObject.id}>
        <b>{formatDate(plainEventObject.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
        <i>{plainEventObject.title}</i>
      </li>
    )
  }
  
  function reportNetworkError() {
    alert('This action could not be completed')
  }
  function handleDropEvent(arg:any) {
    // is the "remove after drop" checkbox checked?
    if ((document.getElementById('drop-remove')as HTMLInputElement).checked) {
      // if so, remove the element from the "Draggable Events" list
      arg.draggedEl.parentNode.removeChild(arg.draggedEl);
    }
  }

function renderEventContent(eventInfo:any) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }
  return (
    <MainBody>
      <div className="container-fluid">
      <PageHeading pageHeading='Dashboard' />
			<Breadcrum pageData={{pageTitle:'Calendar'}}/>

                <div className="row">
                    <div className="col-xl-3 col-xxl-4">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-intro-title">Calendar</h4>

                                <div className="">
                                    <div id="external-events" className="my-3">
                                        <p>Drag and drop your event or click in the calendar</p>
                                        <div className="external-event btn-primary light" data-class="bg-primary"><i className="fa fa-move"></i><span>New Theme Release</span></div>
                                        <div className="external-event btn-warning light" data-class="bg-warning"><i className="fa fa-move"></i>My Event
                                        </div>
                                        <div className="external-event btn-danger light" data-class="bg-danger"><i className="fa fa-move"></i>Meet manager</div>
                                        <div className="external-event btn-info light" data-class="bg-info"><i className="fa fa-move"></i>Create New theme</div>
                                        <div className="external-event btn-dark light" data-class="bg-dark"><i className="fa fa-move"></i>Project Launch</div>
                                        <div className="external-event btn-secondary light" data-class="bg-secondary"><i className="fa fa-move"></i>Meeting</div>
                                    </div>
									<div className="checkbox form-check checkbox-event custom-checkbox pt-3 pb-5">
										<input type="checkbox" className="form-check-input" id="drop-remove" />
										<label className="form-check-label" htmlFor="drop-remove">Remove After Drop</label>
									</div>
                                    <button type='button' onClick={handleShow} className="btn btn-primary btn-event w-100">
                                        <span className="align-middle"><i className="ti-plus me-2"></i></span> Create New
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-9 col-xxl-8">
                        <div className="card">
                            <div className="card-body">
                            <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            droppable={true}
            events={events}
            themeSystem='Solar'
            nowIndicator
            navLinks
            eventResizableFromStart
            eventDurationEditable
            eventStartEditable
            eventDrop ={handleDropEvent}
            weekends={true}
            datesSet={handleDates}
            select={handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={handleEventClick}
            eventAdd={handleEventAdd}
            eventChange={handleEventChange} // called for drag-n-drop/resize
            eventRemove={handleEventRemove}
          />
                                {/* <div id="calendar" className={"app-fullcalendar"}></div> */}
                            </div>
                        </div>
                    </div>
                    
  
{/* <Modal show={show} size="sm" centered backdrop='static'
 onHide={handleClose} animation={false} id="event-modal">
        <Modal.Header closeButton>
          <Modal.Title>Add New Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                
             </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit"  >
            Save Todo          </Button>
        </Modal.Footer>
      </Modal>
                     */}
<Modal show={show} size="lg" centered backdrop='static'
 onHide={handleClose} animation={false} id="add-category">
        <Modal.Header closeButton>
          <Modal.Title>Add a category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                 <form>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label className="control-label form-label">Category Name</label>
                                                <input className="form-control form-white" placeholder="Enter name" type="text" name="category-name" />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="control-label form-label">Choose Category Color</label>
                                                <select className="form-control form-white" data-placeholder="Choose a color..." name="category-color">
                                                    <option value="success">Success</option>
                                                    <option value="danger">Danger</option>
                                                    <option value="info">Info</option>
                                                    <option value="pink">Pink</option>
                                                    <option value="primary">Primary</option>
                                                    <option value="warning">Warning</option>
                                                </select>
                                            </div>
                                        </div>
                                    </form>
                       
             </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="btn btn-danger light waves-effect" data-bs-dismiss="modal" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit"  className="btn btn-primary waves-effect waves-light save-category">
            Save          </Button>
        </Modal.Footer>
      </Modal>
                  
                </div>

            </div>
    </MainBody>
  )
}

export default React.memo(Calendar)