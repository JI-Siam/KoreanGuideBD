import LoginForm from '@/components/auth/LoginForm';
import React from 'react';

export const metadata = {
  title: 'Sign In - Korean Guide BD',
  description: 'Access your verified Korean immigration and study checklist.',
};

const page = () => {
  return (
    <main>
      <LoginForm />
    </main>
  );
};

export default page;
