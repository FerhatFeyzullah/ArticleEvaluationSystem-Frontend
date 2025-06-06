import { configureStore } from '@reduxjs/toolkit'
import articleUploadReducer from './slices/articleUploadSlice'
import articleStatusInquiryReducer from './slices/articleStatusInquirySlice'
import registerReducer from './slices/registerSlice'
import dilaogReducer from './slices/dialogSlice'
import loginReducer from './slices/loginSlice'
import adminReducer from './slices/adminSlice'
import logoutReducer from './slices/logoutSlice'
import judgeReducer from './slices/judgeSlice'

export const store = configureStore({
    reducer: {
        articleUpload: articleUploadReducer,
        articleInquiry: articleStatusInquiryReducer,
        register: registerReducer,
        dialog: dilaogReducer,
        login: loginReducer,
        admin: adminReducer,
        logout: logoutReducer,
        judge: judgeReducer,

    },
})