import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  Container, Row, Col, Card, Image, Form, Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import routes from '../../routes';
import { useAuth } from '../../contexts/authContext/AuthContext';

const signupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'signup.usernameLength')
    .max(20, 'signup.usernameLength')
    .required('signup.requiredField'),
  password: Yup.string()
    .min(6, 'signup.passwordLength')
    .required('signup.requiredField'),
  passwordConfirm: Yup.string()
    .required('signup.requiredField')
    .oneOf([Yup.ref('password')], 'signup.passwordsMatch'),
});

const image = '../../assets/signup.jpg';

const SignupPage = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const navigate = useNavigate();
  const { logIn } = useAuth();
  const [signupFailed, setSignupFailed] = useState(false);

  useEffect(() => {
    ref.current.focus();
  }, []);

  const handleSubmit = async ({ username, password }, actions) => {
    try {
      setSignupFailed(false);
      const response = await axios.post(routes.signupPath(), {
        username,
        password,
      });
      logIn(response.data);
      navigate(routes.chatRoute());
    } catch (error) {
      actions.setSubmitting(false);
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        setSignupFailed(true);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: signupSchema,
    validateOnBlur: false,
    onSubmit: handleSubmit,
  });

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col md={6} xs={12} className="d-flex align-items-center justify-content-center">
                <Image src={image} alt="#" className="rounded-circle" />
              </Col>
              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">{t('signup.registration')}</h1>
                <Form.Group className="mb-4">
                  <Form.Label style={{ display: 'none' }} htmlFor="username">{t('signup.username')}</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    id="username"
                    placeholder={t('signup.username')}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    ref={ref}
                    isInvalid={
                      (formik.touched.username && formik.errors.username) || signupFailed
                    }
                  />
                  {formik.errors.username && formik.touched.username && (
                    <Form.Text className="text-danger">{t(formik.errors.username)}</Form.Text>
                  )}
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label style={{ display: 'none' }} htmlFor="password">{t('signup.password')}</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    id="password"
                    placeholder={t('signup.password')}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    isInvalid={
                      (formik.touched.password && formik.errors.password) || signupFailed
                    }
                  />
                  {formik.errors.password && formik.touched.password && (
                    <Form.Text className="text-danger">{t(formik.errors.password)}</Form.Text>
                  )}
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label style={{ display: 'none' }} htmlFor="passwordConfirm">{t('signup.passwordConfirm')}</Form.Label>
                  <Form.Control
                    type="password"
                    name="passwordConfirm"
                    id="passwordConfirm"
                    placeholder={t('signup.passwordConfirm')}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.passwordConfirm}
                    isInvalid={
                      (formik.touched.passwordConfirm
                        && formik.errors.passwordConfirm)
                        || signupFailed
                    }
                  />
                  {formik.errors.passwordConfirm && formik.touched.passwordConfirm && (
                  <Form.Text className="text-danger">{t(formik.errors.passwordConfirm)}</Form.Text>
                  )}
                  {signupFailed && (<Form.Text className="text-danger">{t('signup.userExists')}</Form.Text>)}
                </Form.Group>
                <Button type="submit" variant="outline-primary" className="w-100 mb-3">{t('signup.signup')}</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
