import React from 'react'
import clsx from 'clsx'
import * as Yup from 'yup'
import { FormikProps, useFormik } from 'formik'
import { useState, FormEvent } from 'react'
import { IUserAdd } from '../../../interfaces/IUserData'

interface FormikInputProps {
    title: string
    field: keyof IUserAdd
    formik: FormikProps<IUserAdd>
    setUserData: React.Dispatch<React.SetStateAction<IUserAdd>>
}

const FormikInput = ({ title, field, formik, setUserData }: FormikInputProps) => {
    return (
        <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>{title}</label>
            <input
                placeholder={title}
                type='text'
                name={field}
                className={clsx('form-control form-control-solid mb-3 mb-lg-0', {
                    'is-invalid': formik.touched[field] && formik.errors[field],
                })}
                onInput={({ target }: FormEvent<HTMLInputElement>) => {
                    const inputElement = target as HTMLInputElement
                    setUserData((prevData) => ({
                        ...prevData,
                        [field]: inputElement.value,
                    }))
                }}
                autoComplete='off'
                disabled={formik.isSubmitting}
            />
            {formik.touched[field] && formik.errors[field] && (
                <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                        <span role='alert'>{formik.errors[field]}</span>
                    </div>
                </div>
            )}
        </div>
    )
}

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
        validationSchema: (val: any) => {
            console.log(val)
            return addUserSchema
        },
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true)
            try {
                console.log(values)
            } catch (ex) {
                console.error(ex)
            } finally {
                setSubmitting(false)
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
                <div className='d-flex flex-column scroll-y me-n7 pe-7'>
                    <FormikInput
                        title='Username'
                        field='username'
                        formik={formik}
                        setUserData={setUserData}
                    />
                    <FormikInput
                        title='Password'
                        field='password'
                        formik={formik}
                        setUserData={setUserData}
                    />
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
