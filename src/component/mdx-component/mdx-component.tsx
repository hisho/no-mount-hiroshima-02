import { SyntaxHighlighter } from '@/component/syntax-highlighter/syntax-highlighter'
import { getMDXComponent } from 'mdx-bundler/client'
import { MDXRemoteProps } from 'next-mdx-remote/dist'
import { useMemo } from 'react'
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
  source: string
}

export const MdxComponent = (props: Props) => {
  const _MdxComponent = useMemo(() => {
    return getMDXComponent(props.source)
  }, [props.source])
  return <_MdxComponent components={components} />
}
