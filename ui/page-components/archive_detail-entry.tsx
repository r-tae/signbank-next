import React, { useRef } from 'react'
import getConfig from "next/config";
import Head from 'next/head'
const { publicRuntimeConfig } = getConfig();

import { Button } from '@/components/basic'
import { VersionManagerWidget } from '@/components/video-version-manager';
import { Entry } from '@/components/layout';
import { useDictionaryEntryContext } from '@/lib/context/dictionary-entry';
import { Definition, DetailDictionaryEntry } from '@/types/api/entry';
import { useTranslation } from 'next-i18next';
import { useUserContext } from '@/lib/context/user';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/outline';
import { DefinitionList } from '@/components/detail-entry';

import styles from './detail-entry.module.scss'
import { Switch, Tab, TabList, TabPanel, Tabs } from '@mui/joy';

const renderDefinitions = (definitions: Definition[], addDefinition?: React.MouseEventHandler) => {
  const { t } = useTranslation(['common'])

  if (!definitions || definitions.length == 0) {
    return <div>
      {t('entry.no-definitions')}
      <Button
        title="Not available in this release"
        disabled
        onClick={addDefinition || (() => { })}
      >
        {t('entry.detail.add-definition')}
      </Button>
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
            onChange={() => { }}
          />
        </div>
        {/* Index would go here */}
        <div className='basis-24 grow-0 shrink-0'>{def.role}</div>
        <div className='shrink-1 shrink-1'>{def.text}</div>
      </div>
    ))
  ]
}

const Properties = () => {
  const entry = useDictionaryEntryContext() as DetailDictionaryEntry
  const { t } = useTranslation(['common'])

  const tabTitles = [
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

  if (!entry) {
    return null
  }

  return (
    <div className="rounded-lg border border-gray-400 bg-white p-3 ">
      <Tabs>
        <TabList className="-m-3 mb-1 flex space-x-1 rounded-lg bg-blue-900/20 p-1">
          {tabTitles.map((title) => (
            <Tab
              key={title}
              // className={({ selected }) =>
              //   `text-md w-full rounded-lg py-2.5 font-medium leading-5
              // ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-1
              // ${selected
              //     ? 'bg-white shadow'
              //     : 'text-gray-500 hover:bg-slate-100 hover:text-gray-700'
              //   }`
              // }
            >
              {title}
            </Tab>
          ))}
        </TabList>
          <TabPanel value={0}>
            <div className='pb-2 w-4/5 m-auto gap-2 flex flex-col divide-y divide-slate-200'>
              {[
                ['Sense number', entry.sense],
                ['Morphology', entry.morphology],
                ['Stem Sign Number', entry.stemSignNumber],
                ['Compound of', entry.compound],
                ['Language', entry.language.code],
                ['Proposed new sign', entry.proposedNewSign],
              ].map(([name, value]) => (
                <div className='pt-2 flex place-content-between'>
                  <div>{name}</div>
                  <div>{value}</div>
                </div>
              ))}
            </div>
          </TabPanel>
          <TabPanel value={1}>
            {/* TODO: don't want to hardcode phonology fields, but don't want to just hope translations are there either */}
            {/* TODO: right now the database only uses numbers for phonology values, fix this in the data import */}
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

              const phonology = Object.entries(entry.phonology).map(([name, value]) => ({ name, value }))

              return (
                <div className="pb-2 w-4/5 m-auto gap-2 flex flex-col divide-y divide-slate-200">
                  {/* container */}
                  {phonology.map(renderField)}
                </div>
              )
            }}
          </TabPanel>
          <TabPanel value={2}>
            {!entry.relations ? (
              <div>
                {/* TODO: Refactor into proper easy-to-read component */}
                This sign has no relations.
                <Button
                  title="Not available in this release"
                  disabled
                  onClick={() => { }}
                >
                  Add relation
                </Button>
              </div>
            ) : (
              entry.relations?.map((relation) => (
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
          </TabPanel>
          <TabPanel value={3}>
            <DefinitionList definitions={entry.definitions} />
          </TabPanel>
      </Tabs>
    </div>
  )
}

const KeyInfo = () => {
  const entry = useDictionaryEntryContext()
  const { t } = useTranslation(['common'])

  if (!entry) {
    return null
  }

  return (
    <div className="flex flex-col divide-y divide-slate-200 rounded-lg border border-gray-400 bg-white p-1">
      <div className="p-2">
        <strong>{t('entry.id-gloss')}:</strong> {entry.idGloss}
      </div>
      <div className="p-2">
        <strong>{t('entry.annotation-id-gloss')}:</strong>{' '}
        {entry.annotationIdGloss}
      </div>
      <div className="p-2">
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
      <div className="p-2">
        <strong>{t('entry.distribution-heading')}:</strong>{' '}
        {t(`human-readable-region-name`, 'Unknown', {
          context: entry.language.region,
        })}{' '}
        {entry.language.traditional &&
          t(`usage.traditional`, {
            tDescription: `shown after name of the region of usage for a sign (e.g. "Australia-wide traditional")`,
          })}
      </div>
    </div>
  )
}


export const DetailEntry = () => {
  const entry = useDictionaryEntryContext() as DetailDictionaryEntry
  const user = useUserContext()
  const { t } = useTranslation(['common'])

  const router = useRouter()

  const headSignVideoRef = useRef(null)

  const handleDetailViewToggle = () => {
    router.push(`/dictionary/${entry.idGloss}`, undefined, { shallow: true })
  }

  if (!entry) {
    return null
  }

  return (
    <>
      <Head>
        <title>
          {entry.idGloss} | {publicRuntimeConfig.SITE_NAME}
        </title>
      </Head>
      <Entry className={user.isLexicographer ? "userIsLexicographer" : ""}>
        {{
          headsign: (
            // <div className='mb-4 rounded border border-gray-400 bg-stone-50 flex flex-col'>
            <div className={styles.headsign}>
              <video
                // className={` ${user.isLexicographer ? "" : "rounded border-b"}`}
                src={
                  `${publicRuntimeConfig.STATIC_URL}${entry.videos?.sort(
                    (a: { version: number }, b: { version: number }) =>
                      a.version - b.version
                  )?.[0].url}`
                }
                controls
                muted
                preload="auto"
                ref={headSignVideoRef}
              />
              {user.isLexicographer &&
                <VersionManagerWidget videos={entry.videos} idGloss={entry.idGloss} />
              }
            </div>
          ),
          sidebar: [
            "Tags should go here",
            "Personal notes should go here",
          ],
          body: [
            <div className='ml-auto'>
              <Button onClick={handleDetailViewToggle}>
                {t('entry.switch-view-to', {
                  context: 'public',
                  tDescription:
                    'button that switches from the researcher view to the ordinary dictionary entry',
                })}
              </Button>
            </div>,
            // TODO: move entry to context
            <KeyInfo />,
            <Properties />
          ],
        }}
      </Entry>
    </>
  )
}