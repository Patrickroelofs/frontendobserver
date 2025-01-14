import { type ComponentType, type ReactElement } from 'react'
import { type ContainerType, type SimpleTextType } from '@/payload-types'
import { SimpleText } from '@/components/simpleText/simpleText'
import { Container } from '@/components/container'

interface BlocksProps {
  blocks: (SimpleTextType | ContainerType)[] | null | undefined
}

const blockComponents = {
  SimpleText,
  Container,
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
