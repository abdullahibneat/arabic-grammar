import Flex from './Flex'
import Text from './Text'

type Props = {
  value: string
  setValue: (value: string) => void
}

const Search = ({ value, setValue }: Props) => (
  <Flex column>
    <Text type="h2">Search</Text>

    <input
      type="text"
      value={value}
      placeholder="Type a word"
      onInput={(e) => setValue(e.currentTarget.value)}
    />
  </Flex>
)

export default Search
