import { auth } from "@/auth"
import { SignOut } from "@/components/sign-out"
import { redirect } from "next/navigation"
import { AddNewKeyModal } from "@/components/AddNewKeyModal"
import { ProjectCard } from "@/components/ProjectCard"
import { getUserKeys } from "@/lib/getUserKeys"
import { getUserId } from "@/lib/getUserId"

export default async function Dashboard() {
  const session = await auth()
  if (!session || !session.user || !session.user.email) {
    redirect("/")
  }

  // Fetch the userId and their keys
  const userId = await getUserId(session.user.email)
  const keys = await getUserKeys(userId as string)

  

  return (
    <>
      <div className="w-full flex justify-between p-2 items-center">
        <div className="text-4xl p-4">
          {session.user.name}
        </div>
        <div className="flex gap-x-3 p-4">
          {/* Add New Item Dialog Button */}
          <AddNewKeyModal email={session.user.email as string} />
          <SignOut />
        </div>
      </div>

      {/* Display all user keys as project cards */}
      <div className="w-screen  grid grid-cols-1 gap-x-8 gap-y-5 p-3 sm:grid-cols-2 lg:grid-cols-3">
  {keys && keys.length > 0 ? (
    keys.map((key) => (
      <ProjectCard
        
        key={key.id}
        projectId={key.id}
        projectName={key.name}
        createdAt={key.createdAt.toLocaleString()}
      />
    ))
  ) : (
    <div className="text-center text-gray-500 col-span-full">
      No projects found. Please add a new project.
    </div>
  )}
</div>

    </>
  )
}
