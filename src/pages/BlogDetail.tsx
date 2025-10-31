import { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { OrbitSpinner } from "../components/LoadingScreen"; // make sure this path is correct
import { Layout } from "../components/Layout";

interface Blog {
  id: number;
  title: string;
  content: string;
  image_url?: string;
  tags?: string[];
  created_at: string;
}

export default function BlogDetail() {
  const { id } = useParams();
  const location = useLocation();
  const [blog, setBlog] = useState<Blog | null>(location.state?.blog || null);
  const [loading, setLoading] = useState(true);

  // ✅ Local demo data fallback (so refresh works)
  useEffect(() => {
    window.scrollTo(0, 0);

    setTimeout(() => {
      if (!blog && id) {
        const storedBlogs: Blog[] = [
          {
            id: 1,
            title: "Building a Modern Portfolio with React & Tailwind",
            image_url:
              "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200",
            content: `
Building a portfolio isn’t just about showing code — it’s about storytelling. Each section should reveal your process, mindset, and craft. A good portfolio doesn’t simply display what you’ve built — it communicates why you built it, how you approached it, and what makes it meaningful.

When I began designing mine, I wanted it to feel both personal and professional — something that speaks to creativity and precision at the same time. I started by defining a clean, minimal structure that could adapt to any content or theme. React made this easy with its component-based approach, allowing me to break every part of the site into modular, reusable pieces. Tailwind CSS took care of the styling, giving me speed and flexibility to experiment without getting lost in endless CSS files.

But design is only half the story. The real magic lies in interactivity — the way elements move, respond, and breathe as you navigate. I wanted subtle motion that feels natural, not distracting. Framer Motion was the perfect tool for this. From smooth fades and slides to micro-animations triggered by scroll or hover, every interaction was crafted to enhance the experience, not overwhelm it. I even created custom React hooks to track scroll direction, letting components respond dynamically as users explore the page.

Performance was another top priority. It’s easy for a visually rich website to slow down, but I optimized asset loading, reduced re-renders, and ensured that the site feels instant on both desktop and mobile. Lazy-loading images, leveraging modern browser caching, and minimizing bundle size all made a difference.

Then came dark mode — not as an afterthought, but as a key design choice. By building theme-aware components from the start, I ensured smooth transitions between light and dark without breaking contrast or readability. This not only improved accessibility but made the entire experience more immersive.

The portfolio also adapts to different devices seamlessly. I tested it across multiple screen sizes to ensure typography, layout, and motion all feel consistent. Whether viewed on a phone or a 4K monitor, it maintains balance and clarity.

Lastly, I integrated storytelling elements — sections that describe my process, not just the result. I added background animations that subtly react to scroll, dynamic project filters, and a contact form that feels alive when submitted. Every detail was designed to leave a small emotional imprint.

In the end, this portfolio became more than a collection of projects — it became a digital reflection of who I am as a developer and designer. It represents growth, precision, and the pursuit of meaningful simplicity. Every pixel and line of code tells part of that story, and that’s what makes it truly mine.`,
            tags: ["React", "Tailwind", "Portfolio"],
            created_at: "2024-10-10T00:00:00Z",
          },
          {
            id: 2,
            title: "Why Animations Matter in Web Design",
            image_url:
              "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=1200",
            content: `
Animations breathe life into user interfaces. They create continuity, guide focus, and make interactions feel intuitive. Without them, even the most beautifully designed layouts can feel flat and disconnected — like a stage without movement. Motion gives rhythm to design; it helps users understand what’s happening, where to look, and what to do next.

Good animations aren’t flashy — they’re purposeful. A button that subtly scales on hover communicates interactivity. A smooth fade-in helps establish visual hierarchy, guiding the eye naturally through the page. The best animations are often the ones users don’t consciously notice — they simply feel right.

When I began exploring motion design, I realized how much it impacts user perception. A simple transition can turn a static component into something that feels responsive and alive. For instance, when navigating between pages, a fade-through transition can make the change feel fluid rather than abrupt. Small details like these add polish, making the experience more cohesive and immersive.

In my own projects, I use animation as a storytelling tool. Every movement has intent — whether it’s highlighting a new section, confirming an action, or gently drawing attention to an important element. Libraries like Framer Motion make it easy to implement such animations while maintaining performance. Its declarative syntax integrates beautifully with React components, allowing for expressive yet maintainable motion.

But balance is key. Too much animation can overwhelm, while too little can make the interface feel lifeless. The trick is to find harmony between motion and stillness — to use animation in service of clarity, not distraction. Timing, easing, and delay all play subtle roles in shaping how users feel when they interact.

When done right, animations bridge the gap between static design and emotional experience. They make users feel connected to the interface, transforming interaction into engagement. A thoughtfully animated interface doesn’t just look good — it feels good. It responds, reacts, and resonates. In the end, animation isn’t decoration; it’s communication in motion.`,
            tags: ["UI/UX", "Animation", "Motion"],
            created_at: "2024-08-01T00:00:00Z",
          },
          {
            id: 3,
            title: "From Idea to Code: My Development Workflow",
            image_url:
              "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200",
            content: `
My workflow begins long before the first line of code — it starts with ideation. A blank notebook, a few scattered sketches, and a clear sense of purpose. This stage is where vision takes its first breath. I outline not just what I want to build, but why. What problem does it solve? Who will use it? What should the experience feel like? Before diving into pixels or components, I define the user flow, technical scope, and the emotional tone of the project.

Once the idea feels grounded, I transition into design mode — usually in Figma or Penpot. This is where structure begins to emerge. I experiment with layouts, spacing, and visual rhythm, focusing on how content and interaction guide the user’s eye. Wireframes become interactive prototypes, allowing me to refine navigation, readability, and balance before touching a single line of CSS. It’s a stage of exploration — deliberate, but flexible.

Then comes the development phase — and this is where the project starts to feel alive. My GitHub workflow is intentionally organized: one branch for features, one for styling, another for experimental ideas. Each branch has a story, each commit has purpose. I use this modular approach to stay creative without losing structure, ensuring that every idea has space to evolve while the core remains stable.

Documentation is integral to this rhythm. I write notes, comment code, and record decisions so that each step remains transparent — both for collaborators and for my future self. This ongoing reflection not only improves clarity but reinforces intentional craftsmanship in every line of code.

Finally, deployment is the moment of transformation — pushing to Netlify or Vercel turns thought into reality. Watching the live site load for the first time never loses its spark. It’s a culmination of creativity, discipline, and curiosity — the loop closing from concept to execution.

For me, this process isn’t just workflow; it’s a creative ritual. It balances structure with spontaneity, precision with play. From that first sketch in the notebook to the final URL shared with the world, it’s a journey that reminds me that building is not only technical — it’s deeply human.`,
            tags: ["Workflow", "Development", "Process"],
            created_at: "2025-07-15T00:00:00Z",
          },
        ];

        const foundBlog = storedBlogs.find((b) => b.id === Number(id));
        setBlog(foundBlog || null);
      }

      setLoading(false);
    }, 800);
  }, [id, blog]);

  if (loading) {
    return (
      <Layout>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-transparent">
        <OrbitSpinner />
      </div>
      </Layout>
    );
  }

  if (!blog) {
    return (
      <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-300 bg-transparent relative z-10">
        <h1 className="text-3xl font-bold mb-4">Blog not found</h1>
        <Link to="/" className="text-violet-400 hover:underline">
          Back Home
        </Link>
      </div>
      </Layout>
    );
  }

  return (
    <Layout>
    <div className="relative min-h-screen px-6 py-20 max-w-4xl mx-auto text-gray-300 bg-transparent z-10">
      <Link
        to="/blog"
         className="fixed top-24 left-6 bg-violet-600 hover:bg-violet-700 text-white hover:text-violet-300 px-4 py-2 rounded-lg shadow-lg z-50 transition-colors backdrop-blur-sm"
      >
        ← Back to Blogs
      </Link>

      <h1 className="text-4xl mt-[80px] font-bold mb-4 text-white leading-tight">
        {blog.title}
      </h1>
      <p className="text-gray-400 mb-8">
        {new Date(blog.created_at).toLocaleDateString()}
      </p>

      {blog.image_url && (
        <div className="relative overflow-hidden rounded-2xl mb-10 shadow-lg">
          <img
            src={blog.image_url}
            alt={blog.title}
            className="w-full h-[450px] object-cover transform hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      )}

      <article className="prose prose-lg prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
        {blog.content
          ? blog.content
              .split(/\n{1,2}/)
              .map((para, i) => (
                <p key={i} className="text-gray-300">
                  {para.trim()}
                </p>
              ))
          : <p>No content available for this blog.</p>}
      </article>

      {blog.tags && (
        <div className="mt-10 flex flex-wrap gap-3">
          {blog.tags.map((tag, i) => (
            <span
              key={i}
              className="px-4 py-1 bg-violet-600/20 text-violet-400 rounded-full text-sm border border-violet-600/30"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
    </Layout>
  );
}
