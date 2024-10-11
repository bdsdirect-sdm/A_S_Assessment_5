import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const getAgencies = () => {
    return axios.get('http://localhost:4000/get-all-agencies').then(res => res.data);
};

const addUser = (formData:any) => {
    return axios.post('http://localhost:4000/signup', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
};

const Signup = () => {
    const navigate = useNavigate()
    const { data: agencies } = useQuery({
        queryKey: ['fetchAgencies'],
        queryFn: getAgencies,
    });

    const signupMutation = useMutation({
        mutationFn: addUser,
    });

    const validationSchema = Yup.object({
        firstname: Yup.string().required('First name is required'),
        lastname: Yup.string().required('Last name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        phone: Yup.string().required('Phone number is required').matches(/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/, 'Only numbers are allowed'),
        user_type: Yup.string().required('User type is required'),
        profile_photo: Yup.mixed().required("Photo is necessary"),
        
    });

    const handleSignup = (values:any) => {
        const formData = new FormData();
        Object.keys(values).forEach((key) => formData.append(key, values[key]));
        console.log("Data-------> ", formData)
        signupMutation.mutate(formData);
        navigate("/Login");
    }



    return (
        <Formik
            initialValues={{
                firstname: '',
                lastname: '',
                email: '',
                phone: '',
                profile_photo:null,
                gender: '',
                user_type: '',
                reading: false,
                writting: false,
                fitness: false,
                shoping: false,
                guitar: false,
                resume: null,
                agency: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSignup}
        >
            {({ values, setFieldValue }) => (
                <Form className="container mt-4 p-4 bg-secondary rounded-5">
                    <h2>Sign Up</h2>
                    <div className="mb-3">
                        <Field name="firstname" type="text" placeholder="First Name" className="form-control" />
                        <ErrorMessage name="firstname" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                        <Field name="lastname" type="text" placeholder="Last Name" className="form-control" />
                        <ErrorMessage name="lastname" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                        <Field name="email" type="email" placeholder="Email" className="form-control" />
                        <ErrorMessage name="email" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                        <Field name="phone" type="text" placeholder="Phone Number" className="form-control" />
                        <ErrorMessage name="phone" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                    <input className="form-control" type="file" name="profile_photo" accept=".jpg, .png" onChange={(event: any) => {
                                setFieldValue("profile_photo", event.currentTarget.files[0]);
                            }} />
                        <ErrorMessage name="profile_photo" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Gender</label>
                        <div>
                            <label className="me-3">
                                <Field name="gender" type="radio" value="1" /> Male
                            </label>
                            <label>
                                <Field name="gender" type="radio" value="2" /> Female
                            </label>
                            <label>
                                <Field name="gender" type="radio" value="3" /> Others
                            </label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <Field as="select" name="user_type" className="form-select">
                            <option value="">Select User Type</option>
                            <option value="1">Agency</option>
                            <option value="2">Job-seeker</option>
                        </Field>
                    </div>
                    {values.user_type === '2' && (
                        <>
                            <div className="mb-3">
                                <input
                                    name="resume"
                                    accept=".pdf, .docx"
                                    type="file"
                                    onChange={(event: any) => {
                                        setFieldValue("resume", event.currentTarget.files[0]);
                                    }}
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3">
                                <Field as="select" name="agency" className="form-select">
                                    <option value="">Select Agency</option>
                                    {agencies?.map((agency:any) => (
                                        <option key={agency.id} value={agency.id}>
                                            {agency.firstname}
                                        </option>
                                    ))}
                                </Field>
                            </div>
                        </>
                    )}
                    <div className="mb-3">
                        <label className="form-label">Hobbies:</label>
                        <div>
                            <label className="me-3">
                                <Field type="checkbox" name="reading" /> Reading
                            </label>
                            <label className="me-3">
                                <Field type="checkbox" name="writting" /> Writing
                            </label>
                            <label className="me-3">
                                <Field type="checkbox" name="fitness" /> Fitness
                            </label>
                            <label className="me-3">
                                <Field type="checkbox" name="shoping" /> Shopping
                            </label>
                            <label className="me-3">
                                <Field type="checkbox" name="guitar" /> Guitar
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </Form>
            )}
        </Formik>
    );
};

export default Signup;
