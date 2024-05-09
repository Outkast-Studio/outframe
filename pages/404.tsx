import { Layout } from 'components/layouts/Layout'
import clsx from 'clsx'

export default function FourOhFour() {
  return (
    <Layout>
      <main
        className={clsx('w-screen h-[100svh] flex items-center justify-center')}
      >
        <div className={clsx('font-monoMedium text-[22px] pb-[30svh]')}>
          <h1>404 – Page Not Found</h1>
        </div>
      </main>
    </Layout>
  )
}
