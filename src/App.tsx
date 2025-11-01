// App.tsx
import { Routes, Route } from "react-router-dom";
import {Layout} from "./components/Layout";

import { Hero } from "./components/Hero";
import { Contact } from "./components/Contact";
import About from "./components/About";

import ProjectPage from "./pages/ProjectsPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Routes>
      {/* Home Page */}
      <Route
        path="/"
        element={
          <Layout>
            <Hero />
            <About />
            <Contact />
          </Layout>
        }
      />

      {/* Project List */}
      <Route
        path="/projects"
        element={
          <Layout>
            <ProjectPage />
          </Layout>
        }
      />

      {/* Blog List */}
      <Route
        path="/blogs"
        element={
          <Layout>
            <BlogPage />
          </Layout>
        }
      />

      {/* Blog Details */}
      <Route
        path="/blogs/:id"
        element={
          <Layout>
            <BlogDetailsPage />
          </Layout>
        }
      />

      {/* 404 */}
      <Route
        path="*"
        element={
          <Layout>
            <NotFound />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
