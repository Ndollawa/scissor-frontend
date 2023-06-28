import React,{useState,useEffect} from 'react'
import MainBody from '../../../components/MainBody'
import CreateFaqModal from '../components/CreateNoteForm'
import EditNoteForm from '../components/EditNoteForm'
import { useDispatch } from 'react-redux'
import { useGetNotesQuery } from '../noteApiSlice'
import { setPreloader } from '../../../components/PreloaderSlice'
import pageProps from '../../../../../app/utils/props/pageProps'
import Note from "./Note"

import "./NoteContainer.css"





interface modalDataProps {
   data:{
      id:string | number;
      title: string;
      description: string;
      body: string;
      noteImage: string;
      status: string;
  } | null,
  showModal:boolean,
}
const NoteContainer = ({notes,updateText,deleteNote}:any)  => {
    const dispatch =useDispatch()
    const [modalData,setModalData] = useState<modalDataProps>({
        data:null, 
        showModal:false,
       })
// const {
//     data:notes,
//     isLoading,
//     isSuccess,
//     isError,
//     error
// } = useGetNotesQuery('noteList', {
//     pollingInterval: 15000,
//     refetchOnFocus: true,
//     refetchOnMountOrArgChange: true
// })


    // useEffect(() => {
    //     dispatch(setPreloader(isLoading?true:false)) 
         
    //     }, [isLoading])
  const reverArray = (arr:any) => {
    const array = [];

    for (let i = arr.length - 1; i >= 0; --i) {
      array.push(arr[i]);
    }

    return array;
  };

   notes = reverArray(notes);



 return (
    <>
      <div className="note-container">
  <h2>Notes</h2>
  <div className="note-container_notes custom-scroll">


    {notes?.length > 0 ? (
      notes.map((item:any) => (
        <Note
          key={item.id}
          note={item}
          deleteNote={deleteNote}
          updateText={updateText}
        />
      ))
    ) : (
      <h3>No Notes present</h3>
    )}
  </div>
</div>
    </>
  )
}



export default React.memo(NoteContainer)