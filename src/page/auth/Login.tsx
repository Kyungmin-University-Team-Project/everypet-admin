import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {loginState} from '../../redux/auth/authSlice';

import styles from './Login.module.scss';
import '@fortawesome/fontawesome-free/css/all.css';
import {login} from "../../utils/auth/AuthAPI";
import {encryptToken} from "../../utils/auth/token";
import {LoginData} from "../../typing/auth/login";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [values, setValues] = useState<LoginData>({
        memberId: '',
        memberPwd: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [e.target.id]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await login(values);

            const secretKey = process.env.REACT_APP_CRYPTOJS_KEY;
            if (!secretKey) {
                console.log('CRYPTOJS_KEY is not defined in the environment variables');
            }

            const encryptedAccess = encryptToken(response.access);
            dispatch(loginState({username: response.user, accessToken: encryptedAccess}));

            navigate('/dashBoard');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.login_box}>
            <section className={styles.login_section}>
                <div className={styles.login_title_container}>
                    <span className={styles.login_title}>에브리펫</span>
                    <span>사장님</span>
                </div>
                <form className={styles.login_input} onSubmit={handleSubmit}>

                    <label htmlFor="memberId" className={styles.input_label}>
                        <p className={styles.login_text}>아이디</p>
                        <div className={styles.input_field}>
                            <input
                                placeholder="아이디"
                                id="memberId"
                                name="memberId"
                                value={values.memberId}
                                onChange={handleChange}
                                className={styles.input_input}
                            />
                        </div>
                    </label>
                    <label htmlFor="memberPwd" className={styles.input_label}>
                        <p className={styles.login_text}>비밀번호</p>
                        <div className={styles.input_field}>
                            <input
                                type="password"
                                placeholder="비밀번호"
                                id="memberPwd"
                                name="memberPwd"
                                className={styles.input_input}
                                value={values.memberPwd}
                                onChange={handleChange}
                            />
                        </div>
                    </label>

                    <div>
                        <label htmlFor="checkbox" className={styles.checkbox_label}>
                            <input
                                className={styles.login_checkbox}
                                type="checkbox"
                                id="checkbox"
                            />
                            <i className={styles.circle}></i>
                            <span>로그인 상태 유지</span>
                        </label>
                    </div>
                    <button className={styles.login_btn}>로그인</button>
                    <p className={styles.login_link}>
                        <Link to="/IdFind">아이디/비밀번호 찾기 |</Link>
                        <Link to="/agreement">회원가입</Link>
                    </p>
                </form>
            </section>
        </div>
    );
};

export default Login;
