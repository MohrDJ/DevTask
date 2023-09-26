'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

const Home: React.FC = () => {
  const router = useRouter();


  React.useEffect(() => {
    router.push('/portal');
  }, );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Formulário de solicitação</h1>
    </main>
  );
};

export default Home;
