import { Routes, Route } from 'react-router-dom'
import { Dashboard } from './components/dashboard/Dashboard'
import { MicroserviceCard } from './components/dashboard/microservices/MicroserviceCard'
import Microservices from './components/dashboard/microservices/Microservices'
import { UserCard } from './components/dashboard/users/UserCard'
import Users from './components/dashboard/users/Users'
import { Login } from './components/Login'

const Content = () => (
    <div className='d-flex flex-column flex-lg-row flex-column-fluid h-100'>
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />}>
                <Route path='' element={<Microservices />} />
                <Route path='microservices/:uid' element={<MicroserviceCard />} />
                <Route path='users' element={<Users />} />
                <Route path='users/:id' element={<UserCard />} />
            </Route>
        </Routes>
    </div>
)

export default Content
