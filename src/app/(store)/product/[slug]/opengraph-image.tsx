import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import { env } from '@/env'
import colors from 'tailwindcss/colors'
import { ImageResponse } from 'next/server'

// Image metadata
export const runtime = 'edge'
export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

/* Função para buscar produto na api */
async function getProduct(slug: string): Promise<Product> {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 15, // 15 minutes
    },
  })

  const product = await response.json()

  return product
}

// Image generation
export default async function OgImage({
  params,
}: {
  params: { slug: string }
}) {
  // Font loading, process.cwd() is Next.js project directory
  /* const interSemiBold = await readFile(
    join(process.cwd(), 'assets/Inter-SemiBold.ttf'),
  ) */

  /* Busca o produto pela função getProduct */
  const product = await getProduct(params.slug)

  const productImageURL = new URL(product.image, env.APP_URL).toString()

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          background: colors.zinc[950],
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <img src={productImageURL} alt="" style={{ width: '100%' }} />
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
    },
  )
}
