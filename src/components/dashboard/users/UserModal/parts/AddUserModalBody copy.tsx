import clsx from 'clsx'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useState, FormEvent } from 'react'
import { IUserAdd } from '../../../interfaces/IUserData'

export const AddUserModalBody = (): JSX.Element => {
    const [userData, setUserData] = useState<IUserAdd>({
        username: '',
        password: '',
    })

    const addUserSchema = Yup.object().shape({
        username: Yup.string().trim().required('Username is required'),
        password: Yup.string().trim().required('Password is required'),
    })

    const formik = useFormik({
        initialValues: userData,
        validationSchema: addUserSchema,
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true)
            try {
                console.log(values)
            } catch (ex) {
                console.error(ex)
            } finally {
                setSubmitting(true)
            }
        },
    })

    return (
        <>
            <form
                id='kt_modal_add_user_form'
                className='form'
                onSubmit={formik.handleSubmit}
                noValidate
            >
                <div
                    className='d-flex flex-column scroll-y me-n7 pe-7'
                    id='kt_modal_add_user_scroll'
                    data-kt-scroll='true'
                    data-kt-scroll-activate='{default: false, lg: true}'
                    data-kt-scroll-max-height='auto'
                    data-kt-scroll-dependencies='#kt_modal_add_user_header'
                    data-kt-scroll-wrappers='#kt_modal_add_user_scroll'
                    data-kt-scroll-offset='300px'
                >
                    <div className='fv-row mb-7'>
                        <label className='required fw-bold fs-6 mb-2'>Username</label>
                        <input
                            placeholder='Username'
                            type='text'
                            name='name'
                            className={clsx(
                                'form-control form-control-solid mb-3 mb-lg-0',
                                { 'is-invalid': formik.touched.username && formik.errors.username },
                                {
                                    'is-valid': formik.touched.username && !formik.errors.username,
                                }
                            )}
                            onInput={({ target }: FormEvent<HTMLInputElement>) => {
                                const inputElement = target as HTMLInputElement
                                setUserData({ ...userData, username: inputElement.value })
                            }}
                            autoComplete='off'
                            disabled={formik.isSubmitting}
                        />
                        {formik.touched.username && formik.errors.username && (
                            <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>
                                    <span role='alert'>{formik.errors.username}</span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='fv-row mb-7'>
                        <label className='required fw-bold fs-6 mb-2'>Password</label>
                        <input
                            placeholder='Password'
                            type='text'
                            name='name'
                            className={clsx(
                                'form-control form-control-solid mb-3 mb-lg-0',
                                { 'is-invalid': formik.touched.password && formik.errors.password },
                                {
                                    'is-valid': formik.touched.password && !formik.errors.password,
                                }
                            )}
                            onInput={({ target }: FormEvent<HTMLInputElement>) => {
                                const inputElement = target as HTMLInputElement
                                setUserData({ ...userData, password: inputElement.value })
                            }}
                            autoComplete='off'
                            disabled={formik.isSubmitting}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>
                                    <span role='alert'>{formik.errors.password}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className='text-center pt-15'>
                    <button
                        type='submit'
                        className='btn btn-primary'
                        data-kt-users-modal-action='submit'
                        disabled={formik.isSubmitting || !formik.isValid || !formik.touched}
                    >
                        <span className='indicator-label'>Submit</span>
                        {formik.isSubmitting && (
                            <span className='indicator-progress'>
                                Please wait...{' '}
                                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                            </span>
                        )}
                    </button>
                </div>
            </form>
        </>
    )
}
