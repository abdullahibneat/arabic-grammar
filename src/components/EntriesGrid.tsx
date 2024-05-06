import '../styles/EntriesGrid.scss'

import { Entry } from '../../data/types'
import Flex from './Flex'
import Text from './Text'

type Props = {
  title?: string
  entries: Entry[]
  onEntryClick?: (entry: Entry) => void
}

const EntriesGrid = ({ title, entries, onEntryClick }: Props) => (
  <Flex column gap={8}>
    {title && <Text type="small-bold">{title.toLocaleUpperCase()}</Text>}

    <div class="entries-grid">
      {entries.map((entry) => (
        <div
          key={entry.term}
          class="entry"
          onClick={() => onEntryClick?.(entry)}
        >
          <Text ellipsis type="medium">
            {entry.term}
          </Text>
          <Text ellipsis color="text-secondary" type="small">
            {entry.definition}
          </Text>
        </div>
      ))}

      {entries.length === 0 && (
        <Text color="text-secondary">No results found</Text>
      )}
    </div>
  </Flex>
)

export default EntriesGrid
