import { useState } from 'react';
import AuthLayout from '@/components/auth/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <AuthLayout
      title={isLogin ? "Welcome Back" : "Begin Your Journey"}
      subtitle={isLogin ? "Enter your cosmic credentials" : "Join the astral realm"}
    >
      {isLogin ? <LoginForm /> : <SignupForm />}
      
      <div className="mt-6 text-center">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-primary hover:underline text-sm"
        >
          {isLogin ? "New to AstroGuide? Create an account" : "Already have an account? Sign in"}
        </button>
      </div>
    </AuthLayout>
  );
}