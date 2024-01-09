//import { fetchBlogs } from "@/actions/actions"
import { PrismaClient } from "@prisma/client";
import Search from "../components/Search";
import BlogItem from "../components/BlogItem";
import { Suspense } from "react";
import Loading from "../ui/Loading";

const Blogs = async ({ searchParams }) => {

    // work with search
    //console.log(searchParams);

    //const query = searchParams?.query

    //console.log(query);

    const query = searchParams?.query || '';

    const prisma = new PrismaClient();
    const blogs = await prisma.blog.findMany({
        where: query ? {
            OR: [
                { category: { contains: query } },
                { title: { contains: query } }
            ],

        }
            :
            {}, // no search query , fetch all data
    });

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5 mb-5 px-4 py-5">
            {blogs?.length > 0 && blogs.map((blog) => (

                <BlogItem key={blog?.id} blog={blog} />

            ))}
        </div>
    )
}

export default Blogs


