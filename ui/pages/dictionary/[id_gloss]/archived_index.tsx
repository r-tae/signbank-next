import React from 'react'
import {
  InformationCircleIcon,
} from '@heroicons/react/solid'
import type { NextPage } from 'next'
import getConfig from "next/config";
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
const { publicRuntimeConfig } = getConfig();

import { Button } from '@/components/basic'
import { RegionInfoBox } from '@/components/region'
import { useDictionaryEntry } from '@/lib/dictionary/hooks'
import { DetailDictionaryEntry } from '@/types/api/entry'

const DictionaryEntry: NextPage = () => {
  const router = useRouter()
  const { id_gloss } = router.query

  const { data: entry, error } = useDictionaryEntry(id_gloss as string)
  
  const { t } = useTranslation(['common'])

  // TODO: write proper error/loading UI
  if (error) {
    return <div>{t('error.page-load')}</div>
  }
  if (!entry) {
    return <div>{t('page-loading')}</div>
  }

  const handleSwitchToDetailView = () => {
    router.push(`/dictionary/${id_gloss}/detail`, undefined, { shallow: true })
  }

  // TODO: we don't want to hardcode like this if we can help it
  const verbs =
    entry.definitions?.filter((x) => x.role === 'verb') || []
  const nouns =
    entry.definitions?.filter((x) => x.role === 'noun') || []

  console.log({ defs: entry.definitions, nouns, verbs})
  // NOTE: for the public dictionary view there is no point showing variants with no visual
  const variants = entry.relations
      ?.filter((relation) => relation.role === 'variant' && !!relation?.entry?.videoUrl)

  return (
    <main className="max-w-6xl overflow-visible px-16 xl:px-0">
      <Head>
        {/* TODO: use the keyword that matched search term */}
        <title>
          {entry.keywords[0].text.charAt(0).toUpperCase() +
            entry.keywords[0].text.slice(1)}{' '}
          | {publicRuntimeConfig.SITE_NAME}
        </title>
      </Head>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="basis-1/3 shrink-0 grow-0">
          {/* TODO: get autoplay working properly */}
          {/* TODO: show other versions somehow if logged in with an editor role */}
          <video
            className="mb-1 mt-10 w-full rounded bg-gray-300 md:mt-0"
            src={`${publicRuntimeConfig.STATIC_URL}${
              (entry as DetailDictionaryEntry).videos?.sort(
                (a: { version: number }, b: { version: number }) =>
                  a.version - b.version
              )[0].url
            }`}
            controls
            muted
            preload="auto"
          />
          <div className="mb-4">
            <strong>
              {t('entry.keywords-heading', {
                tDescription:
                  'Heading for the list of translations in a spoken language.',
              })}
              :
            </strong>{' '}
            {entry.keywords.map((x, index) => (
              <span key={x.text}>
                {index ? ', ' : ''}
                {/* TODO: change this so the search query highlighted */}
                <span>{x.text}</span>
              </span>
            ))}
          </div>
          
          {variants && variants.length > 0 &&
            <div className="rounded border border-gray-400 bg-stone-50 px-2 py-1 pb-2">
              <h2 className="text-md font-semibold">
                {t('entry.variant-heading', {
                  tDescription:
                    'heading above video thumbnails, the videos show other versions of the headsign, if any exist',
                })}
                <span className="text-sm font-light">
                  {t('entry.enlarge-reminder', {
                    tDescription:
                      'instructs the user to click on a video thumbnail below, to view a larger version of a video',
                  })}
                </span>
              </h2>

              {/* TODO: move filter/mapping to a nicer place */}
              {/* TODO: "(click to enlarge)" is not true yet */}
              {/* TODO: autoplay maybe */}
              <div className="flex flex-row flex-wrap gap-2">
                {variants
                  .map(({ entry }) => (
                    <video
                      key={entry?.videoUrl}
                      className="mb-1 mt-10 w-44 rounded bg-gray-300 md:mt-0"
                      src={`${publicRuntimeConfig.STATIC_URL}${entry?.videoUrl}`}
                    />
                  ))}
              </div>
            </div>
          }

          <RegionInfoBox
            region={entry.language.region}
            traditional={entry.language.traditional}
            languageCode={entry.language.code}
          />
        </div>
        <div className="grow flex flex-col gap-2">
          <div className="flex h-10 flex-row justify-end gap-x-4 py-1">
            <Button onClick={handleSwitchToDetailView}>
              {t('entry.switch-view-to', {
                context: 'detail',
                tDescription:
                  'button that switches from the ordinary dictionary entry to the researcher view',
              })}
            </Button>
          </div>
          <div className="min-w-[40ch] rounded border border-gray-400 bg-stone-50 px-8 py-4">
            {/* <h2 className="font-quicksand text-lg font-bold"> */}
              {/* TODO: we want to support an arbitrary number of languages at some point in the future*/}
              {/* TODO: give language codes to SL definitions and render conditionally */}
              {/* {t('entry.sl-native-definition-heading', {
                context: 'asf',
                tDescription:
                  'heading for video of definition in a given sign language',
              })}
            </h2>
            <video className="mb-4 w-44 rounded bg-gray-300" src="" /> */}
            {/* HACK: this should be cleaner */}
            {[...nouns, ...verbs].length === 0 ? (
              <div>
                <InformationCircleIcon className="inline h-5 -translate-y-[13%] fill-slate-600" />
                {t('entry.no-definitions')}
              </div>
            ) : (
              <>
                {nouns.length > 0 && (
                  <>
                    <h2 className="font-quicksand text-lg font-bold">
                      {/* TODO: need to populate this programmatically in the future, remove hardcoded */}
                      {/* NOTE: would be good to only support set number of these actually */}
                      {t('entry.definition-as-pos', {
                        context: 'noun',
                        tDescription: 'e.g. "As a noun"',
                      })}
                    </h2>
                    <ol className="ml-4 list-outside list-[arabic]">
                      {nouns.map((x) => (
                        <li key={x.text} className="pb-2">
                          {x.text}
                        </li>
                      ))}
                    </ol>
                  </>
                )}
                {verbs.length > 0 && (
                  <>
                    <h2 className="font-quicksand text-lg font-bold">
                      {t('entry.definition-as-pos', {
                        context: 'verb',
                        tDescription: 'e.g. "As a verb"',
                      })}
                    </h2>
                    <ol className="ml-4 list-outside list-[arabic]">
                      {verbs.map((x) => (
                        <li key={x.text} className="pb-2">
                          {x.text}
                        </li>
                      ))}
                    </ol>
                  </>
                )}
              </>
            )}
          </div>
          <div className="ml-auto pr-4 text-slate-600">
            <a className="inline-block pr-4 underline">
              {t('entry.report-sign-link', {
                tDescription:
                  'interactable link that allows user to report a sign that they could not find in Signbank',
              })}
            </a>
            <a className="inline-block underline">
              {t('entry.feedback-link', {
                tDescription:
                  'interactable link that allows user to provide feedback on the current entry',
              })}
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default DictionaryEntry
