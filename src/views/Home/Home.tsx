import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext/UserContext';
import { useAuth } from '@/hooks/useAuth';
import { useCategories } from '@/hooks/useCatagories';
import { Category } from '@/models/Category';
import Map from '@/components/Map/Map';
import Navbar from '@/components/Navbar/Navbar';
import './Home.css';

function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | '*'>('*');
  const { login, setLogin } = useUser();
  const { getCategories } = useCategories();
  const { checkUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, [navigate, setLogin]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return (
    <>
      <Navbar username={login} categories={categories} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
      <Map selectedCategory={selectedCategory} categories={categories} />
    </>
  );
}

export default Home;
