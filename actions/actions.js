'use server';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { checkSessionUser } from "@/app/lib/checkSessionUser";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

//const sessionUser = await checkSessionUser();

//console.log('session: ' + sessionUser)


// add a blog post
export const addBlog = async (formData) => {
    const title = formData.get('title');
    const description = formData.get('description');
    const category = formData.get('category');
    const imageUrl = formData.get('imageUrl');

    //check admin
    const session = await getServerSession(authOptions);

    const user = await prisma.user.findFirst({
        where: {
            email: session?.user?.email
        }
    })

    if (user?.role === 'ADMIN') {
        const newBlog = await prisma.blog.create({
            data: {
                imageUrl: imageUrl ? imageUrl : '',
                title,
                description,
                category,
                authorId: checkSessionUser(session)
            }
        })
        revalidatePath('/blogs/add-blog')
        redirect('/blogs')
    }
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

    // new stuff implement i have given to riad@gmail.com to edit the blog 

    const session = await getServerSession(authOptions);

    // get the blog 
    const blog = await prisma.blog.findFirst({
        where: {
            id: id
        }

    });
    //blog?.authorId === session?.user?.id || session?.user?.permissions?.includes('EDIT_BLOG')
    console.log('permissions:', session?.user?.permissions)

    const getuser = await prisma.user.findFirst({
        where: {
            id: session?.user?.id
        }
    })

    if (getuser?.permissions?.includes('EDIT_BLOG') || (blog?.authorId === session?.user?.id)) {
        const updatedBlog = await prisma.blog.update({
            where: {
                id: id,
            },
            data: {
                imageUrl: imageUrl ? imageUrl : null,
                title,
                description,
                category,
                authorId: session?.user?.id
            }
        });
        revalidatePath(`/blogs/update-blog/${id}`)
        redirect(`/blogs`)
    }

    else {
        console.log('YOU ARE NOT ALLOWED TO UPDATE');
    }

}


// add a single comment to a blog id

export const addCommentOnBlog = async (blogId, formData) => {

    const text = formData.get('text');
    const session = await getServerSession(authOptions);

    const new_coment = await prisma.comment.create({
        data: {
            authorId: checkSessionUser(session),
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
    const session = await getServerSession(authOptions);


    const comment = await prisma.comment.findFirst({
        where: {
            id: commentId
        }
    })

    if (comment.authorId !== checkSessionUser(session)) {
        console.log('You are not allowed to delete')
    }

    if (comment.authorId === checkSessionUser(session)) {
        await prisma.comment.delete(
            {
                where: {
                    id: commentId,
                }
            }
        );

        revalidatePath(`/blogs/${blogId}`)
        redirect(`/blogs/${blogId}`)
    }
}


// fetch some users

// fetch comment on a single blog id
export const fetchUsers = async () => {
    const users = await prisma.user.findMany({
        take: 5
    })
    return users
}

export const fetchSingleUser = async (userId) => {
    const user = await prisma.user.findFirst({
        where: {
            id: userId
        }
    })
    return user
}


// add permissions for normal user to do some specific actions

export const assignPermission = async (userId, formData) => {

    const session = await getServerSession(authOptions);

    const new_permission = formData.get('assign_permission');
    //const permissions = new_permissions.split(",")

    if (session?.user?.role === 'ADMIN') {

        const assign = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                permissions: {
                    push: new_permission
                }
            }

        });

        revalidatePath(`/admin/dashboard`)
        redirect(`/admin/dashboard`)
    }

}

// data: {
//     authorId: checkSessionUser(session),
//     blogId: blogId,
//     text: text,
// }