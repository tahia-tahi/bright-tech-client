import { UserPlus, FileText, ThumbsUp, Share2 } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Create an Account",
    desc: "Sign up or log in to start sharing your thoughts with the community.",
    icon: <UserPlus className="w-8 h-8 text-primary" />,
  },
  {
    id: 2,
    title: "Write Your Post",
    desc: "Create blog posts with images and meaningful content.",
    icon: <FileText className="w-8 h-8 text-primary" />,
  },
  {
    id: 3,
    title: "Like & Comment",
    desc: "Engage with posts by liking and commenting like social media.",
    icon: <ThumbsUp className="w-8 h-8 text-primary" />,
  },
  {
    id: 4,
    title: "Read & Share",
    desc: "Explore posts from others and share valuable ideas.",
    icon: <Share2 className="w-8 h-8 text-primary" />,
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            How It Works
          </h2>
          <p className="text-gray-500 mt-3">
            Start blogging in just a few simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-center"
            >
              <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-primary/10">
                {step.icon}
              </div>

              <h3 className="text-lg font-semibold text-gray-800">
                {step.title}
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;
