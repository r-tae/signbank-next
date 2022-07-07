import { AustraliaRegionMap } from '@/components/australia-region-map'
import { Collapse } from '@/components/basic'
import { useDictionaryEntry } from '@/lib/dictionary/hooks'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  InformationCircleIcon,
} from '@heroicons/react/solid'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormattedMessage } from 'react-intl'

// TODO: use like actual buttons for publishing, not whatever we have now
// TODO: make reording definitions a drag-drop operation instead of the legacy jank (make the move up/down buttons are more accessible?)
const DetailViewChunk = ({ data }) => (
  <>
    <Collapse header={<FormattedMessage defaultMessage="Basic properties" />}>
      <div className="w-full px-4 py-2"></div>
    </Collapse>
    <Collapse
      header={
        <FormattedMessage defaultMessage="Dialects and regional frequencies" />
      }
    >
      <div className="w-full px-4 py-2">
        Distribution:{' '}
        {data.dictionaryEntry.language.region ? (
          /* HACK: if no defaultMessage is provided, then the babel plugin doesn't try to extract it, this avoids a "must be statically evaluate-able" error */
          <FormattedMessage
            id={`human-readable-region-name__${data.dictionaryEntry.language.region}`}
          />
        ) : (
          <FormattedMessage
            defaultMessage="Unknown"
            description="the region of usage is null or empty"
          />
        )}{' '}
        {data.dictionaryEntry.language.traditional && (
          <FormattedMessage
            defaultMessage="traditional"
            description={`shown after name of the region of usage for a sign (e.g. "Australia-wide traditional")`}
          />
        )}
      </div>
    </Collapse>
    <Collapse header={<FormattedMessage defaultMessage="Publication status" />}>
      <div className="w-full px-4 py-2"></div>
    </Collapse>
    <Collapse header={<FormattedMessage defaultMessage="Phonology" />}>
      <div className="w-full px-4 py-2">
        <table>
          <tr>
            <td>
              <FormattedMessage defaultMessage="Initial dominant handshape" />
            </td>
            <td>
              {data.dictionaryEntry.phonology['initialDominantHandshape']}
            </td>
          </tr>
          <tr>
            <td>
              <FormattedMessage defaultMessage="Final dominant handshape" />
            </td>
            <td>{data.dictionaryEntry.phonology['finalDominantHandshape']}</td>
          </tr>
          <tr>
            <td>
              <FormattedMessage defaultMessage="Initial subordinate handshape" />
            </td>
            <td>
              {data.dictionaryEntry.phonology['initialSubordinateHandshape']}
            </td>
          </tr>
          <tr>
            <td>
              <FormattedMessage defaultMessage="Final subordinate handshape" />
            </td>
            <td>
              {data.dictionaryEntry.phonology['finalSubordinateHandshape']}
            </td>
          </tr>
          <tr>
            <td>
              <FormattedMessage defaultMessage="Initial primary location" />
            </td>
            <td>{data.dictionaryEntry.phonology['initialPrimaryLocation']}</td>
          </tr>
          <tr>
            <td>
              <FormattedMessage defaultMessage="Final primary location" />
            </td>
            <td>{data.dictionaryEntry.phonology['finalPrimaryLocation']}</td>
          </tr>
          <tr>
            <td>
              <FormattedMessage defaultMessage="Initial dominant interacting hand part" />
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
              <FormattedMessage defaultMessage="Final dominant interacting hand part" />
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
              <FormattedMessage defaultMessage="Initial subordinate interacting hand part" />
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
              <FormattedMessage defaultMessage="Final subordinate interacting hand part" />
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
              <FormattedMessage defaultMessage="SecondaryLocation" />
            </td>
            <td>{data.dictionaryEntry.phonology['secondaryLocation']}</td>
          </tr>
        </table>
      </div>
    </Collapse>
    <Collapse
      header={<FormattedMessage defaultMessage="Relations to other signs" />}
    >
      <div className="w-full px-4 py-2"></div>
    </Collapse>
    <Collapse header={<FormattedMessage defaultMessage="Definitions/notes" />}>
      <div className="w-full px-4 py-2"></div>
    </Collapse>
  </>
)

