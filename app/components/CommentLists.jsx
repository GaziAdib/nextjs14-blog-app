import { fetchComments } from "@/actions/actions"
import CommentItem from "./CommentItem"

const CommentLists = async ({ blogId }) => {

    const comments = await fetchComments(blogId)

    return (
        <div>
            <h2 className='font-semibold text-center text-gray-200 my-2 mx-2 px-2 py-2'>All Comments ({comments?.length})</h2>
            {
                comments && comments.map((comment) => {
                    return <CommentItem key={comment?.id} comment={comment} />
                })
            }
        </div>
    )
}

export default CommentLists