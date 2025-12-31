import React from 'react'
import DatabaseService from "../appwrite/database.js"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
    
  return (
    <Link to={`/post/${$id}`}>
        <div>
            <div>
                <img src={DatabaseService.getFilePreview(featuredImage)} alt={title}/>
            </div>
            <h2>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard