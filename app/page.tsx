import { Hero } from "@/components/sections/hero"
import { FeaturedCollection } from "@/components/sections/featured-collection"
import { ModelSplit } from "@/components/sections/model-split"
import { SpringSummer } from "@/components/sections/spring-summer"
import { EchoesOpulence } from "@/components/sections/echoes-opulence"
import { FeaturesBar } from "@/components/sections/features-bar"
import { RelatedProducts } from "@/components/sections/related-products"
import { Newsletter } from "@/components/sections/newsletter"
import { Footer } from "@/components/sections/footer"
import { SearchModal } from "@/components/search/search-modal"
import { CartPanel } from "@/components/cart/cart-panel"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturedCollection />
      <ModelSplit />
      <SpringSummer />
      <EchoesOpulence />
      <FeaturesBar />
      <RelatedProducts />
      <Newsletter />
      <Footer />
      <SearchModal />
      <CartPanel />
    </main>
  )
}