const Region = ({ language }) => {
  return (
    <div className="align-center my-4 flex flex-row items-center justify-center gap-4">
      <div>
        <h2 className="font-quicksand font-bold">
          <FormattedMessage
            defaultMessage="Sign distribution"
            description="heading for map and text description the geographic distribution of a sign"
          />
        </h2>
        <p className="text-sm">
          {language.region ? (
            /* HACK: if no defaultMessage is provided, then the babel plugin doesn't try to extract it, this avoids a "must be statically evaluate-able" error */
            <FormattedMessage
              id={`human-readable-region-name__${language.region}`}
            />
          ) : (
            <FormattedMessage
              defaultMessage="Unknown"
              description="the region of usage is null or empty"
            />
          )}{' '}
          {language.traditional && (
            <FormattedMessage
              defaultMessage="traditional"
              description={`shown after name of the region of usage for a sign (e.g. "Australia-wide traditional")`}
            />
          )}
        </p>
      </div>
      <div className="w-50%">
        <AustraliaRegionMap select={language.region} />
      </div>
    </div>
  )
}

function DetailViewToggleButton({ isDetailView, onDetailViewToggle }) {
  const Button = ({ children }) => (
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
        <FormattedMessage
          defaultMessage="Public view"
          description="button that switches from the researcher view to the ordinary dictionary entry"
        />
      </Button>
    )
  } else {
    return (
      <Button>
        <FormattedMessage
          defaultMessage="Detail view"
          description="button that switches from the ordinary dictionary entry to the researcher view"
        />
      </Button>
    )
  }
}

const DictionaryEntry: NextPage = () => {
  const router = useRouter()
  const { id_gloss, slug } = router.query

  const { data, error } = useDictionaryEntry(id_gloss as string)

  // TODO: move to envvar
  const staticFilesHost = 'https://media.auslan.org.au/'

  // TODO: write proper error/loading UI
  if (error) {
    return (
      <div>
        <FormattedMessage defaultMessage="An error occured" />
      </div>
    )
  }
  if (!data) {
    return (
      <div>
        <FormattedMessage defaultMessage="loading..." />
      </div>
    )
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
                (a, b) => a.version > b.version
              )[0].url
            }`}
          />
          <div className="mb-4">
            <strong>
              <FormattedMessage
                defaultMessage="Keywords:"
                description="Heading for the list of translations in a spoken language."
              />
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
              <FormattedMessage
                defaultMessage="Variants"
                descriptions="heading above video thumbnails, the videos show other versions of the headsign, if any exist"
              />{' '}
              <span className="text-sm font-light">
                <FormattedMessage
                  defaultMessage="(Click to enlarge)"
                  description="instructs the user to click on a video thumbnail below, to view a larger version of a video"
                />
              </span>
            </h2>

            <div className="flex flex-row flex-wrap gap-2">
              <video className="w-28 rounded bg-slate-300" src="" />
              <video className="w-28 rounded bg-slate-300" src="" />
              <video className="w-28 rounded bg-slate-300" src="" />
            </div>
          </div>
          <Region language={data.dictionaryEntry.language} />
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
              {/* TODO: we want to support an arbitrary number of languages eventually, so we'll need the dynamic message hack here too at some point*/}
              <FormattedMessage defaultMessage="Auslan definition" />
            </h2>
            <video className="mb-4 w-44 rounded bg-gray-300" src="" />
            {/* HACK: this should be cleaner */}
            {[...nouns, ...verbs].length === 0 ? (
              <div>
                <InformationCircleIcon className="inline h-5 -translate-y-[13%] fill-slate-600" />
                <FormattedMessage defaultMessage="This sign has no definitions." />
              </div>
            ) : (
              <>
                {nouns.length > 0 && (
                  <>
                    <h2 className="font-quicksand text-lg font-bold">
                      <FormattedMessage defaultMessage="As a noun" />
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
                      <FormattedMessage defaultMessage="As a verb" />
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
            <a className="pr-4 underline">
              <FormattedMessage
                defaultMessage="Report missing sign"
                description="interactable link that allows user to report a sign that they could not find in Signbank"
              />
            </a>
            <a className="underline">
              <FormattedMessage
                defaultMessage="Give feedback on this entry"
                description="interactable link that allows user to provide feedback on the current entry"
              />
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}

export default DictionaryEntry
