import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchusers = createAsyncThunk('expenses/fetchusers', 
    async (data={"filters": ''}) => {
        const response = await axios.post('http://localhost:8000/users/listusers/', data, {withCredentials:true});
        console.log(response.data, response, "INSIDE FETCH USERS");
        return response.data;
    }
);

export const fetchsingleuser = createAsyncThunk('expenses/fetchsingleuser', 
    async (userid) => {
        try{
            const response = await axios.post('http://localhost:8000/users/getsingleuser/', {"userid": userid}, {withCredentials: true});
            console.log(response, response.data, "TESTING IN SIGNLE USER")
            return response.data;
        }
        catch(error) {
            console.log(error);
        }
    }
)

export const updateuserinfo = createAsyncThunk('expenses/updateuser', 
    async (enteredData) => {
        try {
            const response = await axios.put('http://localhost:8000/users/updateuser/', enteredData, {withCredentials:true});
            console.log(response.data);
            return response.data;
        }
        catch(errors) {
            console.log(errors, 'update thunk');
        }
    }
);

export const deleteuserbyadmin = createAsyncThunk('expenses/deleteuserbyadmin', 
    async (id) => {
        try {
            const response = await axios.post('http://localhost:8000/users/deleteuserbyadmin/', {"userid": id}, {withCredentials:true});
            console.log(response.data);
            return response.data;
        }
        catch(errors) {
            console.log(errors, 'delete thunk');
        }
    }
);

export const registrationrequestsbyadmin = createAsyncThunk('expenses/registrationrequestsbyadmin', 
    async () => {
        try {
            const response = await axios.get('http://localhost:8000/users/registrationrequests/', {withCredentials:true});
            console.log(response.data);
            return response.data;
        }
        catch(errors) {
            console.log(errors, 'requests thunk');
        }
    }
);

export const changeregistrationstatus = createAsyncThunk('expenses/changeregistrationstatus', 
    async (data) => {
        try {
            const response = await axios.post('http://localhost:8000/users/changeregistrationstatus/', data, {withCredentials:true});
            console.log(response.data);
            return response.data;
        }
        catch(errors) {
            console.log(errors, 'requests thunk');
        }
    }
);

// Expense related

export const listexpenses = createAsyncThunk('expenses/listexpenses', 
    async () => {
        try {
            const response = await axios.get('http://localhost:8000/expenses/list/', {withCredentials:true});
            console.log("Expense data", response.data);
            return response.data;
        }
        catch(errors) {
            console.log(errors, 'listexpenses thunk');
        }
    }
);

const initialState = {
    userslist: [],
    singleuserinfo: [],
    updatedInfo: [],

    expenselist: [],

    status: 'idle',
    filterStack: [],
    registrationrequests: [],

}

export const expenseSlice = createSlice({
    name:'expense', 
    initialState, 
    reducers:{
        setUsersList: (state, action) => {
            state.userslist = action.payload;
        },
        setExpenseList: (state, action) => {
            console.log('NEW EXPENSE RECORD ADDED')
            state.expenselist = [ action.payload, ...state.expenselist];
        },
        setRegistrationRequests: (state, action) => {
            state.registrationrequests = action.payload
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
            state.userslist = action.payload;
            console.log(state.status, state.userslist, "INSIDE BUILDER")
        })
        .addCase(fetchsingleuser.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(fetchsingleuser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.singleuserinfo = action.payload;
        })
        .addCase(updateuserinfo.pending, (state, action) => {
            state.status = 'loading';
        })
        .addCase(updateuserinfo.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.updatedInfo = action.payload.data;
        })
        .addCase(deleteuserbyadmin.fulfilled, (state, action) => {
            state.status = 'deleted';
        })
        .addCase(registrationrequestsbyadmin.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.registrationrequests = action.payload;
        })
        .addCase(changeregistrationstatus.fulfilled, (state, action) => {
            state.status = 'succeeded';
        })
        .addCase(listexpenses.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.expenselist = action.payload;
        })
    }
});

export const {setUsersList, setRegistrationRequests, setExpenseList, setFilterStack} = expenseSlice.actions; 



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
