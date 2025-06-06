import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../api/axios'


const initialState = {
    tracingKey: "",
    loading: false,
    successAlert: false,
    rejectedAlert: false
}

export const PostUploadArticle = createAsyncThunk('UploadArticle', async (data) => {
    const response = await axios.post('articles/upload', data);
    return response.data;
})

export const articleUploadSlice = createSlice({
    name: 'articleUpload',
    initialState,
    reducers: {
        succesAlertChange: (state) => {
            state.successAlert = !state.successAlert;
            state.tracingKey = "";
        },
        rejectedAlertChange: (state) => {
            state.rejectedAlert = !state.rejectedAlert;
        }
    },
    extraReducers: (builder) => {

        builder.addCase(PostUploadArticle.pending, (state) => {
            state.loading = true;
        }),

            builder.addCase(PostUploadArticle.fulfilled, (state, action) => {
                state.tracingKey = action.payload;
                state.loading = false;
                state.successAlert = true;
            }),
            builder.addCase(PostUploadArticle.rejected, (state) => {
                state.rejectedAlert = true;
                state.loading = false;

            })
    }
})

export const { succesAlertChange, rejectedAlertChange } = articleUploadSlice.actions

export default articleUploadSlice.reducer