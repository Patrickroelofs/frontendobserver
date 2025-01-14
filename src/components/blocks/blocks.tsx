import { type ComponentType, type ReactElement } from 'react'
import { SimpleText } from '@/blocks/simpleText'
import { type SimpleTextType } from '@/payload-types'

interface BlocksProps {
  blocks: SimpleTextType[] | null | undefined
}

const blockComponents = {
  SimpleText,
}

function Blocks({ blocks }: BlocksProps): ReactElement | null {
  if (blocks === null || blocks === undefined) {
    return null
  }

  return (
    <>
      {blocks.map((block) => {
        const { blockType } = block

        if (blockType in blockComponents) {
          const BlockComponent = blockComponents[blockType] as ComponentType

          return <BlockComponent key={block.id} {...block} />
        }

        return null
      })}
    </>
  )
}

export { Blocks }
