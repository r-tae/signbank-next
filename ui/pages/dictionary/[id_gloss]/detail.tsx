import React, { useEffect, useRef, useState } from 'react'
import { Tab } from '@headlessui/react'
import {
  ArrowRightIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  InformationCircleIcon,
  XIcon,
} from '@heroicons/react/solid'
import type { NextPage } from 'next'
import getConfig from "next/config";
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { SWRResponse } from 'swr/dist/types'
const { publicRuntimeConfig } = getConfig();


import { Button } from '@/components/basic/button'
import { Switch } from '@/components/basic/switch'
import { useDictionaryEntry } from '@/lib/dictionary/hooks'
import { Definition, DetailDictionaryEntry } from '@/types/api/entry'

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

  const renderDefinitions = (definitions: Definition[], addDefinition?: React.MouseEventHandler) => {
    if (!definitions || definitions.length == 0) {
      return <div>
        {t('entry.no-definitions')} <Button title="Not available in this release" disabled onClick={addDefinition || (() => {})}>{t('entry.detail.add-definition')}</Button>
      </div>
    }

    const header = (
      <div className={`flex w-full flex-row p-2 gap-4 font-medium`}>
        <div className='basis-24 grow-0 shrink-0'>{t('entry.detail.definition-published', {
          tDescription: `heading in definitions table for whether or not a definition is published (available to the public)`
        })}</div>
        <div className='basis-24 grow-0 shrink-0'>{t('entry.detail.definition-role', {
          tDescription: `heading in definitions table for a definition's role`
        })}</div>
        <div className=''>{t('entry.detail.definition-text', {
          tDescription: `heading in definitions table for the text of a definition`
        })}</div>
      </div>
    )

    return [
      header,
      ...definitions.map(def => (
        <div key={def.text} className={`flex w-full flex-row p-2 gap-4 text-sm ${!def.published ? 'text-slate-500' : ''}`}>
          <div className='basis-24 grow-0 shrink-0 p-2 align-center'>
            <Switch
              checked={def.published}
              onChange={() => {}}
            />
          </div>
          {/* Index would go here */}
          <div className='basis-24 grow-0 shrink-0'>{def.role}</div>
          <div  className='shrink-1 shrink-1'>{def.text}</div>
        </div>
      ))
    ]
  }

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
          <Tab.Panels className="pt-3">
            <Tab.Panel>
              <div className='pb-2 w-4/5 m-auto gap-2 flex flex-col divide-y divide-slate-200'>
                <div className='pt-2 flex place-content-between'>
                  <div>Sense Number</div>
                  <div>{data.sense}</div>
                </div>
                <div className='pt-2 flex place-content-between'>
                  <div>Morphology</div>
                  <div>{data.morphology}</div>
                </div>
                <div className='pt-2 flex place-content-between'>
                  <div>Stem Sign Number</div>
                  <div>{data.stemSignNumber}</div>
                </div>
                <div className='pt-2 flex place-content-between'>
                  <div>Compound of</div>
                  <div>{data.compound}</div>
                </div>
                <div className='pt-2 flex place-content-between'>
                  <div>Language</div>
                  <div>{data.language.code}</div>
                </div>
                <div className='pt-2 flex place-content-between'>
                  <div>Proposed new sign</div>
                  <div>
                    <Switch
                      checked={data?.proposedNewSign}
                      onChange={() => {}}
                    />
                  </div>
                </div>
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
                const renderField = ({ name, value }: PhonologyField) => {
                  const translationFromPhonField: { [index: string]: string } = {
                    "initialDominantHandshape": t('entry.phonology.initialDominantHandshape'),
                    "initialSubordinateHandshape": t('entry.phonology.initialSubordinateHandshape'),
                    "finalDominantHandshape": t('entry.phonology.finalDominantHandshape'),
                    "finalSubordinateHandshape": t('entry.phonology.finalSubordinateHandshape'),
                    "initialPrimaryLocation": t('entry.phonology.initialPrimaryLocation'),
                    "finalPrimaryLocation": t('entry.phonology.finalPrimaryLocation'),
                    "initialPalmOrientation": t('entry.phonology.initialPalmOrientation'),
                    "finalPalmOrientation": t('entry.phonology.finalPalmOrientation'),
                    "initialDominantInteractingHandpart": t('entry.phonology.initialDominantInteractingHandpart'),
                    "finalDominantInteractingHandpart": t('entry.phonology.finalDominantInteractingHandpart'),
                    "initialSubordinateInteractingHandPart": t('entry.phonology.initialSubordinateInteractingHandPart'),
                    "finalSubordinateInteractingHandPart": t('entry.phonology.finalSubordinateInteractingHandPart'),
                    "secondaryLocation": t('entry.phonology.secondaryLocation'),
                    "initialSecondaryLocation": t('entry.phonology.initialSecondaryLocation'),
                    "finalSecondaryLocation": t('entry.phonology.finalSecondaryLocation'),
                  } as const

                  let nameTranslation: string;
                  if (!(name in translationFromPhonField)) {
                    nameTranslation = name
                  } else {
                    nameTranslation = translationFromPhonField[name]
                  }
                  
                  return (
                    <div key={name} className="pt-2 flex place-content-between">
                      <div>
                        {nameTranslation}
                      </div>
                      <div>
                        {value || t('n/a', { tDescription: 'placeholder for empty/missing values' })}
                      </div>
                    </div>
                  )
                }

                const phonology = Object.entries(data.phonology).map(([ name, value ]) => ({ name, value }))

                return (
                  <div className="pb-2 w-4/5 m-auto gap-2 flex flex-col divide-y divide-slate-200">
                    {/* container */}
                    {phonology.map(renderField)}
                  </div>
                )
              }}
            </Tab.Panel>
            <Tab.Panel className="divide-y divide-slate-200">
              {!data.relations ? (
                <div>
                  This sign has no relations. <Button title="Not available in this release" disabled onClick={() => {}}>Add relation</Button>
                </div>
              ) : (
                data.relations?.map((relation) => (
                  <Link
                    key={relation.sign}
                    href={`/dictionary/${relation.sign}/detail`}
                  >
                    <a className={`flex w-full flex-row p-2`}>
                      <div>
                        <div>{relation.sign}</div>
                        <div className='font-light text-sm'>{relation.role}</div>
                      </div>
                      <ChevronRightIcon className="ml-auto h-5 text-gray-500 self-center" />
                    </a>
                  </Link>
                ))
              )}
            </Tab.Panel>
            <Tab.Panel className="divide-y divide-slate-200">
              {renderDefinitions(data.definitions)}
            </Tab.Panel>
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
    data?.data?.definitions?.filter((x) => x.role === 'verb') || []
  const nouns =
    data?.data?.definitions?.filter((x) => x.role === 'noun') || []
  return (
    <main className="max-w-6xl overflow-visible px-16 xl:px-0">
      <Head>
        <title>
          {data.data.idGloss} | {publicRuntimeConfig.SITE_NAME}
        </title>
      </Head>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="basis-1/3 shrink-0 grow-0">
          {/* TODO: get autoplay working properly */}
          {/* TODO: show other versions somehow if logged in with an editor role */}
          <video
            className="mb-1 mt-10 w-full rounded bg-gray-300 md:mt-0"
            src={`${publicRuntimeConfig.STATIC_URL}${
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
              video version manager controls (maybe just
              gives number of versions and a button to open a modal)
            </em>
          </div>
          <div className="my-2 rounded border border-gray-400 bg-stone-50 px-2 py-1 pb-2">
            <em>Tags have not yet been added to this version of Signbank</em>
          </div>
          <div className="rounded border border-gray-400 bg-stone-50 px-2 py-1 pb-2">
            <em>Interpreter notes will go here (if we still want them)</em>
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
