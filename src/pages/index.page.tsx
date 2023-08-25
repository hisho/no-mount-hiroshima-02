import { NextPageWithLayout } from '@/pages/_app.page'
import { Slide } from '@/pages/_component/slide'
import matter from 'gray-matter'
import { InferGetStaticPropsType } from 'next'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import path from 'path'

export const getStaticProps = async () => {
  const currentPath = path.resolve(process.cwd(), 'src/pages')
  const { content, data } = matter.read(currentPath + '/index.mdx')
  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [],
      remarkPlugins: [],
    },
    scope: data,
  })

  return {
    props: {
      mdxSource,
    },
  }
}

const Page: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ mdxSource }) => {
  return (
    <Slide>
      <MDXRemote {...mdxSource} />
    </Slide>
  )
}

export default Page
