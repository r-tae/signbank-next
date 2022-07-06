import AustraliaRegionMap from '@/components/australia-region-map/australia-region-map'
import { useDictionaryEntry } from '@/lib/dictionary/hooks'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  InformationCircleIcon,
} from '@heroicons/react/solid'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormattedMessage } from 'react-intl'

const Region = ({ language }) => {
  return (
    <div className="align-center my-4 flex flex-row items-center justify-center gap-4">
      <div>
        <h2 className="font-quicksand font-bold">Sign distribution</h2>
        <p className="text-sm">
          <FormattedMessage
            id={`human-readable-region-name__${language.region}`}
            defaultMessage="Unknown"
          />{' '}
          {language.traditional && 'traditional'}
        </p>
      </div>
      <div className="w-50%">
        <AustraliaRegionMap select={language.region} />
      </div>
    </div>
  )
}

const DictionaryEntry: NextPage = () => {
  const { query, isReady: _isReady } = useRouter()
  const { id_gloss } = query

  const { data, error } = useDictionaryEntry(id_gloss as string)

  const staticFilesHost = 'https://media.auslan.org.au/'

  // TODO: write proper error/loading UI
  if (error) return <div>An error occured</div>
  if (!data) return <div>loading...</div>

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
      <div className="relative">
        <div className="absolute right-0 flex flex-row justify-end gap-x-4 py-1 pr-8">
          <a
            href="/prev-sign"
            className="border-md h-[1.5em] w-[1.5em] rounded border border-slate-700 bg-white"
          >
            <ChevronLeftIcon />
          </a>
          <div>Sign 568 of 4056</div>
          <a
            href="/next-sign"
            className="border-md h-[1.5em] w-[1.5em] rounded border border-slate-700 bg-white"
          >
            <ChevronRightIcon />
          </a>
        </div>
      </div>
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
            <strong>Keywords:</strong>{' '}
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
              Variants{' '}
              <span className="text-sm font-light">(Click to enlarge)</span>
            </h2>

            <div className="flex flex-row flex-wrap gap-2">
              <video className="w-28 rounded bg-slate-300" src="" />
              <video className="w-28 rounded bg-slate-300" src="" />
              <video className="w-28 rounded bg-slate-300" src="" />
            </div>
          </div>
          <Region language={data.dictionaryEntry.language} />
        </div>
        <div className="md:mt-10">
          <div className="min-w-[40ch] rounded border border-black bg-stone-50 px-8 py-4">
            <h2 className="font-quicksand text-lg font-bold">
              Auslan definition
            </h2>
            <video className="mb-4 w-44 rounded bg-gray-300" src="" />
            {/* HACK: this should be cleaner */}
            {[...nouns, ...verbs].length === 0 ? (
              <div>
                <InformationCircleIcon className="inline h-5 -translate-y-[13%] fill-slate-600" />
                This sign has no definitions.
              </div>
            ) : (
              <>
                {nouns.length > 0 && (
                  <>
                    <h2 className="font-quicksand text-lg font-bold">
                      As a noun
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
                      As a verb
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
          <div className="float-right mt-2 pr-4 text-slate-600">
            <a className="pr-4 underline">Report missing sign</a>
            <a className="underline">Give feedback on this entry</a>
          </div>
        </div>
        <div>
          {/* <p>{data.dictionaryEntry.idGloss}</p>
        <p>{data.dictionaryEntry.annotationIdGloss}</p>
        <p>{data.dictionaryEntry.dominantHandshape.initial}</p>
        <p>{data.dictionaryEntry.dominantHandshape.final}</p>
        <p>{data.dictionaryEntry.subordinateHandshape.initial}</p>
      <p>{data.dictionaryEntry.subordinateHandshape.final}</p> */}
        </div>
      </div>
    </main>
  )
}

export default DictionaryEntry
