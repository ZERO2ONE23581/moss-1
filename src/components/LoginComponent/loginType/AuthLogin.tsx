import React, { useState } from 'react';
import useMutation, { IMutation } from 'src/libs/client/useMutation';
import { EmailLoginForm, PhoneLoginForm } from '../Forms';
import TokenLogin from './TokenLogin';
import UserLogin from './UserLogin';

function AuthLogin() {
  //select method
  const [method, setMethod] = useState('userId');
  const onClick = (option: React.FormEvent<HTMLSelectElement>) => {
    setMethod(option.currentTarget.value);
  };
  console.log(method);
  //API
  const [login, { loading, data }] = useMutation<IMutation>(
    '/api/users/tokenLogin',
  );
  //
  return (
    <>
      {data?.ok ? (
        <TokenLogin />
      ) : (
        <>
          <select onInput={onClick} value={method}>
            <option value="">로그인 방식을 선택하세요.</option>
            <option value="userId">아이디 비밀번호로 로그인</option>
            <option value="email">이메일 로그인</option>
            <option value="phone">휴대폰 로그인</option>
          </select>

          {method === 'userId' ? (
            <UserLogin />
          ) : method === 'email' ? (
            <EmailLoginForm login={login} loading={loading} />
          ) : method === 'phone' ? (
            <PhoneLoginForm login={login} loading={loading} />
          ) : null}
        </>
      )}
    </>
  );
}
export default AuthLogin;