import type { NextPage } from 'next'
import Link from 'next/link'

const Community: NextPage = () => {
  return (
    <main className="prose-md prose prose-slate px-16 md:max-w-6xl xl:px-0">
      <h1>The deaf community</h1>
      <p>
        Only a very small percentage of the Australian population is severely or
        profoundly deaf and not all of these use know and use Auslan. Though the
        precise number of signing deaf people in Australia is unknown, recent
        research suggests that there may only be about 6,500. You could,
        however, more than double this number if you included all the hearing
        people, such as hearing children who learn Auslan from their parents or
        other family members, who also know and use Auslan.
      </p>
      <p>
        Of course, a much larger proportion of the population has various types
        and degrees of hearing impairment. For example, there are over one
        million people in Australia who have some form of hearing loss, mostly
        associated with aging. Very few of these people, however, would know or
        use Auslan.
      </p>
      <p>
        In contrast, people who have been deaf from early childhood know and use
        Auslan and form the core of the signing deaf community. Interestingly,
        Auslan is the native language (i.e., the language acquired from birth)
        of only a minority of deaf signers, as most deaf people have hearing
        parents. Auslan is thus not usually passed on to deaf children from
        their hearing parents, but is instead learned by deaf children from
        adults outside the family, such as at pre-school or school.
      </p>
      <p>
        Overall, the deaf community resembles other ethic and linguistic
        minority communities in that it forms a distinct subculture within the
        Australian community. Deaf people value membership in the signing
        community, and participation in its organisational networks.
      </p>
      <p>
        The peak organization of the Auslan-using deaf community in Australia is
        Deaf Australia.
      </p>
      <p>
        The major community-based service providers where you can find
        additional information inlcude:
        <a href="https://www.expression.com.au">Expression Australia</a>{' '}
        (Victoria and Tasmania),
        <a
          href="https://www.deafservices.org.au"
          target="_blank"
          rel="noreferrer nofollow"
        >
          Deaf Services
        </a>{' '}
        (Queensland and Northern Territory)<a href="#note-1">*</a>,{' '}
        <a
          href="https://deafsociety.org.au"
          target="_blank"
          rel="noreferrer nofollow"
        >
          The Deaf Society
        </a>{' '}
        (New South Wales)<a href="#note-1">*</a>,{' '}
        <a
          href="https://www.deafcando.com.au"
          target="_blank"
          rel="noreferrer nofollow"
        >
          Deaf Can:Do
        </a>{' '}
        (South Australia).
      </p>
      <aside id="note-1">
        * Please note: During 2022 these two organisations will merge to become
        Deaf Connect.
      </aside>
    </main>
  )
}

export default Community
