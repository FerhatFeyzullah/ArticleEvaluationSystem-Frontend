import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { GetArticleByIdForJudge, PutArticleStatus, setSelectedArticle } from '../redux/slices/judgeSlice';
import Navbar from '../components/Navbar';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../css/Article.css';
import { TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function ArticleReview() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { articleId } = useParams();

    const { selectedArticle, judgeId } = useSelector(store => store.judge);
    const { title, writerEmail, fileName } = selectedArticle;

    useEffect(() => {
        dispatch(GetArticleByIdForJudge(articleId))
    }, [articleId]);

    const [artState, setValue] = useState(false);
    const [editText, setEditText] = useState("");

    const handleChange = (event) => {
        setValue(event.target.value === "true");
    };

    const PutState = async () => {
        const data = {
            artId: articleId,
            state: artState,
            reason: editText
        }

        await dispatch(PutArticleStatus(data));
        navigate("/degerlendirici/" + judgeId)
    }


    return (
        <div className='article-review-main-div'>
            <Navbar />
            <div>

                <div>
                    <Button variant='contained' sx={{ textTransform: 'none', margin: '10px' }} onClick={() => navigate("/degerlendirici/" + judgeId)}>
                        TÜM MAKALELER
                    </Button>
                </div>

            </div>
            <div className='flex-column' >

                <div className='iframe'>
                    <iframe
                        src={`https://localhost:7247/api/articles/pdfView/${fileName}`}
                        width="800px"
                        height="800px"
                        style={{ border: '1px solid #ccc' }}
                        title="PDF Viewer"
                    ></iframe>
                </div>

                <div className='article-review-card'>
                    <div className='flex-row-review-card'>
                        <div>
                            <CardContent>
                                <Typography variant="h5" component="div">

                                    {title}
                                </Typography>
                                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>

                                    Yazar: {writerEmail}
                                </Typography>

                            </CardContent>
                            <CardActions>
                                <Button size="small" variant='contained' color='primary' sx={{ textTransform: 'none' }}
                                    onClick={PutState}
                                > İNCELEMEYİ BİTİR</Button>
                            </CardActions>
                        </div>

                        <div>

                            <TextField variant='standard' multiline rows={5} sx={{ width: '300px' }} label='Düzenleme Gerekçesi'
                                value={editText} onChange={(e) => setEditText(e.target.value)} />


                            <FormControl>
                                <FormLabel>Durum</FormLabel>
                                <RadioGroup
                                    value={artState.toString()}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="true" control={<Radio />} label="Geçerli" />
                                    <FormControlLabel value="false" control={<Radio />} label="Geçersiz" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArticleReview