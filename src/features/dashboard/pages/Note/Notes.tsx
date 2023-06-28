    import React,{useState,useEffect} from 'react'
    import MainBody from '../../components/MainBody'
    import { MdSearch } from 'react-icons/md';
    import NoteContainer from "./components/NoteContainer"
    import Sidebar from "./components/Sidebar/Sidebar";
    import './NoteApp.css'
import Breadcrum from '../../components/Breadcrum';
import PageHeading from '../../components/PageHeading';
import useDebounce from '../../../../app/utils/hooks/useDebounce'
    
    const Note = ()=> {
      const [notes, setNotes] = useState(
        JSON.parse(localStorage?.getItem("notes-app")!) || []
      );
    const [search, setSearch] = useState('')
    
const debouncedQuery = useDebounce(search)
      const handleSearchNote = (data:any) => data?.filter((n:any)=>n.text?.toLowerCase()?.includes(debouncedQuery))
  
    
      const addNote = (color:string) => {
        const tempNotes = [...notes];
    
        tempNotes.push({
          id: Date.now() + "" + Math.floor(Math.random() * 78),
          text: "",
          time: Date.now(),
          color,
        });
        setNotes(tempNotes);
      };
    
      const deleteNote = (id:any) => {
        const tempNotes = [...notes];
    
        const index = tempNotes?.findIndex((item) => item.id === id);
        if (index < 0) return;
    
        tempNotes?.splice(index, 1);
        setNotes(tempNotes);
      };
    
      const updateText = (text:string, id:any) => {
        const tempNotes = [...notes];
    
        const index = tempNotes?.findIndex((item) => item.id === id);
        if (index < 0) return;
    
        tempNotes[index].text = text;
        setNotes(tempNotes);
      };
    
      useEffect(() => {
        localStorage.setItem("notes-app", JSON.stringify(notes));
      }, [notes]);

     return (
        <>
        <MainBody>
        <div className="container-fluid ">
          
	<PageHeading pageHeading='Notes' />
	<Breadcrum pageData={{pageTitle:'Notes'}}/>
          <div className='d-flex justify-content-center'>
		<div className='search'><MdSearch className='search-icons' size='2em' />
			<input
      className='form-control border-0 outline-0'
				onChange={(event) =>
					setSearch(event.target.value)
				}
				type='text'
				placeholder='type to search...'
			/>
		</div>
    </div>
    <div className='NoteApp'>
        <Sidebar addNote={addNote} />
      <NoteContainer
        notes={handleSearchNote(notes) }
        deleteNote={deleteNote}
        updateText={updateText}
      />
      </div>
     </div>
        </MainBody>
        </>
      )
    }



export default React.memo(Note)