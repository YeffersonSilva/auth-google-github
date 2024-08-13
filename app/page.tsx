'use client';

import { useState, MouseEventHandler } from 'react';
import { authProvider } from '@/services/firebase';
import Image from 'next/image';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { RiGoogleFill, RiGithubFill } from 'react-icons/ri';

const initUser = {
  name: '',
  email: '',
  photo: '',
};

export default function Home() {
  const [user, setUser] = useState(initUser);
  const auth = getAuth();

  const handleGoogleAuth: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    try {
      await authProvider('google');
      onAuthStateChanged(auth, function (user) {
        setUser({
          name: user?.displayName || '',
          email: user?.email || '',
          photo: user?.photoURL || '',
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleGithubAuth: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    try {
      await authProvider('github');
      onAuthStateChanged(auth, function (user) {
        setUser({
          name: user?.displayName || '',
          email: user?.email || '',
          photo: user?.photoURL || '',
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='min-h-screen flex flex-col gap-y-4 items-center justify-center'>
      <div className='flex items-center gap-4'>
        <div className='relative h-10 w-10'>
          <Image
            src={
              user.photo !== ''
                ? user.photo
                : 'https://img.freepik.com/vector-gratis/ilustracion-abstracta-investigacion-privada_335657-5314.jpg?w=1060&t=st=1702598587~exp=1702599187~hmac=a472b6ddd935b71bd4737f4e3b04600e4e66da5dcb6edde179a5f06e32a62825'
            }
            alt='Image'
            fill
            className=' object-cover rounded-full'
          />
        </div>
        <div>
          <h1>{user.name}</h1>
          <h2>{user.email}</h2>
        </div>
      </div>
      <button
        type='button'
        onClick={handleGoogleAuth}
        className='py-3 px-4 rounded-full hover:bg-gray-500/10 transition-colors duration-300 flex items-center gap-3'
      >
        <RiGoogleFill />
        Ingresar con Google
      </button>
      <button
        type='button'
        onClick={handleGithubAuth}
        className='py-3 px-4 rounded-full hover:bg-gray-500/10 transition-colors duration-300 flex items-center gap-3'
      >
        <RiGithubFill />
        Ingresar con GitHub
      </button>
    </div>
  );
}
