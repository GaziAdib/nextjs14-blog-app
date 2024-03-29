"use client";
import { deleteComment } from "@/actions/actions";
import Button from "./Button";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const CommentItem = ({ comment }) => {

    const session = useSession();

    //const currentUserId = session?.data?.user?.id

    const { id, blogId, text, authorId } = comment;



    const deleteCommentHandler = async (formData) => {
        const id = formData.get('id');
        if (session?.data?.user?.id !== authorId) {
            toast.warn('🦄 You cannot Delete Others Comment!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
        }
        await deleteComment(id, blogId)

        toast.success('Comment Deleted Successfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
        });




    }
    return (
        <>

            <div className="max-w-md mx-auto mt-4 bg-gray-800 p-2 rounded-md shadow-md">
                <div className="flex items-center mb-2">
                    {/* User Icon */}
                    <div className="bg-gray-300 h-8 w-8 rounded-full flex items-center justify-center mr-2">
                        <svg
                            className="w-4 h-4 text-gray-200"
                            fill="none"
                            stroke="currentC olor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {/* Add your user icon SVG or choose an appropriate one */}
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2a2 2 0 100-4 2 2 0 000 4z"
                            ></path>
                        </svg>
                    </div>

                    {/* User Name */}
                    <div className="font-bold text-gray-200">{authorId}</div>
                </div>

                {/* Comment Content */}
                <p className="text-lg text-gray-300">{text}</p>


            </div>

            <div className="">
                <form action={deleteCommentHandler}>
                    <input type="hidden" name="id" value={id} />
                    {session?.data?.user?.id === authorId && <Button label={'Delete'} color={'red'} />}
                </form>
            </div>






        </>


    )
}

export default CommentItem