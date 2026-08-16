"use client"
import { Button } from '../ui/button'

function ButtonDetailCard() {
  return (
    <div className="flex justify-end gap-2">

  <Button variant="outline">
    Edit
  </Button>

  <Button variant="destructive">
    Delete
  </Button>

</div>
  )
}

export default ButtonDetailCard