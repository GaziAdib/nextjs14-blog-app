import { fetchSingleBlog } from '@/actions/actions';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import BlogUpdateForm from '@/app/components/BlogUpdateForm'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';


const UpdateBlog = async ({ params }) => {

    const session = await getServerSession(authOptions);

    if (!session) {
        return redirect('/auth/login')

    }

    const checkPermission = session.user?.permissions?.includes('EDIT_BLOG')

    const checkAdmin = session.user?.role === 'ADMIN';


    if (!checkAdmin && !checkPermission) {
        console.log('You Are Not Admin Not Permitted!')
        return redirect('/');
    }

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

