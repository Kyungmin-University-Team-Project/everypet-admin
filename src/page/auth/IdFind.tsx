import React, {useState} from "react";
import styles from "./IdFind.module.scss";

interface AuthFind {
    email: string;
    name: string;
    id?: string;
    phone?: string;
}

const IdFind = () => {
    const [activeTab, setActiveTab] = useState<'id' | 'password'>('id'); // 탭 상태
    const [user, setUser] = useState<AuthFind>({
        email: "",
        name: "",
        id: "",
        phone: ""
    });
    const [showVerificationInput, setShowVerificationInput] = useState<boolean>(false); // 인증번호 입력 필드 표시 여부
    const [verificationCode, setVerificationCode] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleTabChange = (tab: 'id' | 'password') => {
        setActiveTab(tab);
        setShowVerificationInput(false); // 탭을 변경하면 인증 필드는 숨김
    };

    // 아이디 찾기 - 인증번호 로직
    const handleIdVerificationClick = () => {
        if (user.name && user.email) {
            setShowVerificationInput(true); // 이름과 이메일이 있을 때 인증번호 입력 필드 표시
            alert("아이디 찾기용 인증번호가 전송되었습니다.");
        } else {
            alert("이름과 이메일을 입력해주세요.");
        }
    };

    // 비밀번호 찾기 - 인증번호 로직
    const handlePasswordVerificationClick = () => {
        if (user.id && user.phone) {
            setShowVerificationInput(true); // 아이디와 휴대폰 번호가 있을 때 인증번호 입력 필드 표시
            alert("비밀번호 찾기용 인증번호가 전송되었습니다.");
        } else {
            alert("아이디와 휴대폰 번호를 입력해주세요.");
        }
    };

    return (
        <div className={styles.find_form_container}>
            <div className={styles.tab_container}>
                <button
                    className={`${styles.tab} ${activeTab === 'id' ? styles.active : ''}`}
                    onClick={() => handleTabChange('id')}
                >
                    아이디 찾기
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'password' ? styles.active : ''}`}
                    onClick={() => handleTabChange('password')}
                >
                    비밀번호 찾기
                </button>
            </div>
            {activeTab === 'id' ? (
                <div className={styles.find_container}>
                    <h3 className={styles.find_text}>아이디 찾기</h3>
                    <form className={styles.find_form} onSubmit={(e) => e.preventDefault()}>
                        <ul className={styles.ul_form}>
                            <li>
                                <input
                                    placeholder="이름"
                                    className={styles.find_input}
                                    type='text'
                                    name='name'
                                    value={user.name}
                                    onChange={handleChange}
                                />
                            </li>
                            <li>
                                <input
                                    type="email"
                                    name='email'
                                    placeholder="이메일 입력"
                                    className={styles.find_input}
                                    value={user.email}
                                    onChange={handleChange}
                                />
                            </li>
                        </ul>
                        <button
                            type="button"
                            className={styles.ul_form_btn}
                            onClick={handleIdVerificationClick}
                        >
                            인증번호 받기
                        </button>
                        {showVerificationInput && (
                            <div className={styles.authentication_container}>
                                <input
                                    type="text"
                                    placeholder="인증번호 입력"
                                    className={styles.find_input}
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                />
                                <button className={styles.ul_form_btn}>
                                    인증번호 인증
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            ) : (
                <div className={styles.find_container}>
                    <h3 className={styles.find_text}>비밀번호 찾기</h3>
                    <form className={styles.find_form} onSubmit={(e) => e.preventDefault()}>
                        <ul className={styles.ul_form}>
                            <li>
                                <input
                                    placeholder="아이디 입력"
                                    className={styles.find_input}
                                    type='text'
                                    name='id'
                                    value={user.id}
                                    onChange={handleChange}
                                />
                            </li>
                            <li>
                                <input
                                    placeholder="휴대폰 번호 입력"
                                    className={styles.find_input}
                                    type='text'
                                    name='phone'
                                    value={user.phone}
                                    onChange={handleChange}
                                />
                            </li>
                        </ul>
                        <button
                            type="button"
                            className={styles.ul_form_btn}
                            onClick={handlePasswordVerificationClick}
                        >
                            인증번호 받기
                        </button>
                        {showVerificationInput && (
                            <div className={styles.authentication_container}>
                                <input
                                    type="text"
                                    placeholder="인증번호 입력"
                                    className={styles.find_input}
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                />
                                <button className={styles.ul_form_btn}>
                                    인증번호 인증
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            )}
        </div>
    );
};

export default IdFind;
