import { createSlice } from '@reduxjs/toolkit';

import {allexpenseslist, listexpenses, fetchusers, fetchsingleuser, updateuserinfo, deleteuserbyadmin, registrationrequestsbyadmin, changeregistrationstatus, expenserequestsbyadmin, changeexpensestatus, fetchsummaries} from './state/coreThunks'


const initialState = {
    dashboard_summaries: null,
    userslist: [],
    userreport: null,
    maxpagesForUsers: null,
    singleuserinfo: [],
    updatedInfo: [],

    allexpenselist: [],
    expenselist: [],

    status: 'idle',
    filterStack: [],

    registrationrequests: [],
    expenserequests: [],

    activeSideNav: 'dashboard',

    statusColorMapper: {
        'pending': 'capitalize text-blue-600 text-sm font-bold',
        'approved': 'capitalize text-green-600 text-sm font-bold',
        'rejected': 'capitalize text-red-600 text-sm font-bold',
        'invalidated': 'capitalize text-gray-600 text-sm font-bold',
    },
    activeColorMapper: {
        'Active': 'text-green-600 text-sm font-bold before:p-1 before:rounded-full before:bg-green-600 before:mx-1',
        'Inactive': 'text-red-600 text-sm font-bold'
    }

}

export const expenseSlice = createSlice({
    name:'expense', 
    initialState, 
    reducers:{
        setActiveSideNav: (state, action) => {
            state.activeSideNav = action.payload;
        },
        setDashboardSummaries: (state, action) => {
            state.dashboard_summaries = action.payload
        },
        setUsersList: (state, action) => {
            state.userslist = action.payload;
        },
        setUserReport: (state, action) => {
            state.userreport = action.payload;
        },
        setExpenseList: (state, action) => {
            console.log('NEW EXPENSE RECORD ADDED')
            state.expenselist = action.payload;
        }, 
        setAllExpenseList: (state, action) => {
            state.allexpenselist = action.payload;
        },
        setRegistrationRequests: (state, action) => {
            state.registrationrequests = action.payload;
        },
        setExpenseRequests: (state, action) => {
            state.expenserequests = action.payload;
        },
        setFilterStack: (state, action) => {
            state.filterStack = [...state.filterStack, action.payload];
        },
    },
    extraReducers(builder) {
        builder
        .addCase(fetchsummaries.fulfilled, (state, action) => {
            state.dashboard_summaries = action.payload !== undefined ? JSON.parse(action.payload) : null
        })
        .addCase(fetchusers.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(fetchusers.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.userslist = action.payload['data'];
            state.maxpagesForUsers = action.payload['max_pages'];
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
        .addCase(expenserequestsbyadmin.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.expenserequests = action.payload;
        })
        .addCase(changeexpensestatus.fulfilled, (state, action) => {
            state.status = 'succeeded';
        })
        .addCase(listexpenses.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.expenselist = action.payload;
        })
        .addCase(allexpenseslist.fulfilled, (state, action) => {
            state.allexpenselist = action.payload;
        })
    }
});

export const {setActiveSideNav, setUsersList, setUserReport, setRegistrationRequests, setExpenseList, setAllExpenseList, setExpenseRequests, setFilterStack} = expenseSlice.actions; 



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
