import { SyntaxHighlighter } from '@/component/syntax-highlighter/syntax-highlighter'
import { MDXRemote } from 'next-mdx-remote'
import { MDXRemoteProps } from 'next-mdx-remote/dist'
import { ComponentProps } from 'react'
import { P, match } from 'ts-pattern'

const components = {
  code: (props) =>
    match(props.children)
      .with(P.string, (children) => {
        return <SyntaxHighlighter code={children} lang={'tsx'} />
      })
      .otherwise((children) => <code>{children}</code>),
} satisfies MDXRemoteProps['components']

type Props = {
  source: Omit<ComponentProps<typeof MDXRemote>, 'component'>
}

export const MdxRemote = (props: Props) => {
  return <MDXRemote {...props.source} components={components} />
}
