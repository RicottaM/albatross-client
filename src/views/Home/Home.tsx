import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext/UserContext';
import { useAuth } from '@/hooks/useAuth';
import Map from '@/components/Map/Map';
import Navbar from '@/components/Navbar/Navbar';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const { checkUser } = useAuth();
  const { login, setLogin } = useUser();

  useEffect(() => {
    checkUser();
  }, [navigate, setLogin]);

  return (
    <>
      <Navbar username={login} />
      <Map />
    </>
  );
}

export default Home;
