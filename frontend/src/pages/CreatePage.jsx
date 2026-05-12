import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'    
import { ArrowLeftIcon } from "lucide-react";
import { Save, Loader2 } from "lucide-react";
import toast from 'react-hot-toast';
import api from '../lib/axios'


const CreatePage = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || title.trim() === "" || !content || content.trim() === "") {
      return toast.error("Title and content are required")
    }
    setLoading(true)
    try {
      await api.post("/notes", {
        title,
        content
      })
      toast.success("Note created successfully")
      navigate('/')
    } catch (error) {
      toast.error("Failed to create note")
      if (error.response.status === 429) {
        toast.error("Too many requests. Please try again later.", { duration: 5000, icon: '⏳' })
      }
    } finally {
      setLoading(false)
    }

  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <Link to={'/'} className='btn btn-ghost'>
            <ArrowLeftIcon className='h-6 w-6' />
            Back To Notes
          </Link>
          <div className='card bg-base-100'>
            <div className='card-body'>
              <div className='card-title text-2xl mb-4'>
                <h2>Create New Note</h2>
              </div>
              <form onSubmit={handleSubmit}>
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Title</span>
                  </label>
                  <input type='text' placeholder='Note Title' value={title} onChange={(e) => setTitle(e.target.value)} className='input input-bordered' />
                </div>

                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Content</span>
                  </label>
                  <textarea placeholder='Note Content' value={content} onChange={(e) => setContent(e.target.value)} className='textarea textarea-bordered h-32' />
                </div>

                <div className='card-actions justify-end'>
                  <button type='submit' disabled={loading} className='btn btn-primary'>
                    {loading ? (
                      <Loader2 className='h-5 w-5 animate-spin' />
                    ) : (
                      <>
                        <Save className='h-5 w-5 mr-2' />
                        Create Note
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage