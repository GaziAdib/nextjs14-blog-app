"use client";
import { assignPermission } from "@/actions/actions";
import Button from "../ui/Button";
const AdminTable = ({ users }) => {

    const assignPermisionshandler = async (formData) => {
        // logic for assigning permissions
        const userId = formData.get('userId');
        await assignPermission(userId, formData)
    }


    return (
        <div className="container mx-auto mt-8">
            <table className="min-w-full border bg-gray-900">
                <thead>
                    <tr>
                        <th className="border p-4">ID</th>
                        <th className="border p-4">Email</th>
                        <th className="border p-4">Role</th>
                        <th className="border p-4">Permissions</th>
                        <th className="border p-4">Assign Permissions</th>
                        <th className="border p-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Sample data, replace with your actual data */}
                    {users.map((user, index) => {
                        return <tr key={user?.id}>
                            <td className="border p-4">{index + 1}</td>
                            <td className="border p-4">{user?.email}</td>
                            <td className="border p-4">{user?.role}</td>
                            <td className="border p-4">{user?.permissions}</td>
                            <td className="border p-4">
                                <form action={assignPermisionshandler}>
                                    <input type="hidden" name="userId" value={user?.id} />
                                    <input type="text" name="assign_permission" className="mx-2 rounded-md text-center text-gray-900 shadow-md px-2 my-1 py-1" placeholder="assign permissions" />
                                    <Button label={'Assign'} color={'red'} />
                                </form>
                            </td>
                            <td className="border p-4">
                                <Button label={'Edit'} color={'blue'} />
                                <Button label={'Delete'} color={'red'} />
                            </td>
                        </tr>
                    })}
                    {/* Add more rows as needed */}
                </tbody>
            </table>
        </div>
    )
}

export default AdminTable