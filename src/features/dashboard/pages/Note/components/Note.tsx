import React from 'react'
import {useGetNotesQuery,useDeleteNoteMutation } from '../noteApiSlice'
import showToast from '../../../../../app/utils/hooks/showToast'
import LightGallery from 'lightgallery/react'
import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-zoom.css'
// import 'lightgallery/css/lg-thumbnail.css'
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
// import 'lightgallery/css/lg-thumbnail.css'
import $ from 'jquery'
import Swal  from 'sweetalert2'
import deleteIcon from "../assets/delete.svg";

import "./Note.css";



interface modalDataProps {
    modalData:{
       data:{
          id:string | number;
          title: string;
          description: string;
          body: string;
          image: string;
          status: string;
      } | null,
      showModal:boolean,
    } 
    }
const Note = ({note,deleteNote,updateText, noteId,index,showEditForm}:any) => {
    // const { note } = useGetNotesQuery("notesList", {
    //     selectFromResult: ({ data }) => ({
    //         note: data?.entities[noteId]
    //     }),
    // })


    // const [deleteNote, {
    //     isSuccess: isDelSuccess,
    //     isError: isDelError,
    //     error: delerror
    // }]:any = useDeleteNoteMutation()
    // const onDeleteNote = async () => {
    //     const swalWithBootstrapButtons = Swal.mixin({
    //         customClass: {
    //           confirmButton: 'btn btn-sm m-2 btn-success',
    //           cancelButton: 'btn btn-sm m-2 btn-danger'
    //         },
    //         buttonsStyling: false
    //       })
          
    //       swalWithBootstrapButtons.fire({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonText: 'Yes, delete it!',
    //         cancelButtonText: 'No, cancel!',
    //         reverseButtons: true
    //       }).then(async(result) => {
    //         if (result.isConfirmed) {  
    //     await deleteNote({ _id: noteId })
    //     if(isDelError) return showToast('error',JSON.stringify(delerror?.data))
    //           swalWithBootstrapButtons.fire(
    //             'Deleted!',
    //             'Note has been deleted.',
    //             'success'
    //           )
    //         } else if (
    //           /* Read more about handling dismissals below */
    //           result.dismiss === Swal.DismissReason.cancel
    //         ) {
    //           swalWithBootstrapButtons.fire(
    //             'Cancelled',
    //             'Operation aborted, entry is safe  :)',
    //             'error'
    //           )
    //         }
    //       })
      
    // }
let timer = 500, timeout:any;
  const formatDate = (value:any) => {
    if (!value) return "";

    const date = new Date(value);
    const monthNames = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    let hrs:any = date.getHours();
    let amPm = hrs >= 12 ? "PM" : "AM";
    hrs = hrs ? hrs : "12";
    hrs = hrs > 12 ? (hrs = 24 - hrs) : hrs;

    let min:any = date.getMinutes();
    min = min < 10 ? "0" + min : min;

    let day = date.getDate();
    const month = monthNames[date.getMonth()];

    return `${hrs}:${min} ${amPm} ${day} ${month}`;
  };

  const debounce = (func:any) => {
    clearTimeout(timeout);
    timeout = setTimeout(func, timer);
  };

  const updateTextFunc = (text:any, id:any) => {
    debounce(() => updateText(text, id));
  };


        return (
           <div className="note" style={{ backgroundColor: note.color }}>
      <textarea
        className="note_text"
        defaultValue={note.text}
        onChange={(event) => updateTextFunc(event.target.value, note.id)}
      />
      <div className="note_footer">
        <p className='text-black'>{formatDate(note.time)}</p>
        <img
          src={deleteIcon}
          alt="DELETE"
          onClick={() => deleteNote(note.id)}
        />
      </div>
    </div> 
        )
    
    
  
}


export default React.memo(Note)