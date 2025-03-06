import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Our Home Page</h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
          culpa amet sapiente fugit cum labore quasi ex! Reprehenderit obcaecati
          dolorum voluptatem iste ut? Dolorem dicta ullam culpa sapiente, in maiores.
        </p>
        <a href="/login" className="mt-6 inline-block bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
          Go to Login
        </a>
      </div>
    </div>
  );
}