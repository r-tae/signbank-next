import React from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { DictionaryEntryContext } from '@/lib/context/dictionary-entry';
import { DetailEntry } from 'page-components/detail-entry';
import { useDictionaryEntry } from '@/lib/dictionary/hooks';
import { SWRResponse } from 'swr';
import { DetailDictionaryEntry } from '@/types/api/entry'

// TODO: use like actual buttons for publishing, not whatever we have now
// TODO: make reording definitions a drag-drop operation instead of the legacy jank (maybe the move up/down buttons are more accessible?)

const DictionaryEntry: NextPage = () => {
  const { t } = useTranslation(['common'])
  const router = useRouter()
  const { id_gloss } = router.query


  const { data: entry, error } = useDictionaryEntry(id_gloss as string) as SWRResponse<
    DetailDictionaryEntry,
    any
  >

  // TODO: add proper loading/error versions (preferably with Suspense)
  if (error) {
    return <div>{t('error.page-load')}</div>
  }
  if (!entry) {
    return <div>{t('page-loading')}</div>
  }

  return (
    <DictionaryEntryContext.Provider value={entry}>
      <DetailEntry />
    </DictionaryEntryContext.Provider>
  )
}

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default DictionaryEntry
