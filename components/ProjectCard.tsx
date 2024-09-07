// components/ProjectCard.tsx
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DeleteKeyModal } from "./DeleteKeyModal"

interface ProjectCardProps {
  projectId: string
  projectName: string
  createdAt?: string
  // Deletion callback
}

export function ProjectCard({ projectId, projectName, createdAt }: ProjectCardProps) {
  return (
    <Card className="w-full max-w-sm p-2 bg-gray-800 text-white border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-white text-2xl">{projectName}</CardTitle>
        {createdAt && (
          <CardDescription className="text-gray-400">
            Created on: {new Date(createdAt).toLocaleString()}
          </CardDescription>
        )}
      </CardHeader>

      <CardFooter className="flex justify-between">
        <Link href={`/key/${projectId}`}>
          <Button variant="outline" className="text-white border-gray-600 hover:bg-gray-700">View</Button>
        </Link>
        
        {/* Delete Modal */}
        <DeleteKeyModal projectId={projectId} projectName={projectName}  />
      </CardFooter>
    </Card>
  )
}
