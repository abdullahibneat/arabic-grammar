export type Example = {
  arabic: string
  english: string
}

export type Entry = {
  term: string
  transliteration: string
  definition: string
  examples?: Example[]
  relatedTerms?: string[]
}
