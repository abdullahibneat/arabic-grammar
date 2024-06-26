import { ComponentChildren, JSX } from 'preact'

import { CSSProperties } from 'preact/compat'
import { useMemo } from 'preact/hooks'

export type TextProps = {
  type?: keyof typeof types
  ellipsis?: boolean
  color?: 'white' | 'text' | 'text' | 'text-secondary' | 'hover' | 'border'
  style?: JSX.CSSProperties
  children: ComponentChildren
}

const Text = ({
  type,
  ellipsis,
  color = 'text',
  style = {},
  children,
}: TextProps) => {
  const textStyles = useMemo(() => (type ? types[type] : {}), [type])

  return (
    <div
      style={{
        color: `var(--${color})`,
        transition: 'color 250ms',
        overflow: ellipsis ? 'hidden' : undefined,
        textOverflow: ellipsis ? 'ellipsis' : undefined,
        whiteSpace: ellipsis ? 'nowrap' : undefined,
        ...style,
        ...textStyles,
      }}
    >
      {children}
    </div>
  )
}

export default Text

const darkMode =
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

const types: Record<
  | 'h1'
  | 'h2'
  | 'h3'
  | 'bold'
  | 'medium'
  | 'small'
  | 'small-medium'
  | 'small-bold',
  CSSProperties
> = {
  h1: {
    fontSize: '2.25rem',
    fontWeight: darkMode ? 600 : 700,
    lineHeight: '2.5rem',
  },
  h2: {
    fontSize: '1.5rem',
    fontWeight: darkMode ? 600 : 700,
    lineHeight: '2rem',
  },
  h3: {
    fontSize: '1.25rem',
    fontWeight: darkMode ? 600 : 700,
    lineHeight: '1.5rem',
  },
  bold: {
    fontWeight: darkMode ? 600 : 700,
  },
  medium: {
    fontWeight: 600,
  },
  small: {
    fontSize: '0.875rem',
    lineHeight: '1.5rem',
  },
  'small-medium': {
    fontSize: '0.875rem',
    fontWeight: 600,
    lineHeight: '1.5rem',
  },
  'small-bold': {
    fontSize: '0.875rem',
    fontWeight: darkMode ? 600 : 700,
    lineHeight: '1.5rem',
  },
}
