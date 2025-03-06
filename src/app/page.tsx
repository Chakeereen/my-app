import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Our Home Page</h1>
      <p className="text-gray-600 text-lg leading-relaxed">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
        culpa amet sapiente fugit cum labore quasi ex! Reprehenderit obcaecati
        dolorum voluptatem iste ut? Dolorem dicta ullam culpa sapiente, in maiores.
      </p>
    </div>
  </div>
  );
}