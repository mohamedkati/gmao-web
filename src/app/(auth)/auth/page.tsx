// src/app/page.tsx
import { redirect } from 'next/navigation';

const Home = () => {
   redirect('/login');
}

export default Home;