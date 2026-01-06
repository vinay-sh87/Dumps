export default function Layout() {
  return (
    <>
      <div className="container mx-auto py-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="item bg-black text-white place-items-center text-center p-4">
            <img
              src="https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
              alt=""
            />
            <h2 className="text-xl mt-5">Product 1</h2>
            <p>$19.9</p>
            <button className="bg-white text-black px-5 py-2 mt-2 rounded">
              Buy Now
            </button>
          </div>
          <div className="item bg-black text-white place-items-center text-center p-4">
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
              alt=""
            />
            <h2 className="text-xl mt-5">Product 2</h2>
            <p>$19.9</p>
            <button className="bg-white text-black px-5 py-2 mt-2 rounded">
              Buy Now
            </button>
          </div>
          <div className="item bg-black text-white place-items-center text-center p-4">
            <img
              src="https://plus.unsplash.com/premium_photo-1719289799376-d3de0ca4ddbc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzN8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D"
              alt=""
            />
            <h2 className="text-xl mt-5">Product 3</h2>
            <p>$19.9</p>
            <button className="bg-white text-black px-5 py-2 mt-2 rounded">
              Buy Now
            </button>
          </div>
          <div className="item bg-black text-white place-items-center text-center p-4">
            <img
              className=""
              src="https://plus.unsplash.com/premium_photo-1681500490647-8d11514aa4e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI1fHxwcm9kdWN0fGVufDB8fDB8fHww"
              alt=""
            />
            <h2 className="text-xl mt-5">Product 4</h2>
            <p>$19.9</p>
            <button className="bg-white text-black px-5 py-2 mt-2 rounded">
              Buy Now
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row my-5 bg-red-100 p-5 gap-10">
          <div className="flex-1">
            <h2 className="text-xl font-bold uppercase mb-4">
              1. Lorem, ipsum dolor.
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reiciendis hic architecto minima tempora voluptatum quaerat ullam
              sint corrupti vel dicta natus veniam voluptas a deserunt
              laboriosam laborum ipsam, voluptate sapiente.
            </p>
          </div>
          <div className="flex-2">
            <h2 className="text-xl font-bold uppercase mb-4">
              2. Lorem, ipsum dolor.
            </h2>
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1">
                <h3 className="font-medium mb-2 text-lg">
                  2.1 Lorem, ipsum dolor.
                </h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Explicabo expedita quasi quod temporibus sed alias
                  consequuntur quae voluptas veniam nisi. Cupiditate,
                  aspernatur? Velit iusto debitis quasi perferendis aliquam sunt
                  eos!
                </p>
              </div>
              <div className="flex-1">
                <h3 className="font-medium mb-2 text-lg">
                  2.2 Lorem, ipsum dolor.
                </h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Explicabo expedita quasi quod temporibus sed alias
                  consequuntur quae voluptas veniam nisi. Cupiditate,
                  aspernatur? Velit iusto debitis quasi perferendis aliquam sunt
                  eos!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
          <div className="box p-5 shadow-xl text-center rounded transition hover:translate-y-2">
            <h3 className="font-medium text-lg mb-1">
              Lorem ipsum dolor sit amet.
            </h3>
            <p className="text-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe,
              quam incidunt id in rerum aperiam. Incidunt ducimus officiis sint
              suscipit iure ea deleniti, ad neque veniam dolores ex, tenetur
              quia.
            </p>
            <button className="bg-black px-4 shadow py-2  mt-3 text-white text-sm active:scale-95 hover:translate-y-1 hover:shadow-none transition">
              Click here{" "}
            </button>
          </div>
          <div className="box p-5 shadow-xl text-center rounded transition hover:translate-y-2">
            <h3 className="font-medium text-lg mb-1">
              Lorem ipsum dolor sit amet.
            </h3>
            <p className="text-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe,
              quam incidunt id in rerum aperiam. Incidunt ducimus officiis sint
              suscipit iure ea deleniti, ad neque veniam dolores ex, tenetur
              quia.
            </p>
            <button className="bg-black px-4 shadow py-2  mt-3 text-white text-sm active:scale-95 hover:translate-y-1 hover:shadow-none transition">
              Click here{" "}
            </button>
          </div>
          <div className="box p-5 shadow-xl text-center rounded transition hover:translate-y-2">
            <h3 className="font-medium text-lg mb-1">
              Lorem ipsum dolor sit amet.
            </h3>
            <p className="text-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe,
              quam incidunt id in rerum aperiam. Incidunt ducimus officiis sint
              suscipit iure ea deleniti, ad neque veniam dolores ex, tenetur
              quia.
            </p>
            <button className="bg-black px-4 shadow py-2  mt-3 text-white text-sm active:scale-95 hover:translate-y-1 hover:shadow-none transition">
              Click here{" "}
            </button>
          </div>
          <div className="box p-5 shadow-xl text-center rounded transition hover:translate-y-2">
            <h3 className="font-medium text-lg mb-1">
              Lorem ipsum dolor sit amet.
            </h3>
            <p className="text-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe,
              quam incidunt id in rerum aperiam. Incidunt ducimus officiis sint
              suscipit iure ea deleniti, ad neque veniam dolores ex, tenetur
              quia.
            </p>
            <button className="bg-black px-4 shadow py-2  mt-3 text-white text-sm active:scale-95 hover:translate-y-1 hover:shadow-none transition">
              Click here{" "}
            </button>
          </div>
          <div className="box p-5 shadow-xl text-center rounded transition hover:translate-y-2">
            <h3 className="font-medium text-lg mb-1">
              Lorem ipsum dolor sit amet.
            </h3>
            <p className="text-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe,
              quam incidunt id in rerum aperiam. Incidunt ducimus officiis sint
              suscipit iure ea deleniti, ad neque veniam dolores ex, tenetur
              quia.
            </p>
            <button className="bg-black px-4 shadow py-2  mt-3 text-white text-sm active:scale-95 hover:translate-y-1 hover:shadow-none transition">
              Click here{" "}
            </button>
          </div>
          <div className="box p-5 shadow-xl text-center rounded transition hover:translate-y-2">
            <h3 className="font-medium text-lg mb-1">
              Lorem ipsum dolor sit amet.
            </h3>
            <p className="text-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe,
              quam incidunt id in rerum aperiam. Incidunt ducimus officiis sint
              suscipit iure ea deleniti, ad neque veniam dolores ex, tenetur
              quia.
            </p>
            <button className="bg-black px-4 shadow py-2  mt-3 text-white text-sm active:scale-95 hover:translate-y-1 hover:shadow-none transition">
              Click here{" "}
            </button>
          </div>
          <div className="box p-5 shadow-xl text-center rounded transition hover:translate-y-2">
            <h3 className="font-medium text-lg mb-1">
              Lorem ipsum dolor sit amet.
            </h3>
            <p className="text-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe,
              quam incidunt id in rerum aperiam. Incidunt ducimus officiis sint
              suscipit iure ea deleniti, ad neque veniam dolores ex, tenetur
              quia.
            </p>
            <button className="bg-black px-4 shadow py-2  mt-3 text-white text-sm active:scale-95 hover:translate-y-1 hover:shadow-none transition">
              Click here{" "}
            </button>
          </div>
          <div className="box p-5 shadow-xl text-center rounded transition hover:translate-y-2">
            <h3 className="font-medium text-lg mb-1">
              Lorem ipsum dolor sit amet.
            </h3>
            <p className="text-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe,
              quam incidunt id in rerum aperiam. Incidunt ducimus officiis sint
              suscipit iure ea deleniti, ad neque veniam dolores ex, tenetur
              quia.
            </p>
            <button className="bg-black px-4 shadow py-2  mt-3 text-white text-sm active:scale-95 hover:translate-y-1 hover:shadow-none transition">
              Click here{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
