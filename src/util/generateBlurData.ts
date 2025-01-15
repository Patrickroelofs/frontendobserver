import { APIError, type CollectionBeforeValidateHook } from 'payload'
import { getPlaiceholder } from 'plaiceholder'

const generateBlurData: CollectionBeforeValidateHook = async ({ data, req }) => {
  try {
    const buffer = req.file?.data

    if (buffer) {
      const { base64 } = await getPlaiceholder(buffer, {
        size: 32,
        format: ['jpg'],
        removeAlpha: true,
      })

      return {
        ...data,
        blurData: base64,
      }
    }
  } catch (error) {
    throw new APIError('Failed to generate blur hash')
  }
}
export { generateBlurData }
