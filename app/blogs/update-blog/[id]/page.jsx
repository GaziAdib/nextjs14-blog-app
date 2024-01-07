import { fetchSingleBlog } from '@/actions/actions';
import BlogUpdateForm from '@/app/components/BlogUpdateForm'

const UpdateBlog = async ({ params }) => {

    const id = params?.id;

    const blog = await fetchSingleBlog(id);

    return (
        <div>
            UpdateBlog id: {id}
            {
                blog && <BlogUpdateForm id={id} blog={blog} />
            }

        </div>
    )
}

export default UpdateBlog

