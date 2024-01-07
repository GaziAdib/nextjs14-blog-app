//import { fetchBlogs } from "@/actions/actions"
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

import Search from "../components/Search";
import BlogItem from "../components/BlogItem";

const Blogs = async ({ searchParams }) => {

    // work with search
    //console.log(searchParams);

    //const query = searchParams?.query

    //console.log(query);

    const query = searchParams?.query || '';

    // if(query) {

    // }

    //const blogs = await fetchBlogs();
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
        <div className='text-4xl'>
            <div>
                <Search />
            </div>
            <h2 className="text-center mt-6 p-6">All Blogs</h2>
            {
                blogs?.map((blog) => {
                    return <BlogItem key={blog.id} blog={blog} />
                })
            }
        </div>
    )
}

export default Blogs