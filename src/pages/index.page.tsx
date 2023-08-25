import { NextPageWithLayout } from '@/pages/_app.page'
import { Heading } from '@/pages/_component/heading'
import { Slide } from '@/pages/_component/slide'

const Page: NextPageWithLayout = () => {
  return (
    <Slide center>
      <Heading>タイトル</Heading>
    </Slide>
  )
}

export default Page
