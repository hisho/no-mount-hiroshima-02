import { NextPageWithLayout } from '@/src/pages/_app.page'
import { Heading } from '@/src/pages/_component/heading'
import { Slide } from '@/src/pages/_component/slide'

const Page: NextPageWithLayout = () => {
  return (
    <Slide center>
      <Heading>タイトル</Heading>
    </Slide>
  )
}

export default Page
