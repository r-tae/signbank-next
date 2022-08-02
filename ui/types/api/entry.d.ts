import { DictionaryEntry as DbDictionaryEntry } from '@/types/db'

export type Definition = {
  text: string
  published: boolean
  role: string
}

export type Keyword = {
  text: string
}

export type Video = {
  version: number
  url: string
}

// remove `relations' as stored in the DB, and replace with nested EntryPreview documents
type BaseDictionaryEntry = Omit<
  DbDictionaryEntry,
  '_id' | 'id' | 'relations'
> & {
  relations: {
    entry: DictionaryEntryPreview
    role: string
    sign: string
  }[]
  videoUrl: string
}

type PublicDictionaryEntry = Pick<
  BaseDictionaryEntry,
  'idGloss' | 'definitions' | 'keywords' | 'language' | 'videoUrl' | 'relations'
>

type DetailDictionaryEntry = BaseDictionaryEntry

export type DictionaryEntry = DetailDictionaryEntry | PublicDictionaryEntry

// TODO: is this enough properties for an entry preview? (to replicate legacy interface, yes, but do we need more)
// just enough properties to show a preview of the related entries
export type DictionaryEntryPreview = Pick<
  BaseDictionaryEntry,
  'idGloss' | 'videoUrl'
>
