import React from "react"
import { Definition } from "@/types/db"

type DefinitionListItemProps = {
  definition: Definition,
}
const DefinitionListItem: React.FC<DefinitionListItemProps> = ({ definition }) => {
  return (
    <div className="p-2 w-20 overflow-hidden">
      {definition.published}{' '}
      {definition.role}{' '}
      {definition.text}
    </div>
  ) 
}



type DefinitionListProps = {
  definitions: Definition[],
}
export const DefinitionList: React.FC<DefinitionListProps> = ({ definitions }) => {
  return (
    <div className="w-[80%] divide-y divide-slate-200">
      {definitions?.map(definition =>
        <DefinitionListItem definition={definition}  />)}
    </div>
  )
}