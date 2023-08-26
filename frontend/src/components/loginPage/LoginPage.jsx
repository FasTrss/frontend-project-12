import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  Container, Row, Col, Card,
  Image, Form, Button, InputGroup,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Eye, EyeSlash } from 'react-bootstrap-icons';

import image from '../../assets/login.jpg';
import routes from '../../routes.js';
import { useAuth } from '../../contexts/authContext/AuthContext.jsx';

const LoginPage = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const [authFailed, setauthFailed] = useState(false);
  const [showPassword, setShowpassword] = useState(false);

  const handleShowPassword = () => {
    setShowpassword(!showPassword);
  };

  useEffect(() => {
    ref.current.focus();
  }, []);

  const loginSchema = Yup.object().shape({
    username: Yup.string()
      .required('login.requiredField'),
    password: Yup.string()
      .required('login.requiredField'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    validateOnBlur: false,
    onSubmit: ({ username, password }, actions) => {
      setauthFailed(false);
      axios.post(routes.loginPath(), {
        username,
        password,
      })
        .then((response) => {
          logIn(response.data);
          navigate(routes.chatRoute());
        })
        .catch((error) => {
          actions.setSubmitting(false);
          if (error.isAxiosError && error.response.status === 401) {
            setauthFailed(true);
          }
        });
    },
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
                <h1 className="text-center mb-4">{t('login.signin')}</h1>
                <Form.Group className="mb-4">
                  <Form.Label style={{ display: 'none' }} htmlFor="username">{t('login.username')}</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    id="username"
                    placeholder={t('login.username')}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    ref={ref}
                    ria-descriebedby="tooltip-1"
                    isInvalid={
                      (formik.touched.username && formik.errors.username) || authFailed
                    }
                  />
                  <Form.Text className="text-danger">
                    {formik.errors.username && formik.touched.username
                      ? t(formik.errors.username)
                      : null}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label style={{ display: 'none' }} htmlFor="password">{t('login.password')}</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      id="password"
                      placeholder={t('login.password')}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      isInvalid={
                        (formik.touched.password && formik.errors.password) || authFailed
                      }
                    />
                    <Button
                      variant={formik.errors.password && formik.touched.password
                        ? 'outline-danger'
                        : 'outline-secondary'}
                      onClick={handleShowPassword}
                    >
                      {showPassword ? <EyeSlash /> : <Eye />}
                    </Button>
                  </InputGroup>
                  <Form.Text className="text-danger">
                    {formik.errors.password && formik.touched.password
                      ? t(formik.errors.password)
                      : null}
                  </Form.Text>
                </Form.Group>
                <Form.Text className="text-danger">
                  {authFailed ? t('login.wrongNameAndPassword') : null}
                </Form.Text>
                <Button type="submit" variant="outline-primary" className="w-100 mb-3">{t('login.signin')}</Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span className="px-1">{t('login.noAccountYet')}</span>
                <Link to={routes.signupRoute()}>{t('login.signup')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
