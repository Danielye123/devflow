import React from 'react'

interface Props {
    type: string;
    itemId: string;
}

const EditDeleteAction = ({ type, itemId }: Props) => {
  return (
    <div className="flex items-center justify-end gap-3 max-sm:w-full">EditDeleteAction</div>
  )
}

export default EditDeleteAction