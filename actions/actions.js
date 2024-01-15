'use server';
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

// add a blog post
export const addBlog = async (formData) => {
    const title = formData.get('title');
    const description = formData.get('description');
    const category = formData.get('category');
    const imageUrl = formData.get('imageUrl');

    const newBlog = await prisma.blog.create({
        data: {
            imageUrl: imageUrl ? imageUrl : '',
            title,
            description,
            category
        }
    })
    revalidatePath('/blogs/add-blog')
    redirect('/blogs')
}

// fetch all the blogs 

// export const fetchBlogs = async () => {
//     const blogs = await prisma.blog.findMany({});
//     return blogs;
// }


// fetch a single blog
export const fetchSingleBlog = async (id) => {
    const blog = await prisma.blog.findFirst(
        {
            where: {
                id: id
            }
        }
    );
    return blog
}

// update a single blog

export const updateBlog = async (id, formData) => {

    const title = formData.get('title');
    const description = formData.get('description');
    const category = formData.get('category');
    const imageUrl = formData.get('imageUrl');

    const updatedBlog = await prisma.blog.update({
        where: {
            id: id,
        },
        data: {
            imageUrl: imageUrl ? imageUrl : null,
            title,
            description,
            category
        }
    });

    revalidatePath(`/blogs/update-blog/${id}`)
    redirect('/blogs')
}


// add a single comment to a blog id

export const addCommentOnBlog = async (blogId, formData) => {

    const text = formData.get('text');

    const new_coment = await prisma.comment.create({
        data: {
            blogId: blogId,
            text: text,
        }
    });

    revalidatePath(`/blogs/${blogId}`)
    redirect(`/blogs/${blogId}`)
}



// fetch comment on a single blog id
export const fetchComments = async (blogId) => {
    const comments = await prisma.comment.findMany(
        {
            where: {
                blogId: blogId
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: 3
        }

    );

    return comments
}

// Delete comment
export const deleteComment = async (commentId, blogId) => {
    await prisma.comment.delete(
        {
            where: {
                id: commentId
            }
        }
    );

    revalidatePath(`/blogs/${blogId}`)
    redirect(`/blogs/${blogId}`)
}

