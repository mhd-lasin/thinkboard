import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI'
import NoteCard from '../components/NoteCard'
import toast from 'react-hot-toast'

const HomePage = () => {
    const [isRateLimited, setIsRateLimited] = useState(false)
    const [notes,setNotes] = useState([])
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        const fetchNotes = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/notes")
                console.log(response.data)
                setNotes(response.data)
                setIsRateLimited(false)
            } catch (error) {
                console.error("Error fetching notes",error)
                if (error.response.status == 429) {
                    setIsRateLimited(true)
                }
                else {
                    toast.error("Failed to fetch notes")
                }
            }
            finally {
                setLoading(false)
            }
        }
        fetchNotes()
    },[])
    return (
        <div className='min-h-screen'>
            <Navbar />
            {isRateLimited && <RateLimitedUI />}
            <div className='max-w-6xl mx-auto p-4 mt-6'>
                {loading && <div className='text-center text-primary py-10'>Loading Notes...</div>}
                {notes.length > 0 && !isRateLimited && (
                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {notes.map((note)=>(<NoteCard key={note._id} note={note} />))}
                    </div>
                )}
                
            </div>
        </div>
    )
}

export default HomePage