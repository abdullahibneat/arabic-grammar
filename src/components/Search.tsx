import Flex from './Flex'
import Text from './Text'

type Props = {
  value: string
  setValue: (value: string) => void
}

const Search = ({ value, setValue }: Props) => (
  <Flex column>
    <Text type="h2">Search</Text>

    <Flex column>
      <Text type="small">Type a word</Text>
      <input
        type="text"
        value={value}
        onInput={(e) => setValue(e.currentTarget.value)}
      />
    </Flex>
  </Flex>
)

export default Search
