import React, {useEffect, useState} from 'react'
import axios from 'axios';
import spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import {BsInfoCircle} from 'react-icons/bs';
import {MdOutlineAddBox,MdOutlineDelete} from 'react-icons/md';
import {AiOutlineEdit} from 'react-icons/ai';
import Spinner from '../components/Spinner';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading]=useState(false);
    const [showType, setShowType] = useState('table');
    // spinner is keep displaying until the data is not fetched from api
    //spinner stopped after data fetched from api.
    useEffect(()=>{
        setLoading(true);
        axios
        .get('http://localhost:5555/books')
        .then((response)=>{
            setBooks(response.data.data);
            setLoading(false);
        })
    },[]); // run only at initial. 
  return (
    <div className='p-4'>
        <div className='flex justify-center items-center gap-x-4'>
           <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
           onClick={()=>setShowType('table')}
           >
           Table 
           </button>
           <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
           onClick={()=>setShowType('card')}
           >
           Card 
           </button>
        </div>
        <div className='flex justify-between items-center'>
            <h1 className='text-3xl my-8'>Books List</h1>
            <Link to= '/books/create'>
                <MdOutlineAddBox className='text-sky-800 text-4xl' />
            </Link>
        </div>
        {loading ? 
        <Spinner/> : showType==='table'?
        (<BooksTable books={books} />) : <BooksCard books={books} />
        }
    </div>
  )
}

export default Home