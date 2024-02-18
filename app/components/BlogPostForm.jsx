'use client';
import { useRef } from 'react';
import Button from './Button';

import { addBlog } from '@/actions/actions';
import { toast } from 'react-toastify';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';


// define model Schema
const schema = z.object({
    imageUrl: z.string().includes('https', { message: 'URL must Include HTTPS!' }),
    title: z.string().min(1, { message: 'Title Required!' }).max(100, { message: 'Title Cannot be larger than 100 characters!' }),
    category: z.string().min(1).max(30, { message: 'Max Characters 30! for category' }),
    description: z.string().min(1, { message: 'Min 1 Character Required For Description!' }).max(1000)
})

const BlogPostForm = () => {

    const ref = useRef();

    // use of react hook form
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    });

    //const [data, setData] = useState();

    const onSubmit = async (data) => {
        console.log(data);
        const result = await addBlog(data)

        toast.success('New Blog has been Created!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
        });

        if (!result) {
            console.log('Something went wrong!')
            return
        }

        if (result.error) {
            console.log('Error:', result.error)
            return
        }
        reset();


    }



    return (
        <form ref={ref} onSubmit={handleSubmit(onSubmit)}
            className="max-w-md mx-auto mt-8 p-8 bg-white rounded shadow-md">
            <h2 className="text-2xl text-green-500 font-semibold mb-6">Create a New Blog Post</h2>

            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-600">
                    Upload Image Link
                </label>
                <input
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    {...register('imageUrl', { required: 'Image URL Required!' })}
                    className="mt-1 p-2 w-full border text-gray-600 rounded-md"
                    placeholder="Enter imageUrl"
                />
                <div className='mt-2 mb-2'>
                    <span className='text-red-600 mt-3 mb-2 px-2 py-1'>{errors?.imageUrl?.message}</span>
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-600">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    {...register('title')}
                    className="mt-1 p-2 w-full border text-gray-600 rounded-md"
                    placeholder="Enter title"
                />
                {errors.title?.message && <p className='m-1 text-red-500 text-sm'>{errors.title?.message}</p>}
            </div>

            {/* <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-600">
                    Price
                </label>
                <input
                    type="text"
                    id="price"
                    name="price"
                    {...register('price')}
                    className="mt-1 p-2 w-full border text-gray-600 rounded-md"
                    placeholder="Enter price"
                />
                {errors.price?.message && <p className='m-1 text-red-500 text-sm'>{errors.price?.message}</p>}
            </div> */}

            <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-600">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    rows="4"
                    {...register('description')}
                    className="mt-1 p-2 text-gray-600 w-full border rounded-md"
                    placeholder="Enter description"
                ></textarea>
                {errors.description?.message && <p className='m-1 text-red-500 text-sm'>{errors.description?.message}</p>}
            </div>

            <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-600">
                    Category
                </label>
                <input
                    type="text"
                    id="category"
                    name="category"
                    {...register('category')}
                    className="mt-1 p-2 text-gray-600 w-full border rounded-md"
                    placeholder="Enter category"
                />

                {errors.category?.message && <p className='m-1 text-red-500 text-sm'>{errors.category?.message}</p>}

            </div>



            <Button label={'Add New Blog'} color={'green'} />

        </form>
    )
}

export default BlogPostForm