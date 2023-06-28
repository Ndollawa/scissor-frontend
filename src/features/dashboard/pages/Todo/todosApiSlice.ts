import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { RootState } from "@reduxjs/toolkit/dist/query/core/apiState";
import { apiSlice } from "../../../../app/api/apiSlice";
// import todoProps from "../../../../app/utils/props/todoProps";
// interface todosProp extends  todoProps{}


const todosAdapter = createEntityAdapter({
    // sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = todosAdapter.getInitialState()

export const todosApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTodos: builder.query<any, any>({
            query: () => ({
                url: '/todos',
                validateStatus: (response:any, result:any) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: (responseData:any) => {
                const loadedTodos = responseData.map((todo:any) => {
                    todo.id = todo._id
                    return todo
                });
                return todosAdapter.setAll(initialState, loadedTodos)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Todo', id: 'LIST' },
                        ...result.ids.map((id:string) => ({ type: 'Todos', id }))
                    ]
                } else return [{ type: 'Todo', id: 'LIST' }]
            }
        }),
        addNewTodo: builder.mutation({
            query: todo => ({
                url: '/todos',
                method: 'POST',
                body: todo
            }),
            invalidatesTags: [
                { type: 'Todo', id: "LIST" }
            ]
        }),
        updateTodo: builder.mutation({
            query: todo => ({
                url: '/todos',
                method: 'PATCH',
                body: todo,
                
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Todo', id: arg.id }
            ]
        }),
        deleteTodo: builder.mutation({
            query: ({ _id }) => ({
                url: `/todos`,
                method: 'DELETE',
                body: { _id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Todo', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetTodosQuery,
    useAddNewTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
} = todosApiSlice

// returns the query result object
export const selectTodosResult = todosApiSlice.endpoints.getTodos.select("Todos")

// creates memoized selector
const selectTodosData = createSelector(
    selectTodosResult,
    todosResult => todosResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllTodos,
    selectById: selectTodoById,
    selectIds: selectTodoIds
    // Pass in a selector that returns the notes slice of state
} = todosAdapter.getSelectors((state:any) => selectTodosData(state) ?? initialState)