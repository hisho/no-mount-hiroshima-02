import matter from 'gray-matter'
import { z } from 'zod'

const schema = z.object({
  sections: z
    .object({
      content: z.string(),
      data: z.string(),
      key: z.string(),
    })
    .array(),
})

export const grayMatterRead = (path: string) => {
  const parsed = schema.safeParse(
    matter.read(path, {
      // @ts-ignore
      sections: true,
    })
  )

  if (parsed.success) {
    return parsed.data
  }

  return {
    sections: [],
  }
}
