import '../styles/HomeScreen.scss'

import { useCallback, useMemo, useState } from 'preact/hooks'
import { useNavigate, useParams } from 'react-router-dom'

import EntriesGrid from '../components/EntriesGrid'
import { Entry } from '../../data/types'
import Flex from '../components/Flex'
import Search from '../components/Search'
import Text from '../components/Text'
import dictionary from '../../data'

const HomeScreen = () => {
  const [search, setSearch] = useState('')

  const { term } = useParams()

  const navigate = useNavigate()

  const entries = useMemo(() => {
    if (!search) return dictionary

    // Return dictionary entries that match the search
    const searchTerm = search.toLocaleLowerCase()

    return dictionary.filter(
      (entry) =>
        entry.term.toLocaleLowerCase().includes(searchTerm) ||
        withoutHarakas(entry.term).includes(searchTerm) ||
        entry.transliteration.toLocaleLowerCase().includes(searchTerm)
    )
  }, [dictionary, search])

  const entry = useMemo(() => {
    if (!term) return null
    return entries.find((entry) => entry.term === term)
  }, [entries, term])

  const relatedEntries = useMemo(() => {
    if (!entry) return null

    // Create a set of all the terms related to this entry
    const relatedTerms = new Set<string>()

    // i.e. include `entry.relatedTerms`...
    entry.relatedTerms?.forEach((term) => relatedTerms.add(term))

    // ...and find any other entries that include this entry's term as a related term
    dictionary
      .filter(($entry) => $entry.relatedTerms?.includes(entry.term))
      .flatMap((entry) => [entry.term].concat(entry.relatedTerms || []))
      .forEach((term) => relatedTerms.add(term))

    // Remove this entry if it has been added by any of the loops above
    // i.e. we don't want to include the term itself in the "related" section
    relatedTerms.delete(entry.term)

    return dictionary.filter((entry) => relatedTerms.has(entry.term))
  }, [dictionary, entry])

  const navigateToEntry = useCallback((entry: Entry | null) => {
    navigate(`/${entry?.term || ''}`)
  }, [])

  return (
    <div class="home-screen-container">
      <section class="search-section">
        <div class="search-wrapper">
          <Search value={search} setValue={setSearch} />
        </div>

        <EntriesGrid
          title={search ? 'Results' : 'All'}
          entries={entries}
          onEntryClick={navigateToEntry}
        />
      </section>

      {entry && (
        <section class="term-section">
          <Flex>
            <Text type="h1" style={{ flex: 1 }}>
              {entry.term}
            </Text>
            <button onClick={() => navigateToEntry(null)}>✕</button>
          </Flex>

          <Text type="h2" color="text-secondary">
            {entry.transliteration}
          </Text>

          <Text>{entry.definition}</Text>

          {entry.examples?.length && (
            <ul>
              {entry.examples.map((example) => (
                <li
                  dangerouslySetInnerHTML={{
                    __html: example.english.replace(
                      /\*([\w\s]+)\*/g,
                      '<span class="highlighted">$1</span>'
                    ),
                  }}
                />
              ))}
            </ul>
          )}

          {relatedEntries && relatedEntries.length > 0 && (
            <EntriesGrid
              title="Related"
              entries={relatedEntries}
              onEntryClick={navigateToEntry}
            />
          )}
        </section>
      )}
    </div>
  )
}

export default HomeScreen

const withoutHarakas = (term: string) => {
  const fatha = 'ًَ'
  const kasra = 'ٍِ'
  const damma = 'ٌُ'
  const sukoon = 'ْ'
  const shadda = 'ّ'

  const haraks = [fatha, kasra, damma, sukoon, shadda].join('')

  const harakaRegex = new RegExp(`[${haraks},]`, 'g')

  return term.replace(harakaRegex, '')
}
