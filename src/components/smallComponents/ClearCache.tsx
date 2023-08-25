import { clearCache } from '../dashboard/users/user.service'

export const ClearCache = () => (
    <div className='sticky-bottom sticky-right d-flex justify-content-end m-4'>
        <button className='btn btn-warning' onClick={() => clearCache()}>
            Clear server cache
        </button>
    </div>
)
