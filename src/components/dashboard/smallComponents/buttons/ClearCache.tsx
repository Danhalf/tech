import { clearCache } from '../../users/user.service'

export const ClearCache = () => (
    <div className='fixed-bottom d-flex justify-content-end m-3'>
        <button className='btn btn-warning font-weight-bold mr-2' onClick={() => clearCache()}>
            Clear server cache
        </button>
    </div>
)
