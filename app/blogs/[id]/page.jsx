import { fetchSingleBlog } from "@/actions/actions";
import CommentForm from "@/app/components/CommentForm";
import CommentLists from "@/app/components/CommentLists";
import Image from "next/image";

const BlogDetail = async ({ params }) => {

    const id = params?.id;

    // fetch single blog 

    const blog = await fetchSingleBlog(id);

    return (
        <div className="">
            <p> blog id {id}</p>

            <div className="text-center bg-gray-800 rounded-md border-2 border-green-600 shadow-md px-4 py-2 mx-3 my-3">

                {
                    blog?.imageUrl ? <Image
                        quality={100}
                        loading="lazy"
                        src={blog?.imageUrl}
                        alt={blog?.title} width="600" height="400" className="w-full h-[600px] mt-2 px-2 py-2 object-cover mb-2 rounded-sm shadow-sm" /> : null
                }

                <h2 className="text-center font-extrabold text-lg mx-2 my-2 text-green-500">
                    ({blog?.category})
                </h2>
                <h3 className="font-semibold text-center text-2xl text-gray-200 my-2 mx-2 px-2 py-2">
                    " {blog?.title} "
                </h3>

                <p className="text-center text-gray-300 my-2 mx-2 px-2 py-2">
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