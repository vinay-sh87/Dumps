const App = () => {
  const images = [
    "https://images.pexels.com/photos/16219232/pexels-photo-16219232.jpeg",
    "https://images.pexels.com/photos/30091776/pexels-photo-30091776.jpeg",
    "https://images.pexels.com/photos/28907756/pexels-photo-28907756.jpeg",
    "https://images.pexels.com/photos/16219232/pexels-photo-16219232.jpeg",
    "https://images.pexels.com/photos/16219232/pexels-photo-16219232.jpeg",
    "https://images.pexels.com/photos/28907756/pexels-photo-28907756.jpeg",
    "https://images.pexels.com/photos/30091776/pexels-photo-30091776.jpeg",
    "https://images.pexels.com/photos/28907756/pexels-photo-28907756.jpeg",
  ];
  return (
    <>
      <div className="container mx-auto h-auto">
        <div className="w-full rounded-xl shadow-2xl h-64 transition hover:-translate-y-5  md:h-96 overflow-hidden mb-5">
          <img
            src="https://images.pexels.com/photos/17809081/pexels-photo-17809081.jpeg"
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img, index) => {
            return (
              <div key={index} className="aspect-square md:aspect-video">
                <img
                  src={img}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg hover:-translate-y-2 duration-300 ease-initial shadow transition"
                />
              </div>
            );
          })}
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4 mt-8">
          {images.map((img, i) => (
            <div key={i} className="break-inside-avoid">
              <img src={img} className="w-full h-auto rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
