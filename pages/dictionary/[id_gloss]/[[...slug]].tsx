import {
  ChevronLeftIcon,
  ChevronRightIcon,
  InformationCircleIcon,
} from '@heroicons/react/solid'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Collapse } from '@/components/basic'
import { RegionInfoBox } from '@/components/region'
import { useDictionaryEntry } from '@/lib/dictionary/hooks'

// TODO: use like actual buttons for publishing, not whatever we have now
// TODO: make reording definitions a drag-drop operation instead of the legacy jank (make the move up/down buttons are more accessible?)
const DetailViewChunk = ({ data }: { data: any }) => {
  const { t } = useTranslation(['common'])

  return (
    <>
      <Collapse
        header={t('entry.detail.basic-heading', {
          tDescription: 'heading for basic information section of detail view',
        })}
      >
        <div className="w-full px-4 py-2"></div>
      </Collapse>
      <Collapse
        header={t('entry.detail.dialect-heading', {
          tDescription:
            'heading for dialect information section of detail view',
        })}
      >
        <div className="w-full px-4 py-2">
          {t('entry.distribution-heading')}{' '}
          {t(`human-readable-region-name`, 'Unknown', {
            context: data.dictionaryEntry.language.region,
          })}{' '}
          {data.dictionaryEntry.language.traditional &&
            t(`usage.traditional`, {
              tDescription: `shown after name of the region of usage for a sign (e.g. "Australia-wide traditional")`,
            })}
        </div>
      </Collapse>
      <Collapse
        header={t('entry.detail.publication-heading', {
          tDescription: 'heading for publication status section of detail view',
        })}
      >
        <div className="w-full px-4 py-2"></div>
      </Collapse>
      <Collapse
        header={t('entry.detail.phonology-heading', {
          tDescription: 'heading for phonology section of detail view',
        })}
      >
        <div className="w-full px-4 py-2">
          <table>
            <tr>
              <td>
                {t('entry.detail.initialDominantHandshape', {
                  tDescription: 'Initial dominant handshape',
                })}
              </td>
              <td>
                {data.dictionaryEntry.phonology['initialDominantHandshape']}
              </td>
            </tr>
            <tr>
              <td>
                {t('entry.detail.finalDominantHandshape', {
                  tDescription: 'Final dominant handshape',
                })}
              </td>
              <td>
                {data.dictionaryEntry.phonology['finalDominantHandshape']}
              </td>
            </tr>
            <tr>
              <td>
                {t('entry.detail.initialSubordinateHandshape', {
                  tDescription: 'Initial subordinate handshape',
                })}
              </td>
              <td>
                {data.dictionaryEntry.phonology['initialSubordinateHandshape']}
              </td>
            </tr>
            <tr>
              <td>
                {t('entry.detail.finalSubordinateHandshape', {
                  tDescription: 'Final subordinate handshape',
                })}
              </td>
              <td>
                {data.dictionaryEntry.phonology['finalSubordinateHandshape']}
              </td>
            </tr>
            <tr>
              <td>
                {t('entry.detail.initialPrimaryLocation', {
                  tDescription: 'Initial primary location',
                })}
              </td>
              <td>
                {data.dictionaryEntry.phonology['initialPrimaryLocation']}
              </td>
            </tr>
            <tr>
              <td>
                {t('entry.detail.finalPrimaryLocation', {
                  tDescription: 'Final primary location',
                })}
              </td>
              <td>{data.dictionaryEntry.phonology['finalPrimaryLocation']}</td>
            </tr>
            <tr>
              <td>
                {t('entry.detail.initialDominantInteractingHandPart', {
                  tDescription: 'Initial dominant interacting hand part',
                })}
              </td>
              <td>
                {
                  data.dictionaryEntry.phonology[
                    'initialDominantInteractingHandPart'
                  ]
                }
              </td>
            </tr>
            <tr>
              <td>
                {t('entry.detail.finalDominantInteractingHandPart', {
                  tDescription: 'Final dominant interacting hand part',
                })}
              </td>
              <td>
                {
                  data.dictionaryEntry.phonology[
                    'finalDominantInteractingHandPart'
                  ]
                }
              </td>
            </tr>
            <tr>
              <td>
                {t('entry.detail.initialSubordinateInteractingHandPart', {
                  tDescription: 'Initial subordinate interacting hand part',
                })}
              </td>
              <td>
                {
                  data.dictionaryEntry.phonology[
                    'initialSubordinateInteractingHandPart'
                  ]
                }
              </td>
            </tr>
            <tr>
              <td>
                {t('entry.detail.finalSubordinateInteractingHandPart', {
                  tDescription: 'Final subordinate interacting hand part',
                })}
              </td>
              <td>
                {
                  data.dictionaryEntry.phonology[
                    'finalSubordinateInteractingHandPart'
                  ]
                }
              </td>
            </tr>
            <tr>
              <td>
                {t('entry.detail.secondaryLocation', {
                  tDescription: 'Secondary location',
                })}
              </td>
              <td>{data.dictionaryEntry.phonology['secondaryLocation']}</td>
            </tr>
          </table>
        </div>
      </Collapse>
      <Collapse
        header={t('entry.detail.relations-heading', {
          tDescription: 'relations heading in detail view',
        })}
      >
        <div className="w-full px-4 py-2"></div>
      </Collapse>
      <Collapse
        header={t('entry.detail.definitions-heading', {
          tDescription: 'definitions heading in detail view',
        })}
      >
        <div className="w-full px-4 py-2"></div>
      </Collapse>
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

  const Button = ({ children }: { children: any }) => (
    <button
      onClick={onDetailViewToggle}
      className="border-md slate-700 mr-auto rounded border border bg-white px-2"
    >
      {children}
    </button>
  )

  if (isDetailView) {
    return (
      <Button>
        {t('entry.switch-view-to', {
          context: 'public',
          tDescription:
            'button that switches from the researcher view to the ordinary dictionary entry',
        })}
      </Button>
    )
  } else {
    return (
      <Button>
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
  const router = useRouter()
  const { id_gloss, slug } = router.query

  const { data, error } = useDictionaryEntry(id_gloss as string)

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

  // HACK: I hate everything about this, would it be better to just have two different pages, probably, will have to extract each part of the page into its own component
  const isDetailView = slug?.[0] === 'detail'

  const handleDetailViewToggle = () => {
    router.push(
      isDetailView
        ? `/dictionary/${id_gloss}`
        : `/dictionary/${id_gloss}/detail`,
      undefined,
      { shallow: true }
    )
  }

  const verbs =
    data?.dictionaryEntry?.definitions?.filter(
      (x) => x.partOfSpeech === 'verb'
    ) || []
  const nouns =
    data?.dictionaryEntry?.definitions?.filter(
      (x) => x.partOfSpeech === 'noun'
    ) || []
  return (
    <main className="max-w-6xl overflow-visible px-16 xl:px-0">
      <div className="relative"></div>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="min-w-[36ch]">
          {/* TODO: get autoplay working properly */}
          {/* TODO: show other versions somehow if logged in with an editor role */}
          <video
            className="mb-1 mt-10 w-full rounded bg-gray-300 md:mt-0"
            src={`${staticFilesHost}${
              data.dictionaryEntry.videos.sort(
                (a: { version: number }, b: { version: number }) =>
                  a.version - b.version
              )[0].url
            }`}
          />
          <div className="mb-4">
            <strong>
              {t('entry.keywords-heading', {
                tDescription:
                  'Heading for the list of translations in a spoken language.',
              })}
            </strong>{' '}
            {data.dictionaryEntry.keywords.map((x, index) => (
              <span key={x.text}>
                {index ? ', ' : ''}
                {/* TODO: change this so the search query highlighted */}
                <span>{x.text}</span>
              </span>
            ))}
          </div>
          <div className="rounded border border-black bg-stone-50 px-2 py-1 pb-2">
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

            {/* TODO: grab these from the entry */}
            <div className="flex flex-row flex-wrap gap-2">
              <video className="w-28 rounded bg-slate-300" src="" />
              <video className="w-28 rounded bg-slate-300" src="" />
              <video className="w-28 rounded bg-slate-300" src="" />
            </div>
          </div>
          <RegionInfoBox
            region={data.dictionaryEntry.language.region}
            traditional={data.dictionaryEntry.language.traditional}
            languageCode={data.dictionaryEntry.language.code}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex h-10 flex-row justify-end gap-x-4 py-1">
            <DetailViewToggleButton
              isDetailView={isDetailView}
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
          {isDetailView && <DetailViewChunk data={data} />}
          <div className="min-w-[40ch] rounded border border-black bg-stone-50 px-8 py-4">
            <h2 className="font-quicksand text-lg font-bold">
              {/* TODO: we want to support an arbitrary number of languages at some point in the future*/}
              {/* TODO: give language codes to SL definitions and render conditionally */}
              {t('entry.sl-native-definition-heading', {
                context: 'asf',
                tDescription:
                  'heading for video of definition in a given sign language',
              })}
            </h2>
            <video className="mb-4 w-44 rounded bg-gray-300" src="" />
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
