import clsx from 'clsx';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import { IUserData } from 'common/interfaces/IUserData';
import { createOrUpdateUser, User } from 'components/dashboard/users/user.service';
import { TOAST_DURATION, useToast } from 'components/dashboard/helpers/renderToastHelper';
import { AxiosError } from 'axios';

interface UserModalProps {
    onClose: () => void;
    user?: User;
    updateData?: () => void;
}

interface UserModalData extends IUserData {
    confirmPassword: '';
}

export const UserModal = ({ onClose, user, updateData }: UserModalProps): JSX.Element => {
    const [hasServerError, setHasServerError] = useState<boolean>(false);
    const initialUserData: UserModalData = {
        username: user?.username || '',
        password: '',
        confirmPassword: '',
    };

    const { handleShowToast } = useToast();

    const addUserSchema = Yup.object().shape({
        username: Yup.string().trim().required('Username is required'),
        password: Yup.string().trim().required('Password is required'),
        confirmPassword: Yup.string()
            .trim()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Password confirmation is required'),
    });

    const formik = useFormik({
        initialValues: initialUserData,
        validationSchema: addUserSchema,
        onSubmit: async ({ username, password, confirmPassword }, { setSubmitting }) => {
            if (password !== confirmPassword) {
                handleShowToast({
                    message: 'Passwords do not match',
                    type: 'danger',
                });
                setSubmitting(false);
                return;
            }

            setSubmitting(true);
            try {
                const params: [string, string, string?] = [username, password];
                if (user?.useruid) params.push(user.useruid);
                const responseData = await createOrUpdateUser(...params);

                const message =
                    params.length > 2
                        ? `User password successfully updated`
                        : `User ${username} successfully created`;

                if (!responseData.error) {
                    handleShowToast({
                        message,
                        type: 'success',
                    });
                    onClose();
                    updateData && updateData();
                } else {
                    setHasServerError(responseData.error);
                    setTimeout(() => {
                        setHasServerError(false);
                    }, TOAST_DURATION);
                    throw new Error(responseData.error);
                }
            } catch (err) {
                const { message } = err as Error | AxiosError;
                handleShowToast({ message, type: 'danger' });
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <>
            <form className='form' onSubmit={formik.handleSubmit} noValidate>
                <div className='d-flex flex-column scroll-y me-n7 pe-7'>
                    <div className='fv-row mb-8'>
                        <label className='form-label fs-6 fw-bolder text-dark'>Username</label>
                        <input
                            placeholder='Username'
                            {...formik.getFieldProps('username')}
                            className={clsx(
                                'form-control',
                                {
                                    'is-invalid': formik.touched.username && formik.errors.username,
                                },
                                {
                                    'is-valid': formik.touched.username && !formik.errors.username,
                                }
                            )}
                            type='text'
                            name='username'
                            autoComplete='off'
                            disabled={Boolean(user)}
                        />
                        {formik.touched.username && formik.errors.username && (
                            <div className='fv-plugins-message-container'>
                                <span role='alert'>{formik.errors.username}</span>
                            </div>
                        )}
                    </div>

                    <div className='fv-row mb-8'>
                        <label className='form-label fw-bolder text-dark fs-6 mb-0'>Password</label>
                        <input
                            type='password'
                            placeholder='Password'
                            autoComplete='off'
                            {...formik.getFieldProps('password')}
                            className={clsx(
                                'form-control',
                                {
                                    'is-invalid': formik.touched.password && formik.errors.password,
                                },
                                {
                                    'is-valid': formik.touched.password && !formik.errors.password,
                                }
                            )}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>
                                    <span role='alert'>{formik.errors.password}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className='fv-row mb-8'>
                        <label className='form-label fs-6 fw-bolder text-dark'>
                            Password Confirmation
                        </label>
                        <input
                            type='password'
                            placeholder='Confirm Password'
                            autoComplete='off'
                            {...formik.getFieldProps('confirmPassword')}
                            className={clsx(
                                'form-control',
                                {
                                    'is-invalid':
                                        formik.touched.confirmPassword &&
                                        formik.errors.confirmPassword,
                                },
                                {
                                    'is-valid':
                                        formik.touched.confirmPassword &&
                                        !formik.errors.confirmPassword,
                                }
                            )}
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                            <div className='fv-plugins-message-container'>
                                <span role='alert'>{formik.errors.confirmPassword}</span>
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
    );
};
