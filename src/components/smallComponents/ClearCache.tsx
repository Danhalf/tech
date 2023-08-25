import { clearCache } from '../dashboard/users/user.service'

export const ClearCache = () => (
    <div className='fixed-bottom d-flex justify-content-end m-4'>
        <button className='btn btn-warning' onClick={() => clearCache()}>
            Clear server cache
        </button>
    </div>
)
