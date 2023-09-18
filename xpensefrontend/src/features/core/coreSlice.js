import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchusers = createAsyncThunk('expenses/fetchusers', 
    async (data) => {
        const response = await axios.post('http://localhost:8000/users/listusers/', data, {withCredentials:true});
        // console.log(response.data, response);
        return response.data;
    }
);

// export const fetchuserinfo = createAsyncThunk('expenses/fetchusers', 
//     async () => {
//         const response = await axios.get('http://localhost:8000/user/'+'', {withCredentials:true});
//         // console.log(response.data, response);
//         return response.data;
//     }
// );

const initialState = {
    userslist: [],
    status: 'idle',
    filterStack: [],
}

export const expenseSlice = createSlice({
    name:'expenses', 
    initialState, 
    reducers:{
        setUsersList: (state, action) => {
            state.userslist = action.payload;
        },
        setFilterStack: (state, action) => {
            state.filterStack = [...state.filterStack, action.payload];
        },
    },
    extraReducers(builder) {
        builder
        .addCase(fetchusers.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(fetchusers.fulfilled, (state, action) => {
            state.status = "succeeded";
            console.log(state.status, "INSIDE BUILDER")
            state.userslist = action.payload.data;
        })
    }
});

export const {setUsersList, setFilterStack} = expenseSlice.actions; 



export default expenseSlice.reducer;



// const initialState = {
//   expenseList: [],
//   usersList: [],
//   error: null,
// }

// export const fetchExpenses = createAsyncThunk('expenses/fetchExpenses', 
//   async () => {
//   const response = await axios.get(`${API_URL}/expenses/list`)
//   return response.data
// })

// export const addNewExpense = createAsyncThunk('posts/addNewExpense',
//   async (data) => {
//     const response = await axios.post(`${API_URL}/expenses/`, data)
//     return response.data
//   }
// )
// // Start here

// const postsSlice = createSlice({
//   name: 'posts',
//   initialState,
//   reducers: {
//     reactionAdded(state, action) {
//       const { postId, reaction } = action.payload
//       const existingPost = state.posts.find((post) => post.id === postId)
//       if (existingPost) {
//         existingPost.reactions[reaction]++
//       }
//     },
//     postUpdated(state, action) {
//       const { id, title, content } = action.payload
//       const existingPost = state.posts.find((post) => post.id === id)
//       if (existingPost) {
//         existingPost.title = title
//         existingPost.content = content
//       }
//     },
//   },
//   extraReducers(builder) {
//     builder
//       .addCase(fetchPosts.pending, (state, action) => {
//         state.status = 'loading'
//       })
//       .addCase(fetchPosts.fulfilled, (state, action) => {
//         state.status = 'succeeded'
//         // Add any fetched posts to the array
//         state.posts = state.posts.concat(action.payload)
//       })
//       .addCase(fetchPosts.rejected, (state, action) => {
//         state.status = 'failed'
//         state.error = action.error.message
//       })
//       .addCase(addNewPost.fulfilled, (state, action) => {
//         state.posts.push(action.payload)
//       })
//   },
// })

// export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

// export default postsSlice.reducer

// export const selectAllPosts = (state) => state.posts.posts

// export const selectPostById = (state, postId) =>
//   state.posts.posts.find((post) => post.id === postId)
