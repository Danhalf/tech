import React, { lazy, Suspense } from 'react'
const Content = lazy(() => import('./Content'))

const Loader = () => {
    document.getElementById('splash-screen')?.remove()
    return (
        <div id='splash-screen' className='splash-screen d-flex flex-column w-full h-100'>
            <img src='adms_logo.png' className='logo' alt='ADMS logo' />
            <span>Loading ...</span>
        </div>
    )
}

const App: React.FC = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Content />
        </Suspense>
    )
}

export default App
