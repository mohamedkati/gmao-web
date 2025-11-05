// src/app/page.tsx
"use client"
import { redirect } from 'next/navigation';

const Home = () => {
   redirect('/login');
}

export default Home;