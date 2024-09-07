"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { deleteApiKey } from "@/lib/deleteApiKey"

interface DeleteKeyModalProps {
  projectId: string
  projectName: string
  // Callback to handle the deletion
}

export function DeleteKeyModal({ projectId, projectName }: DeleteKeyModalProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [confirmationText, setConfirmationText] = useState("") // State for user input
  const [error, setError] = useState<string | null>(null) // State for validation error

  const handleDelete = async () => {
    if (confirmationText !== projectName) {
      setError("Project name does not match.") // Error if names don't match
      return
    }

    setLoading(true)
    try {
      await deleteApiKey(projectId)
      setOpen(false) // Close the modal after successful deletion
    } catch (error) {
      console.error("Error deleting key:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button variant="destructive" className="text-white bg-red-600 hover:bg-red-700" onClick={() => setOpen(true)}>
        Delete
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the project <strong>{projectName}</strong>? This action cannot be undone.
              <br />
              To confirm, please type the project name below.
            </DialogDescription>
          </DialogHeader>

          {/* Input for project name confirmation */}
          <div className="my-4">
            <Input
              type="text"
              value={confirmationText}
              onChange={(e) => {
                setError(null) // Reset error on input change
                setConfirmationText(e.target.value)
              }}
              placeholder={`Type "${projectName}" to confirm`}
              disabled={loading} // Disable input when loading
            />
            {error && <p className="text-red-500 mt-2">{error}</p>} {/* Show error if names don't match */}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={loading || confirmationText !== projectName} // Disable until the correct name is entered
            >
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
