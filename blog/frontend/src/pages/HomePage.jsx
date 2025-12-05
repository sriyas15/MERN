import { ArrowRight, PenTool, Users, Newspaper } from "lucide-react";


 const HomePage = ()=>{

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      {/* Hero Section */}
      <section className="hero min-h-[70vh]">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
            alt="Blog Hero"
            className="rounded-2xl shadow-xl max-w-sm object-cover"
          />

          <div>
            <h1 className="text-5xl font-bold leading-tight">
              Share Stories. Inspire Minds.
            </h1>
            <p className="py-6 text-lg opacity-80">
              Join a community of writers & readers. Publish blogs, explore
              ideas, and connect with creative minds.
            </p>
            <a href="/signup" className="btn btn-secondary">
              Get Started <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-base-200">
        <h2 className="text-4xl font-bold text-center mb-12">
          Welcome to My Blog Site
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="card bg-base-100 shadow-xl p-6">
            <PenTool className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Write Freely</h3>
            <p className="opacity-80">
              Express your ideas with a clean and distraction‑free editor.
            </p>
          </div>

          <div className="card bg-base-100 shadow-xl p-6">
            <Users className="w-10 h-10 text-secondary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Build Community</h3>
            <p className="opacity-80">
              Follow authors, engage in discussions, and grow your audience.
            </p>
          </div>

          <div className="card bg-base-100 shadow-xl p-6">
            <Newspaper className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Discover Content</h3>
            <p className="opacity-80">
              Explore trending blogs and topics tailored to your interests.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="text-center py-12">
        <h2 className="text-3xl font-bold mb-4">Ready to start your journey?</h2>
        <p className="opacity-80 mb-6">Create your account & publish your first blog today.</p>
        <a href="/signup" className="btn btn-primary btn-lg">Join Now</a>
      </footer>
    </div>
  );
}

export default HomePage;