import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import BlogPostForm from '@/app/components/BlogPostForm'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
const AddBlog = async () => {

    const session = await getServerSession(authOptions);

    if (session?.user?.role !== 'ADMIN') {
        return redirect('/')
    }

    if (!session) {
        return redirect('/auth/login')
    }

    return (
        <div>
            <BlogPostForm />
        </div>
    )
}

export default AddBlog