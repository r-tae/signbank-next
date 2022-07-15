import type { NextPage } from 'next'
import Link from 'next/link'

const History: NextPage = () => {
  return (
    <main className="prose-md prose prose-slate px-16 md:max-w-6xl xl:px-0">
      <h1>Classes</h1>

      <h2>Can I learn Auslan from Signbank?</h2>
      <p>
        No, Signbank is not intended to be, nor is it designed to be, a
        stand-alone language learning tool. Ideally, to learn Auslan, or any
        language, you need to interact with users of the language or attend a
        course. Signbank is a free resource with information on Auslan signs, in
        the form of a dictionary (see{' '}
        <Link href="/dictionary">
          <a>Dictionary</a>
        </Link>
        ).
      </p>
      <p>
        Some stories being told in Auslan by deaf native signers can be viewed
        on the Auslan Corpus site which can be reached through a link on a link
        on this site (see{' '}
        <Link href="/corpus">
          <a>Corpus</a>
        </Link>
        ).
      </p>
      <p>
        It is hoped that support can be found to fund the expansion of the
        Auslan Signbank site in the near future so that it can also include
        video clips of simple and common phrases, example sentences illustrating
        the grammar of Auslan (see{' '}
        <Link href="/about/grammar">
          <a>Grammar</a>
        </Link>
        ), and a much more extensive range of natural recordings in Auslan from
        the Auslan Corpus.
      </p>

      <h2>Where can I learn Auslan?</h2>
      <p>
        Visit the internet site{' '}
        <Link href="https://deafnav.com.au/understand/communication/auslan/learn-auslan">
          <a>DeafNav</a>
        </Link>{' '}
        to find out where to learn Auslan. DeafNav is a neutral, centralised
        portal that helps you better understand, access and connect with the
        Deaf and hard of hearing community.
      </p>
    </main>
  )
}

export default History
