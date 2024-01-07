import React from 'react'
import Link from 'next/link';

const BlogItem = ({ blog }) => {

    const { id, title, description, category, author } = blog || {};
    return (
        <div className="mt-5 p-3 text-center">
            <Link href={`/blogs/${blog?.id}`}>
                <h3 className="mb-1 px-2 font-bold my-2 py-2">{title} - Category: <p className="text-green-600 font-semibold">({category})</p></h3>
                <p className='text-gray-400 mt-2 px-2 py-2'>{description}</p>
                -------------
            </Link>

        </div>
    )
}

export default BlogItem