"use client";
import Image from 'next/image';
import Button from './Button'


import { addCommentOnBlog } from '@/actions/actions';
import { useRef } from 'react';

const CommentForm = ({ blogId }) => {


    const ref = useRef();

    const handleAddComment = async (formData) => {
        await addCommentOnBlog(blogId, formData)
        ref?.current?.reset();
    }

    return (
        <form ref={ref} action={handleAddComment} className="max-w-md flex mx-auto mt-8">

            <div className="mb-2 mr-5 px-2">
                <Image className='rounded-full mt-6' src="https://avatars.githubusercontent.com/u/41202696?v=4" height={70} width={70} />
            </div>

            <div className="mb-4">
                <label htmlFor="text" className="block text-gray-600 font-medium">
                    Comment
                </label>
                <textarea
                    id="text"
                    name="text"
                    placeholder="add text"
                    rows="4"
                    className="mt-1 p-2 w-500 text-gray-800 border rounded-md"
                    required
                ></textarea>
            </div>
            <div className='mt-5 py-1 px-2'>
                <Button label={'Add Comment'} color={'green'} />
            </div>
        </form>
    )
}

export default CommentForm