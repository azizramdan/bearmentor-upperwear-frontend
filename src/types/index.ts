export type Product = {
  id: string
  title: string
  slug: string
  images: Array<{
    url: string
  }>
  variants: Array<{
    price: number
  }>
}