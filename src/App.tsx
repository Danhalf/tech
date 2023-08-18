import { lazy, Suspense, useEffect } from 'react'
import { MenuComponent } from './_metronic/assets/ts/components'
const Content = lazy(() => import('./Content'))

const Loader = () => {
    document.getElementById('splash-screen')?.remove()
    return (
        <div id='splash-screen' className='splash-screen'>
            <img src='logo/admss_logo-min.png' className='logo' alt='ADMS logo' />
            <div>Loading ...</div>
        </div>
    )
}

export function MasterInit() {
    const pluginsInitialization = () => {
        setTimeout(() => {
            MenuComponent.bootstrap()
        }, 500)
    }

    useEffect(() => {
        pluginsInitialization()
    }, [])
    return <></>
}

const App: React.FC = () => {
    return (
        <Suspense fallback={<Loader />}>
            <MasterInit />
            <Content />
        </Suspense>
    )
}

export default App
