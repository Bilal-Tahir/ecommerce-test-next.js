const Hero: React.FC = () => {
  return (
    <div
      className='hero relative bg-cover bg-center bg-no-repeat bg-fixed h-96 md:h-screen text-white flex items-center justify-between p-16'
      style={{ backgroundImage: `url('/hero.jpg')` }}
    >
      <div className='flex-1 max-w-screen-md relative z-10'>
        <h1 className='text-4xl md:text-6xl font-bold mb-4'>
          Shop for you favourite items on one click!
        </h1>

        <p className='text-lg md:text-xl mb-8'>
          Find, Groceries, Garments, Electonic Gadgets and Much More Super Easy!
        </p>
      </div>

      <div className='hidden md:block absolute inset-0 w-full h-full bg-black opacity-40'></div>
    </div>
  );
};

export default Hero;
