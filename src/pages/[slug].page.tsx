import { grayMatterRead } from '@/lib/gray-matter/gray-matter'
import { NextPageWithLayout } from '@/pages/_app.page'
import { Slide } from '@/pages/_component/slide'
import { GetServerSidePropsContext, InferGetStaticPropsType } from 'next'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import path from 'path'
import { z } from 'zod'

export const getStaticPaths = () => {
  const currentPath = path.resolve(process.cwd(), 'src/pages')
  const { sections } = grayMatterRead(currentPath + '/index.mdx')

  return {
    fallback: false,
    paths: sections.map((_, index) => ({
      params: { slug: String(index + 1) },
    })),
  }
}

const paramsSchema = z.object({
  slug: z.coerce.number(),
})

export const getStaticProps = async (context: GetServerSidePropsContext) => {
  try {
    const { slug } = paramsSchema.parse(context.params)
    const currentPath = path.resolve(process.cwd(), 'src/pages')
    const { sections } = grayMatterRead(currentPath + '/index.mdx')
    const mdxSource = await serialize(sections[slug - 1]?.content ?? '', {
      mdxOptions: {
        rehypePlugins: [],
        remarkPlugins: [],
      },
    })

    return {
      props: {
        mdxSource,
      },
    }
  } catch {
    return {
      notFound: true,
    }
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
