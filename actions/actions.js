'use server';

// logics
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";



const prisma = new PrismaClient();

export const addBlog = async (formData) => {
    const title = formData.get('title');
    const description = formData.get('description');
    const category = formData.get('category');

    const newBlog = await prisma.blog.create({
        data: {
            title,
            description,
            category
        }
    })
    revalidatePath('/blogs/add-blog')
    redirect('/blogs')
}

// fetch all the blogs 

export const fetchBlogs = async () => {
    const blogs = await prisma.blog.findMany({});
    return blogs;
}

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