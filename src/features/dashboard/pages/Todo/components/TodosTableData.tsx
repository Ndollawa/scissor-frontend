import React from 'react'
import {useGetTodosQuery,useDeleteTodoMutation } from '../todosApiSlice'
import showToast from '../../../../../app/utils/hooks/showToast'
import Swal from 'sweetalert2'

interface modalDataProps {
    modalData:{
       data:{
          id:string | number;
          title: string;
          description: string;
          image: string;
          status: string;
      } | null,
      showModal:boolean,
    } 
    }
const TodoTableData = ({todoId,index,showEditForm}:any) => {
    const { todo } = useGetTodosQuery("todosList", {
        selectFromResult: ({ data }) => ({
            todo: data?.entities[todoId]
        }),
    })


    const [deleteTodo, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }]:any = useDeleteTodoMutation()
    const onDeleteTodo = async () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-sm m-2 btn-success',
              cancelButton: 'btn btn-sm m-2 btn-danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then(async(result) => {
            if (result.isConfirmed) {  
              await deleteTodo({ _id: todoId })
        if(isDelError) return showToast('error',JSON.stringify(delerror?.data))
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'Todo has been deleted.',
                'success'
              )
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelled',
                'Operation aborted, entry is safe  :)',
                'error'
              )
            }
          })
      
    }
// 

    if (todo) {
        const created = new Date(todo.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year:'numeric' })
        const todoData = {
        data:{
        id:todoId,
        title:todo.title,
        description:todo.description,
        image:todo.image,
        status:todo.status

        },
        showModal:true
    }
    let todoStatus
    switch (todo.status) {
    case 'active':
        todoStatus =<span className="badge badge-success">{todo.status}</span>
        break;
    case 'inactive':
        todoStatus =<span className="badge badge-warning">{todo.status}</span>
        break;
   
    default:
        todoStatus = ""
        break;
}
        return (
            <tr key={todoId}>
                    <td>{++index}</td>
                    <td><img src={process.env.REACT_APP_BASE_URL+"/uploads/todo/"+todo.image} alt="" width="40" /></td>
                    <td>{todo.title}</td>
                    <td>{todo.description}</td>
                    <td>{todoStatus}</td>
                    <td><i className="fa fa-users"></i>&ensp; ({todo.members.length})</td>
                    <td>{created}</td>
                    <td>
                    <div className="d-flex">
                            <button type="button" className="btn btn-primary shadow btn-xs sharp me-1"   onClick={()=>showEditForm(todoData)}><i className="fas fa-pencil-alt"></i></button>
                            <button className="btn btn-danger shadow btn-xs sharp" onClick={onDeleteTodo}><i className="fa fa-trash"></i></button>
                        </div>													
                    </td>												
                </tr>
        )
    
    } else return null
  
}

export default React.memo(TodoTableData)