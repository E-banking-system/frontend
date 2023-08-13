import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../actions/resetPasswordActions';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CustomAlert from '../../components/CustomAlert';
import { fetchUserInfo } from '../../actions/profileActions';

const ChangePasswordForm = ({onCancel}) => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const userInfo = useSelector((state) => state.profile.userInfo);


    useEffect(() => {
        dispatch(fetchUserInfo());
      }, [dispatch]);

    const handleAlertClose = () => {
        setIsOpen(false);
    };

    const initialValues = {
        newPassword: '',
        confirmPassword: '',
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white shadow-md rounded p-8 w-96">
                <h1 className="text-2xl font-bold mb-4">Change Password</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={Yup.object().shape({
                        newPassword: Yup.string().required('New Password is required'),
                        confirmPassword: Yup.string()
                            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
                            .required('Confirm Password is required'),
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                        console.log(JSON.stringify(userInfo));
                        
                        try {
                            setIsOpen(true);
                            dispatch(resetPassword(userInfo.email, values.newPassword));
                            setAlertMessage('Vérifiez votre email pour confirmer le changement de votre mot de passe');
                        } catch (error) {
                            console.error('Error while changing password:', error);
                            setAlertMessage('Error changing password. Please try again.');
                        } finally {
                            setSubmitting(false);
                        }
                        
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
                                    New Password
                                </label>
                                <Field
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="newPassword"
                                    type="password"
                                    name="newPassword"
                                    placeholder="New Password"
                                />
                                <ErrorMessage name="newPassword" component="p" className="text-red-500" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                                    Confirm Password
                                </label>
                                <Field
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="confirmPassword"
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                />
                                <ErrorMessage name="confirmPassword" component="p" className="text-red-500" />
                            </div>
                            <div className="flex items-center justify-center">
                                <button
                                    className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    Change Password
                                </button>
                                <button
                                    className="ml-2 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button" // Use type="button" for cancel button
                                    onClick={onCancel}
                                >
                                    Annuler
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
                <CustomAlert isOpen={isOpen} onClose={handleAlertClose} title="Alert" message={alertMessage} actionLabel="OK" />
            </div>
        </div>
    );
}

export default ChangePasswordForm;
