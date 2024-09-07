// components/AddNewItemDialog.tsx
"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { saveApiKey } from "@/lib/saveApiKey"
import { getUserId } from "@/lib/getUserId"

interface AddNewKeyModalProps {
  email: string
}

export function AddNewKeyModal({ email }: AddNewKeyModalProps) {
  const [open, setOpen] = useState(false)  // State to control dialog
  const [projectName, setProjectName] = useState("")  // State to store project name
  const [loading, setLoading] = useState(false)  // State to show loading indicator
  const [error, setError] = useState<string | null>(null)  // State to handle errors

  const handleSave = async () => {
    if (projectName) {
      setLoading(true)  // Start loading
      setError(null)  // Reset error

      try {
        // Assuming you have a way to get userId from the email or other sources
        const userId = await getUserId(email)
        if (userId) {
          await saveApiKey(userId, projectName)
          setProjectName("")  // Clear project name input
          setOpen(false)  // Close the dialog after saving
        } else {
          setError("User ID not found")
        }
      } catch (err) {
        setError("An API key with the same project name already exists")
      } finally {
        setLoading(false)  // Stop loading
      }
    } else {
      setError("Project name cannot be empty.")
    }
  }

  return (
    <>
      {/* Button to open the dialog */}
      <Button variant="secondary" onClick={() => setOpen(true)}>Add New</Button>

      {/* Dialog component */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Project</DialogTitle>
            <DialogDescription>Enter the name of the new project you want to create.</DialogDescription>
          </DialogHeader>

          {/* Input for Project Name */}
          <div className="my-4">
            <Input 
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Project Name"
              disabled={loading}  // Disable input when loading
            />
          </div>

          {/* Error message */}
          {error && <div className="text-red-500 my-2">{error}</div>}

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save"}  {/* Conditional button text */}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
