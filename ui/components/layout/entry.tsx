import { Grid } from "@mui/joy"
import { Box, Container } from "@mui/system"
import { ReactNode } from "react"
import styles from './entry.module.scss'

interface EntryProps {
  children: {
    headsign: ReactNode,
    sidebar: ReactNode[],
    body: ReactNode[],
  }
  className?: string
}

export function Entry() {
  return (
    <Container component="main">
      <Grid />
    </Container>
  )
}

export function ArchiveEntry({ className = "", children }: EntryProps) {
  return (
    <main className={`${styles.entry} ${className}`}>
      <div>
        <div className={styles.sidebar}>
          {children.headsign}
          {children.sidebar.map(x => (
            <div className={styles.sidebarPanel}>
              {/* TODO: devise some way of allowing variable gaps between sidebar items */}
              {x}
            </div>
          ))}
        </div>
        <div className={styles.body}>
          {children.body.map(x => (
            <>
              {x}
            </>
          ))}
          {/* Body (contains multiple `Panel`s) */}
        </div>
      </div>
    </main>
  )
}

type PanelProps = React.PropsWithChildren
function Panel({ children }: PanelProps) {
  return (
    <div>
      children
    </div>
  )
}


