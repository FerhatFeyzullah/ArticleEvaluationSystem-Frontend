import React from 'react'
import Navbar from '../components/Navbar'
import ArticleInquiry from '../components/ArticleInquiry'
import ArticleInquiryTable from '../components/ArticleInquiryTable'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading'
import RejectedAlert from '../components/Alerts/RejectedAlert'
import { InquiryRejectedAlertChange } from '../redux/slices/articleStatusInquirySlice'
import '../css/Home.css'


function ArticleStatusInquiry() {
    const dispatch = useDispatch();

    const { loading, rejectedAlert } = useSelector(store => store.articleInquiry)

    const Change = () => {
        dispatch(InquiryRejectedAlertChange());
    }

    return (
        <div className='inquiry-main-div'>
            <Navbar />
            <div className='alert-div'>
                <RejectedAlert rejectedAlert={rejectedAlert} change={Change} />
            </div>

            <ArticleInquiry />

            <ArticleInquiryTable />

            <Loading loading={loading} />

        </div>
    )
}

export default ArticleStatusInquiry