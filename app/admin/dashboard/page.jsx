import { fetchUsers } from "@/actions/actions";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AdminTable from "@/app/components/AdminTable";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


const Dashboard = async () => {

    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/auth/login')
    }

    if (session?.user?.role !== 'ADMIN') {
        redirect('/')
    }

    // get admin related data and pass to table

    const users = await fetchUsers();

    return (
        <div>
            <h2 className="text-center mx-2 my-4 py-2">Welcome to Admin Dashboard - {session.user?.role === 'ADMIN' && 'You Are Admin!'}</h2>

            <div className="mt-5 justify-center items-start flex">
                {users?.length > 0 && <AdminTable users={users} />}
            </div>
        </div>
    )
}

export default Dashboard