export interface Blog {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  image_url?: string;
  video_url?: string;
  tags?: string[];
  created_at: string;
}

export const blogs: Blog[] = [
       {
          id: 1,
          title: 'Building a Modern Portfolio with React & Tailwind',
          content:
            `Building a portfolio isn’t just about showing code — it’s about storytelling. Each section should reveal your process, mindset, and craft. A good portfolio doesn’t simply display what you’ve built — it communicates why you built it, how you approached it, and what makes it meaningful.

When I began designing mine, I wanted it to feel both personal and professional — something that speaks to creativity and precision at the same time. I started by defining a clean, minimal structure that could adapt to any content or theme. React made this easy with its component-based approach, allowing me to break every part of the site into modular, reusable pieces. Tailwind CSS took care of the styling, giving me speed and flexibility to experiment without getting lost in endless CSS files.

But design is only half the story. The real magic lies in interactivity — the way elements move, respond, and breathe as you navigate. I wanted subtle motion that feels natural, not distracting. Framer Motion was the perfect tool for this. From smooth fades and slides to micro-animations triggered by scroll or hover, every interaction was crafted to enhance the experience, not overwhelm it. I even created custom React hooks to track scroll direction, letting components respond dynamically as users explore the page.

Performance was another top priority. It’s easy for a visually rich website to slow down, but I optimized asset loading, reduced re-renders, and ensured that the site feels instant on both desktop and mobile. Lazy-loading images, leveraging modern browser caching, and minimizing bundle size all made a difference.

Then came dark mode — not as an afterthought, but as a key design choice. By building theme-aware components from the start, I ensured smooth transitions between light and dark without breaking contrast or readability. This not only improved accessibility but made the entire experience more immersive.

The portfolio also adapts to different devices seamlessly. I tested it across multiple screen sizes to ensure typography, layout, and motion all feel consistent. Whether viewed on a phone or a 4K monitor, it maintains balance and clarity.

Lastly, I integrated storytelling elements — sections that describe my process, not just the result. I added background animations that subtly react to scroll, dynamic project filters, and a contact form that feels alive when submitted. Every detail was designed to leave a small emotional imprint.

In the end, this portfolio became more than a collection of projects — it became a digital reflection of who I am as a developer and designer. It represents growth, precision, and the pursuit of meaningful simplicity. Every pixel and line of code tells part of that story, and that’s what makes it truly mine.`,
          excerpt:
            'How to design and build a modern, responsive portfolio with React & Tailwind CSS.',
          image_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
          tags: ['React', 'Tailwind', 'Design'],
          created_at: '2025-10-10T00:00:00Z',
        },
        {
          id: 2,
          title: 'Why Animations Matter in Web Design',
          content: `
Animations breathe life into user interfaces. They create continuity, guide focus, and make interactions feel intuitive. Without them, even the most beautifully designed layouts can feel flat and disconnected — like a stage without movement. Motion gives rhythm to design; it helps users understand what’s happening, where to look, and what to do next.

Good animations aren’t flashy — they’re purposeful. A button that subtly scales on hover communicates interactivity. A smooth fade-in helps establish visual hierarchy, guiding the eye naturally through the page. The best animations are often the ones users don’t consciously notice — they simply feel right.

When I began exploring motion design, I realized how much it impacts user perception. A simple transition can turn a static component into something that feels responsive and alive. For instance, when navigating between pages, a fade-through transition can make the change feel fluid rather than abrupt. Small details like these add polish, making the experience more cohesive and immersive.

In my own projects, I use animation as a storytelling tool. Every movement has intent — whether it’s highlighting a new section, confirming an action, or gently drawing attention to an important element. Libraries like Framer Motion make it easy to implement such animations while maintaining performance. Its declarative syntax integrates beautifully with React components, allowing for expressive yet maintainable motion.

But balance is key. Too much animation can overwhelm, while too little can make the interface feel lifeless. The trick is to find harmony between motion and stillness — to use animation in service of clarity, not distraction. Timing, easing, and delay all play subtle roles in shaping how users feel when they interact.

When done right, animations bridge the gap between static design and emotional experience. They make users feel connected to the interface, transforming interaction into engagement. A thoughtfully animated interface doesn’t just look good — it feels good. It responds, reacts, and resonates. In the end, animation isn’t decoration; it’s communication in motion.`,
          image_url: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800',
          tags: ['UI/UX', 'Animation'],
          created_at: '2025-08-01T00:00:00Z',
        },
        {
          id: 3,
          title: 'From Idea to Code: My Development Workflow',
          content:  `
My workflow begins long before the first line of code — it starts with ideation. A blank notebook, a few scattered sketches, and a clear sense of purpose. This stage is where vision takes its first breath. I outline not just what I want to build, but why. What problem does it solve? Who will use it? What should the experience feel like? Before diving into pixels or components, I define the user flow, technical scope, and the emotional tone of the project.

Once the idea feels grounded, I transition into design mode — usually in Figma or Penpot. This is where structure begins to emerge. I experiment with layouts, spacing, and visual rhythm, focusing on how content and interaction guide the user’s eye. Wireframes become interactive prototypes, allowing me to refine navigation, readability, and balance before touching a single line of CSS. It’s a stage of exploration — deliberate, but flexible.

Then comes the development phase — and this is where the project starts to feel alive. My GitHub workflow is intentionally organized: one branch for features, one for styling, another for experimental ideas. Each branch has a story, each commit has purpose. I use this modular approach to stay creative without losing structure, ensuring that every idea has space to evolve while the core remains stable.

Documentation is integral to this rhythm. I write notes, comment code, and record decisions so that each step remains transparent — both for collaborators and for my future self. This ongoing reflection not only improves clarity but reinforces intentional craftsmanship in every line of code.

Finally, deployment is the moment of transformation — pushing to Netlify or Vercel turns thought into reality. Watching the live site load for the first time never loses its spark. It’s a culmination of creativity, discipline, and curiosity — the loop closing from concept to execution.

For me, this process isn’t just workflow; it’s a creative ritual. It balances structure with spontaneity, precision with play. From that first sketch in the notebook to the final URL shared with the world, it’s a journey that reminds me that building is not only technical — it’s deeply human.`,
          image_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
          tags: ['Workflow', 'Development'],
          created_at: '2025-07-15T00:00:00Z',
        },
]