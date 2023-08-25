import { grayMatterRead } from '@/lib/gray-matter/gray-matter'
import { NextPageWithLayout } from '@/pages/_app.page'
import { Slide } from '@/pages/_component/slide'
import { GetServerSidePropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import path from 'path'
import { useEffect } from 'react'
import { useCounter } from 'react-use'
import { match } from 'ts-pattern'
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
        sections,
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
> = ({ mdxSource, sections }) => {
  const router = useRouter()
  const [count, { dec, inc }] = useCounter(
    Number(router.query['slug']) ?? 1,
    sections.length,
    1
  )

  useEffect(() => {
    const keyDownEvent = (e: globalThis.KeyboardEvent) => {
      match(e.key.toLowerCase())
        .with('ArrowRight'.toLowerCase(), () => inc())
        .with('ArrowLeft'.toLowerCase(), () => dec())
        .otherwise(() => {})
    }
    window.addEventListener('keydown', keyDownEvent, false)
  }, [])

  useEffect(() => {
    router.prefetch(`/${count + 1}`)
    router.push({
      pathname: `/${count}`,
    })
  }, [count])

  return (
    <Slide>
      <MDXRemote {...mdxSource} />
    </Slide>
  )
}

export default Page
