import ProductList from '../components/ProductList';

const Home: React.FC = () => {
  return (
    <div className='text-center mt-8'>
      <h1 className='text-xl sm:text-2xl lg:text-3xl font-bold mb-8'>
        Product List
      </h1>
      <ProductList />
    </div>
  );
};

export default Home;
