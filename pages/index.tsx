import AnimatedLogo from "@/components/AnimatedLogo"
import Layout from "@/components/Layout"
import "@twind/macro"

export default function Home() {
  return (
    <Layout>
      <div tw="w-full h-full grid place-content-center">
        <AnimatedLogo tw="w-20" />
      </div>
    </Layout>
  )
}
