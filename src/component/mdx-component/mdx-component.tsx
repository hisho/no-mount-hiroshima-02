import { SyntaxHighlighter } from '@/component/syntax-highlighter/syntax-highlighter'
import { cn } from '@/util/cn/cn'
import { MDXContentProps, getMDXComponent } from 'mdx-bundler/client'
import { useMemo } from 'react'
import { P, match } from 'ts-pattern'

const components = {
  code: (props) =>
    match(props.children)
      .with(P.string, (children) => {
        return <SyntaxHighlighter code={children} lang={'tsx'} />
      })
      .otherwise((children) => <code>{children}</code>),
  h1: ({ className, ...props }) => (
    <h1 className={cn('text-60 font-bold', className)} {...props} />
  ),
  h2: ({ className, ...props }) => (
    <h2 className={cn('text-50 font-bold', className)} {...props} />
  ),
  h3: ({ className, ...props }) => (
    <h3 className={cn('text-40 font-bold', className)} {...props} />
  ),
  h4: ({ className, ...props }) => (
    <h4 className={cn('text-30 font-bold', className)} {...props} />
  ),
  h5: ({ className, ...props }) => (
    <h4 className={cn('text-20 font-bold', className)} {...props} />
  ),
  li: ({ className, ...props }) => (
    <li className={cn('text-30 font-bold leading-1.5', className)} {...props} />
  ),
  pre: ({ className, ...props }) => (
    <pre className={cn('min-w-full', className)} {...props} />
  ),
} satisfies MDXContentProps['components']

type Props = {
  source: string
}

export const MdxComponent = (props: Props) => {
  const _MdxComponent = useMemo(() => {
    return getMDXComponent(props.source)
  }, [props.source])
  return <_MdxComponent components={components} />
}
