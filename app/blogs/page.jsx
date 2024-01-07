//import { fetchBlogs } from "@/actions/actions"
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

import Search from "../components/Search";

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
                    return <div className="mt-5 p-3 text-center" key={blog.id}>
                        <Link href={`/blogs/${blog?.id}`}>
                            <h3 className="mt-1 mb-1 px-1 py-1">{blog.title} - Category: <p className="text-green-600 font-semibold">{blog.category}</p></h3>
                            <p>{blog.description}</p>
                            -------------
                        </Link>

                    </div>
                })
            }
        </div>
    )
}

export default Blogs