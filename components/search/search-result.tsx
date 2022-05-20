import Link from 'next/link'

export const SearchResult = ({ data }: { data: any }) => {
  console.log(data)
  return (
    <Link href={`/dictionary/${data.idGloss}`}>
      <a>
        <div className="flex w-full rounded border border-slate-200 bg-white p-2">
          {/* TODO: use real url */}
          <video
            className="w-48 rounded"
            src="https://media.auslan.org.au/mp4video/36/36460_1.mp4"
          />
          {data.keywords.map(
            (x: { text: string }, index: number) => (index ? ', ' : '') + x.text
          )}
        </div>
      </a>
    </Link>
  )
}

/*
      {data.keywords.map((x) => {
      return (
        {index ? ', ' : ''}
        <span>
          {x.text}
        </span>
      )})}
*/
