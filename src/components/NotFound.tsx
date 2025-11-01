import { Layout } from "../components/Layout";

export default function NotFound() {
  return (
    <Layout>
       <div className="relative z-10 w-full pt-32 pb-32 flex justify-center items-center">
      <div className="text-center text-white px-4">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-lg opacity-80 mb-6">Oops... this page drifted into deep space</p>

        <a
          href="/"
          className="px-6 py-3 rounded-xl border border-gray-400/50 hover:bg-gray-800/40 transition"
        >
          Return Home 
        </a>
      </div>
    </div>
    </Layout>
  );
}
