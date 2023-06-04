import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { register } from '../services/auth.service'
import { useState } from 'react'

type Props = {}

const Signup: React.FC<Props> = () => {
    let navigate: NavigateFunction = useNavigate()
    const [successful, setsuccessful] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')

    const intialValues: {
        username: string
        email: string
        password: string
    } = {
        username: '',
        email: '',
        password: '',
    }

    const validationSchema = Yup.object({
        username: Yup.string()
            .test(
                'len',
                'The username must be between 3 and 20 characters.',
                (val: any) =>
                    val &&
                    val.toString().length >= 3 &&
                    val.toString().length <= 20
            )
            .required('This field is required'),
        email: Yup.string()
            .email('This is not a valid email.')
            .required('This field is required!'),
        password: Yup.string()
            .test(
                'len',
                'The password must be between 6 and 40 characters.',
                (val: any) =>
                    val &&
                    val.toString().length >= 6 &&
                    val.toString().length <= 40
            )
            .required('This field is required!'),
    })
    const handRegister = (values: typeof intialValues) => {
        const { username, email, password } = values

        setMessage('')
        setsuccessful(true)
        register(username, email, password)
            .then((res) => {
                setMessage(res.data.message)
                setsuccessful(true)
            })
            .catch((error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString()
                setMessage(resMessage)
                setsuccessful(false)
            })
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Register for a new account!
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <Formik
                    initialValues={intialValues}
                    validationSchema={validationSchema}
                    onSubmit={handRegister}
                >
                    <Form className="space-y-6" action="#" method="POST">
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Username
                            </label>
                            <div className="mt-2">
                                <Field
                                    id="username"
                                    name="username"
                                    type="username"
                                    autoComplete="username"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <ErrorMessage name="username" />
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <Field
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <ErrorMessage name="email" />
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <Field
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <ErrorMessage name="password" />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                        {message && (
                            <div className="form-group">
                                <div
                                    className={
                                        successful
                                            ? 'alert alert-success'
                                            : 'alert alert-danger'
                                    }
                                    role="alert"
                                >
                                    {message}
                                </div>
                            </div>
                        )}
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default Signup
