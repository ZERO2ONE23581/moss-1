import styled from '@emotion/styled';
import { useForm, FieldErrors } from 'react-hook-form';

interface JoinForm {
  userId: string;
  password: string;
  username: string;
  location: string;
  email: string;
}

export default function Test() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<JoinForm>({ mode: 'onBlur' });

  const onValid = (data: JoinForm) => {
    console.log(`계정생성 성공!`);
  };
  const InValid = (errors: FieldErrors) => {
    console.log(errors);
  };

  console.log(errors);

  return (
    <>
      <H1>회원가입</H1>
      <JoinForm onSubmit={handleSubmit(onValid, InValid)}>
        <input
          {...register('userId', {
            required: '아이디가 필요합니다!!',
            validate: {
              forbidden: (value) => !value.includes('voldmote') || '볼드모트',
            },
          })}
          type="text"
          placeholder="아이디"
        />
        {errors.userId?.message}
        <input
          {...register('password', {
            required: '비밀번호가 필요합니다!!',
            minLength: {
              message: "'비밀번호는 6자 이상 영문과 숫자의 조합이어야 합니다.'",
              value: 6,
            },
          })}
          type="password"
          placeholder="비밀번호"
        />
        {errors.password?.message}
        <input
          {...register('username', { required: '이름이 필요합니다!!' })}
          type="text"
          placeholder="이름"
        />
        {errors.username?.message}
        <input
          {...register('location', { required: '거주지가 필요합니다!!' })}
          type="text"
          placeholder="거주지"
        />
        {errors.location?.message}
        <input
          {...register('email', { required: '이메일이 필요합니다!!' })}
          type="email"
          placeholder="이메일"
        />
        {errors.email?.message}
        <input type="submit" value="회원가입" />
      </JoinForm>
    </>
  );
}

const H1 = styled.h1`
  text-align: center;
  margin-bottom: 10px;
`;

const JoinForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 500px;
  margin: 0 auto;
  gap: 10px;
`;