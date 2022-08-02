import type { NextPage } from 'next'

const History: NextPage = () => {
  return (
    <main className="prose-md prose prose-slate px-16 md:max-w-6xl xl:px-0">
      <h1>History</h1>
      <p>
        Below you will finds some brief and basic facts about the history of
        Auslan. Interested readers will find much more information in Johnston,
        T., &amp; Schembri, A. (2007).{' '}
        <em>
          Australian Sign Language: An introduction to sign language
          linguistics.
        </em>{' '}
        Cambridge: Cambridge University Press.
      </p>
      <div className="w-200% flex flex-col gap-x-16 lg:flex-row">
        <span>
          <h2>A natural language, not an invented one</h2>
          <p>
            Auslan was not invented by any single person, hearing or deaf. Any
            language, whether spoken or signed, grows and develops spontaneously
            in response to the communication needs of its users, particularly
            when it is used (1) by an entire community and (2) in communication
            between parents and children, and especially when that language is
            the child&#39;s first, or only, one.
          </p>

          <h2>British origins in the 19th century</h2>
          <p>
            Auslan has evolved from the sign languages brought to Australia
            during the nineteenth century from Britain and Ireland. Auslan has
            been called a dialect of British Sign Language (BSL) and,
            undoubtedly, the two sign languages are very closely related. It is,
            however, probably more correct to say that modern BSL and modern
            Auslan have both evolved from forms of BSL used in the early 1800s,
            particularly those forms of BSL associated with the large
            residential schools for the deaf of the time. The first known deaf
            person to introduce BSL to Australia was the engraver John
            Carmichael who moved to Sydney in 1825 from Edinburgh.
          </p>

          <h2>The importance of the early residential schools for the deaf</h2>
          <p>
            Schools for the deaf were established in Australia in the
            mid-nineteenth century. In 1860 Thomas Pattison, a deaf man educated
            at the Edinburgh Deaf and Dumb Institution began the Sydney school.
            At the same time another deaf man, Frederick Rose - who was educated
            at Old Kent Road School, London - founded the Melbourne school. Most
            of the schools for the deaf were residential and the majority of the
            students were boarders.
          </p>

          <h2>Evolution of an Australian dialect</h2>
          <p>
            Auslan has developed some distinct characteristics (in particular,
            some unique signs) since it first began to be used in Australia in
            the nineteenth century. New signs developed in the Australian deaf
            community, particularly in the residential schools for deaf children
            because signers may have had little contact with deaf communities in
            other parts of the country. Auslan has also had some influence from
            Irish Sign Language (ISL).
          </p>

          <h2>Early Irish influence</h2>
          <p>
            ISL was brought to Australia by Irish nuns who established the first
            school for Catholic deaf children in 1875. The Irish one-handed
            alphabet and a tradition of Irish-based signs was kept alive well
            into the middle of the twentieth century through private Catholic
            schools that used many Irish signs and one-handed fingerspelling,
            while public schools used Auslan signs (originally BSL) and
            two-handed fingerspelling. Separate education systems aside, the two
            communities mixed freely, with British based signing being
            undoubtedly the dominant linguistic influence.
          </p>
        </span>

        <span>
          <h2>Fingerspelling</h2>
          <p>
            A number of signs in modern Auslan clearly have their origins in ISL
            (and through ISL to the French and European signing tradition). Also
            as a consequence of this mixing and exposure to Irish-based signing,
            the one-handed alphabet (including its modern American form) does
            not feel quite so &#39;alien&#39; to Auslan signers as one might
            expect. Initialised signs base on one-handed fingerspelling have
            been and continue to be accepted by this linguistic community, even
            though fingerspelling is regularly produced using the two-handed
            alphabet.
          </p>

          <h2>Two major dialects of Auslan</h2>
          <p>
            Though there are some minor differences between states, overall
            there are two main dialects of Auslan that have emerged as a
            consequence of the establishment of the two major residential
            schools for the deaf, one in Sydney (in the north) and one in
            Melbourne (in the south). The two sign dialects of north and south
            may reflect the original signing differences between the two deaf
            founder-teachers of the Sydney and Melbourne schools and the pattern
            of expansion and influence that the two schools (and cities) had.
            State and dialect differences are large enough to clearly mark
            someone&#39;s state of origin (and/or the school they attended) but
            are small enough not to seriously interfere with or hamper
            communication.
          </p>

          <h2>Modern Auslan is dynamic and changing</h2>
          <p>
            Today Auslan seems to be undergoing a period of rapid change. The
            enormous expansion of sign language interpreter services, especially
            in the area of secondary and tertiary education and in the delivery
            of governmental, legal and medical services, has put great demands
            on the language by both interpreters and deaf people themselves.
            These developments have produced three main responses: (i) attempts
            to standardise usage, (ii) the development of new signs to meet new
            needs, (iii) the borrowing of signs from other sign languages,
            particularly from American Sign Language (ASL).
          </p>
          <p>
            Most members of the deaf community have a personal and political
            preference for drawing on the internal resources of Auslan to expand
            and develop its vocabulary. However, some Auslan signers either do
            not object to ASL borrowings (sometimes they do not even realize
            that some signs are borrowed from ASL) or are actually willing
            borrowers (new signs are adopted because they are sometimes seen as
            more prestigious). The fact that ASL signers also have English as
            the language of the wider community, as do Auslan signers, may
            encourage this process. Many borrowed ASL signs are technical and
            deal with vocabulary used in education and in written English.
            Nevertheless, many Auslan signers reject any attempts to introduce
            borrowed ASL signs when a perfectly good and adequate Auslan sign
            already exists.
          </p>
        </span>
      </div>
      <p>
        Adapted from Johnston, T. (Ed.). (1998).{' '}
        <em>Signs of Australia: A new dictionary of Auslan.</em> North Rocks,
        NSW: North Rocks Press. (First published as Johnston, T. (1989).{' '}
        <em>
          Auslan Dictionary: A dictionary of the sign language of the Australian
          deaf community.
        </em>{' '}
        Sydney: Deafness Resources Australia.)
      </p>
    </main>
  )
}

export default History
