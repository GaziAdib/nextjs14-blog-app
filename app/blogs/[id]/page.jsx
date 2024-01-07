import { fetchSingleBlog } from "@/actions/actions";
import CommentForm from "@/app/components/CommentForm";
import CommentLists from "@/app/components/CommentLists";



const BlogDetail = async ({ params }) => {

    const id = params?.id;

    // fetch single blog 

    const blog = await fetchSingleBlog(id);

    return (
        <div>
            <p> blog id {id}</p>

            <div className="text-center px-5 py-5 mx-5 my-5">
                <h2 className="text-center font-extrabold text-lg mx-2 my-2 text-green-500">
                    ({blog?.category})
                </h2>
                <h3 className="font-semibold text-center text-gray-400 my-2 mx-2 px-2 py-2">
                    {blog?.title}
                </h3>

                <p className="font-semibold text-center text-gray-200 my-2 mx-2 px-2 py-2">
                    {blog?.description}
                </p>

            </div>

            <div className="justify-content-center text-center mx-auto px-5 py-5">
                Comment Form

                <CommentForm blogId={blog?.id} />
            </div>

            <div className="text-center justify-center mt-4 mb-2 mx-auto px-2 py-4">
                <CommentLists blogId={blog?.id} />
            </div>

        </div>
    )
}

export default BlogDetail