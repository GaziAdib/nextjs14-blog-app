import { getServerSession } from "next-auth"
import LogoutButton from "./ui/LogoutButton";

export default async function Home() {
  const authSession = await getServerSession();

  console.log('authSession', authSession);
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h2>Home Page </h2>
        <LogoutButton label={'Logout'} />
      </main>
    </>
  )
}
