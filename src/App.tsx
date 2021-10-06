import AnimatedLogo from './components/AnimatedLogo'
import Layout from './components/Layout'

export function App() {
  return (
    <Layout>
      <div tw="w-full h-full grid place-content-center">
        <AnimatedLogo tw="w-20 h-20" />
      </div>
    </Layout>
  )
}
