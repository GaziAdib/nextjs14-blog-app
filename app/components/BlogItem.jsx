import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const BlogItem = ({ blog }) => {

    const { id, title, description, category, author } = blog || {};
    return (
        <div className="bg-gray-900 p-4 border-2 border-green-200 mx-2 my-2 rounded-lg shadow-md">
            <Link href={`/blogs/${id}`}>
                {
                    blog?.imageUrl ? <Image quality={100} src={blog.imageUrl} width="500" height="400" alt={title} className="w-full h-[200px]  lg:h-[250px] object-cover mb-4 rounded-md" /> : null
                }
            </Link>
            <Link href={`/blogs/${id}`}>
                <h2 className='text-xl text-white font-semibold mb-2'>{title}</h2>
            </Link>
            <p className="mb-2 max-w-md text-green-500 inline-block border-2 p-2 border-green-300 rounded-full">{category}</p>
            <p className="text-gray-300">{description.slice(0, 100)}...</p>
        </div>
    )
}

export default BlogItem