import { MdxComponent } from '@/component/mdx-component/mdx-component'
import { grayMatterRead } from '@/lib/gray-matter/gray-matter'
import { NextPageWithLayout } from '@/pages/_app.page'
import { Slide } from '@/pages/_component/slide'
import { bundleMDX } from 'mdx-bundler'
import { GetServerSidePropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
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
    const { content, sections } = grayMatterRead(currentPath + '/index.mdx')
    const result = await bundleMDX({
      cwd: process.cwd(),
      esbuildOptions(options) {
        options.outdir = path.join(process.cwd(), '/public/img')
        options.publicPath = '/img/'
        options.write = true
        options.target = 'esnext'
        options.loader = {
          ...options.loader,
          '.jpg': 'file',
          '.png': 'file',
        }
        return options
      },
      source: `${content}${sections[slug - 1]?.content ?? '' ?? ''}`,
    })

    return {
      props: {
        result,
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
> = ({ result: { code }, sections }) => {
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
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    router.prefetch(`/${count + 1}`)
    router.push({
      pathname: `/${count}`,
    })
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count])

  return (
    <Slide>
      <MdxComponent source={code} />
    </Slide>
  )
}

export default Page
