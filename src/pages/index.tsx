import { useEffect } from 'react'
import type { NextPage } from 'next'
import { Search } from 'components/search'
import { HeaderContext, useHeaderContext } from 'components/layout'

const Home: NextPage = () => {
  const { showSearchBar, setShowSearchBar } = useHeaderContext()

  return (
    <main className="max-w-6xl overflow-visible px-16 xl:px-0">
      <div className="m-50 mb-8 flex justify-center">
        <Search />
      </div>
      <div className="before:width-[100vw] relative z-10 py-8 text-slate-100 before:absolute before:top-0 before:left-[-1000px] before:right-[-1000px] before:z-0 before:h-full before:bg-custom-green">
        <div className="text-md relative mt-3 flex flex-row flex-wrap gap-x-8 gap-y-4">
          <section className="min-w-[40ch] max-w-[80ch] shrink grow basis-[16rem]">
            <h1 className="relative text-left text-2xl font-bold">
              Welcome to{' '}
              <a
                className="relative text-yellow-300 hover:text-yellow-400"
                href="#"
              >
                Auslan Signbank
              </a>
            </h1>
            <p>
              Auslan Signbank is a language resources site for Auslan
              (Australian Sign Language). Auslan is the language of the deaf
              community in Australia. Here you will find:{' '}
            </p>
            <ul className="relative ml-1 list-inside list-disc">
              <li>a dictionary</li>
              <li>
                ability to search for signs related to medical and health topics
              </li>
              <li>
                ability to search for signs related to educational and teaching
                topics
              </li>
              <li>videos of deaf people using the listed Auslan signs</li>
              <li>information on the deaf community in Australia</li>
              <li>links to Auslan classes</li>
            </ul>
            <p>
              Users of Auslan—deaf people, deaf students, sign language
              interpreters, students of Auslan, or a parents of deaf
              children—are invited to provide feedback to help improve the
              dictionary, using the links provided. Auslan is growing and
              changing all the time.
            </p>
          </section>
          <section className="flex min-w-fit shrink grow basis-[12rem] justify-end">
            <video controls muted>
              <source
                src="https://media.auslan.org.au/mp4video/38/38550_1.mp4"
                type="video/webm"
              />
              <source
                src="https://media.auslan.org.au/mp4video/38/38550_1.mp4"
                type="video/mp4"
              />
              <p>Your browser cannot play the provided video file.</p>
            </video>
          </section>
        </div>
      </div>
    </main>
  )
}

export default Home
