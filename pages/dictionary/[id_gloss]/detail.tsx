import React, { useEffect, useRef, useState } from 'react'
import { Switch, Tab } from '@headlessui/react'
import {
  ArrowRightIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  InformationCircleIcon,
  XIcon,
} from '@heroicons/react/solid'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { SWRResponse } from 'swr/dist/types'

import { Button } from '@/components/basic/button'
import { useDictionaryEntry } from '@/lib/dictionary/hooks'
import { DetailDictionaryEntry } from '@/types/api/entry'

// TODO: use like actual buttons for publishing, not whatever we have now
// TODO: make reording definitions a drag-drop operation instead of the legacy jank (make the move up/down buttons are more accessible?)
const DetailViewChunk = ({ data }: { data: DetailDictionaryEntry }) => {
  const _ = useRouter()
  const { t } = useTranslation(['common'])

  const headings = [
    t('entry.detail.basic-heading', {
      tDescription: 'heading for basic information section of detail view',
    }),
    t('entry.detail.phonology-heading', {
      tDescription: 'heading for phonology section of detail view',
    }),
    t('entry.detail.relations-heading', {
      tDescription: 'relations heading in detail view',
    }),
    t('entry.detail.definitions-heading', {
      tDescription: 'definitions heading in detail view',
    }),
  ]

  return (
    <>
      <div className="flex flex-col divide-y divide-slate-200 rounded-lg border border-gray-400 bg-white p-1">
        <div className="p-2">
          <strong>{t('entry.id-gloss')}:</strong> {data.idGloss}
        </div>
        <div className="p-2">
          <strong>{t('entry.annotation-id-gloss')}:</strong>{' '}
          {data?.annotationIdGloss}
        </div>
        <div className="p-2">
          <strong>
            {t('entry.keywords-heading', {
              tDescription:
                'Heading for the list of translations in a spoken language.',
            })}
            :
          </strong>{' '}
          {data.keywords.map((x, index) => (
            <span key={x.text}>
              {index ? ', ' : ''}
              {/* TODO: change this so the search query highlighted */}
              <span>{x.text}</span>
            </span>
          ))}
        </div>
        <div className="p-2">
          <strong>{t('entry.distribution-heading')}:</strong>{' '}
          {t(`human-readable-region-name`, 'Unknown', {
            context: data.language.region,
          })}{' '}
          {data.language.traditional &&
            t(`usage.traditional`, {
              tDescription: `shown after name of the region of usage for a sign (e.g. "Australia-wide traditional")`,
            })}
        </div>
      </div>
      <div className="rounded-lg border border-gray-400 bg-white p-3 ">
        <Tab.Group>
          <Tab.List className="-m-3 mb-1 flex space-x-1 rounded-lg bg-blue-900/20 p-1">
            {headings.map((heading) => (
              <Tab
                key={heading}
                className={({ selected }) =>
                  `text-md w-full rounded-lg py-2.5 font-medium leading-5
                    ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-1
                    ${
                      selected
                        ? 'bg-white shadow'
                        : 'text-gray-500 hover:bg-slate-100 hover:text-gray-700'
                    }`
                }
              >
                {heading}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="focus:ring-2' ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none">
            <Tab.Panel>
              Sense Number --- No Value Set
              <br />
              Morphology --- No Value Set
              <br />
              Stem Sign Number --- No Value Set
              <br />
              Compound of --- No Value Set
              <br />
              Language --- Auslan, BSL
              <br />
              Regional template --- No Value Set
              <br />
              <div className="flex flex-row">
                Proposed new sign
                <Switch
                  checked={data?.proposedNewSign}
                  onChange={() => {}}
                  className={`${
                    data.proposedNewSign ? 'bg-blue-600' : 'bg-gray-200'
                  } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                  <span className="sr-only">Enable notifications</span>
                  <span
                    className={`${
                      data.proposedNewSign ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white`}
                  />
                </Switch>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              {/* TODO: don't want to hardcode phonology fields, but don't want to just hope translations are there either */}
              {/* TODO: right now the database only uses numbers for phonology values, fix this in the data import */}
              {/* <table>
                {Object.entries(data.data.phonology).map(x => (
                  <tr>
                    <td>
                      {t(`entry.detail.${x[0]}`)}
                    </td>
                    <td>
                      {String(x[1])}
                    </td>
                  </tr>
                ))}
              </table>
              <div>test of different UI</div> */}
              {() => {
                // HACK: refactor this out, this is very ugly
                type PhonologyField = {
                  name: string
                  value: string
                }
                const initial: PhonologyField[] = []
                const final: PhonologyField[] = []
                const renderField = ({ name, value }: PhonologyField) => {
                  return (
                    <div>
                      {name} {value}
                    </div>
                  )
                }

                Object.entries(data.phonology).map((field) => {
                  const [fieldName, value]: [string, string] = field as [
                    string,
                    string
                  ]

                  if (fieldName.startsWith('initial'))
                    initial.push({ name: fieldName, value })
                  else if (fieldName.startsWith('final'))
                    final.push({ name: fieldName, value })
                  else
                    console.error(
                      `${fieldName} is neither "initial" nor "final"`
                    )
                })
                return (
                  <div className="flex w-full flex-row gap-4">
                    {' '}
                    {/* container */}
                    <div className="grow">
                      {' '}
                      {/* left (initial) */}
                      {initial.map(renderField)}
                    </div>
                    <div className="justify-centre w-11 text-gray-400">
                      <ArrowRightIcon />
                    </div>
                    <div className="grow">
                      {' '}
                      {/* right (final) */}
                      {final.map(renderField)}
                    </div>
                  </div>
                )
              }}
            </Tab.Panel>
            <Tab.Panel className="divide-y divide-slate-200">
              {!data.relations ? (
                <div>
                  No relations. <Button onClick={() => {}}>Add relation</Button>
                </div>
              ) : (
                data.relations?.map((relation) => (
                  <Link
                    key={relation.sign}
                    href={`/dictionary/${relation.sign}/detail`}
                  >
                    <a className={`flex w-full flex-row py-2`}>
                      <div>{relation.sign}</div>
                      <div>{relation.role}</div>
                      <ChevronRightIcon className="ml-auto h-5 text-gray-500" />
                    </a>
                  </Link>
                ))
              )}
            </Tab.Panel>
            <Tab.Panel>Definitions</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  )
}

function DetailViewToggleButton({
  isDetailView,
  onDetailViewToggle,
}: {
  isDetailView: any
  onDetailViewToggle: any
}) {
  const { t } = useTranslation(['common'])

  if (isDetailView) {
    return (
      <Button className="mr-auto" onClick={onDetailViewToggle}>
        {t('entry.switch-view-to', {
          context: 'public',
          tDescription:
            'button that switches from the researcher view to the ordinary dictionary entry',
        })}
      </Button>
    )
  } else {
    return (
      <Button className="mr-auto" onClick={onDetailViewToggle}>
        {t('entry.switch-view-to', {
          context: 'detail',
          tDescription:
            'button that switches from the ordinary dictionary entry to the researcher view',
        })}
      </Button>
    )
  }
}

const DictionaryEntry: NextPage = () => {
  const headSignVideoRef = useRef(null)

  const router = useRouter()
  const { id_gloss } = router.query

  const { data, error } = useDictionaryEntry(id_gloss as string) as SWRResponse<
    { data: DetailDictionaryEntry },
    any
  >

  const { t } = useTranslation(['common'])

  // TODO: move to envvar
  const staticFilesHost = 'https://media.auslan.org.au/'

  // TODO: write proper error/loading UI
  if (error) {
    return <div>{t('error.page-load')}</div>
  }
  if (!data) {
    return <div>{t('page-loading')}</div>
  }

  const handleDetailViewToggle = () => {
    router.push(`/dictionary/${id_gloss}`, undefined, { shallow: true })
  }

  const handlePublish = () => {
    // TODO: call api
  }

  const handleUnpublish = () => {
    // TODO: call api
  }

  // HACK: this can be more elegant
  const verbs =
    data?.data?.definitions?.filter((x) => x.partOfSpeech === 'verb') || []
  const nouns =
    data?.data?.definitions?.filter((x) => x.partOfSpeech === 'noun') || []
  return (
    <main className="max-w-6xl overflow-visible px-16 xl:px-0">
      <Head>
        <title>
          {data.data.idGloss} | Auslan Signbank
          {/* TODO: use site name from config/envvars */}
        </title>
      </Head>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="min-w-[36ch] max-w-[33%]">
          {/* TODO: get autoplay working properly */}
          {/* TODO: show other versions somehow if logged in with an editor role */}
          <video
            className="mb-1 mt-10 w-full rounded bg-gray-300 md:mt-0"
            src={`${staticFilesHost}${
              data.data.videos.sort(
                (a: { version: number }, b: { version: number }) =>
                  a.version - b.version
              )[0].url
            }`}
            controls
            muted
            preload="auto"
            ref={headSignVideoRef}
          />
          <div className="mb-4 rounded border border-gray-400 bg-stone-50 px-2 py-1 pb-2">
            <em>
              video version manager controls (maybe just gives number of
              versions and a button to open a modal)
            </em>
          </div>
          <div className="my-2 rounded border border-gray-400 bg-stone-50 px-2 py-1 pb-2">
            <em>I think this will be tags or something</em>
          </div>
          <div className="rounded border border-gray-400 bg-stone-50 px-2 py-1 pb-2">
            <h2 className="text-md font-semibold">
              {t('entry.variant-heading', {
                tDescription:
                  'heading above video thumbnails, the videos show other versions of the headsign, if any exist',
              })}
              <span className="pl-[0.5em] text-sm font-light">
                {t('entry.enlarge-reminder', {
                  tDescription:
                    'instructs the user to click on a video thumbnail below, to view a larger version of a video',
                })}
              </span>
            </h2>

            {/* TODO: move filter/mapping to a nicer place */}
            {/* TODO: "(click to enlarge)" is not true yet */}
            {/* TODO: autoplay one after the other is going to be a little difficult */}
            <div className="flex flex-row flex-wrap gap-2">
              {data.data.relations
                ?.filter((relation) => relation.role === 'variant')
                .map((variant, index) => {
                  return (
                    <video
                      key={variant.entry.idGloss}
                      className="mb-1 mt-10 w-44 rounded bg-gray-300 md:mt-0"
                      src={`${staticFilesHost}${variant.entry.videoUrl}`}
                    />
                  )
                })}
            </div>
          </div>
        </div>
        <div className="flex grow flex-col gap-2">
          <div className="flex h-10 flex-row justify-end gap-x-4 py-1">
            <DetailViewToggleButton
              isDetailView={true}
              onDetailViewToggle={handleDetailViewToggle}
            />
            <a
              href="/prev-sign"
              className="border-md h-[1.5em] w-[1.5em] rounded border border-slate-700 bg-white"
            >
              <ChevronLeftIcon />
            </a>
            <div>
              {/* TODO: TJ wants to get rid of this entirely, haven't discussed it yet */}
              Sign 568 of 4056
            </div>
            <a
              href="/next-sign"
              className="border-md h-[1.5em] w-[1.5em] rounded border border-slate-700 bg-white"
            >
              <ChevronRightIcon />
            </a>
          </div>
          <DetailViewChunk data={data.data} />
          <div className="flex w-full flex-row">
            {data.data.published ? (
              <div className="ml-auto flex">
                <div className="text-gray-600">
                  {t('entry.detail.publicly-visible')}
                </div>
                <Button onClick={handleUnpublish}>
                  {t('entry.detail.unpublish-button')}
                </Button>
              </div>
            ) : (
              <div className="ml-auto flex">
                <div className="text-gray-600">
                  {t('entry.detail.not-publicly-visible')}
                </div>
                <Button onClick={handlePublish}>
                  {t('entry.detail.publish-button')}
                </Button>
              </div>
            )}
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
