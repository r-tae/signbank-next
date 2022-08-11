import { useState } from "react"
import {
  CollectionIcon,
  PlusCircleIcon,
} from '@heroicons/react/outline'

import { Video } from "@/types/entry"
import { VersionManagerModal } from "."
import styles from "./version-manager.module.scss"


// TODO: use context for this
interface VersionManagerModalProps {
  idGloss: string
  videos: Video[]
  className?: string
}

export function VersionManagerWidget({ className = "", idGloss, videos }: VersionManagerModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  const openVideoVersionManager = () => {
    setIsOpen(true)
  }
  const closeVideoVersionManager = () => {
    setIsOpen(false)
  }

  // TODO: add editing capability
  return (
    <div className={`${styles.widget} ${className}`}>
      {/* TODO: UI work */}
      {videos?.length ?
        <button
          type="button"
          onClick={openVideoVersionManager}>
          <span>Video manager</span>
          {/* TODO: make this button icon nicer (and accessible) */}
          <CollectionIcon
            className={styles.icon}
          />
        </button>
        :
        <button
          type="button"
          onClick={openVideoVersionManager}>
          <span>This sign has no video</span>
          {/* TODO: make this button icon nicer (and accessible) */}
          <PlusCircleIcon
            className={styles.icon}
          />
        </button>
      }
      {/* video version manager controls (shows basic info and opens modal) */}
      <VersionManagerModal videos={videos} idGloss={idGloss} isOpen={isOpen} onClose={closeVideoVersionManager} />
    </div>
  )
}