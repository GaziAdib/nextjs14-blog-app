import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const Dashboard = async () => {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/auth/login')
    }
    return (
        <div>Welcome to Admin Dashboard - {session.user?.role === 'ADMIN' && 'You Are Admin!'}</div>
    )
}

export default Dashboard