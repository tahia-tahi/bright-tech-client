import { Facebook, Twitter, Github, Linkedin } from "lucide-react";
import Logo from "../shared/Logo"
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Top section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-gray-400 leading-relaxed">
              A modern blogging platform where ideas are shared,
              discussions grow, and communities connect.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-white font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white transition cursor-pointer">Home</li>
              <li className="hover:text-white transition cursor-pointer">All Posts</li>
              <li className="hover:text-white transition cursor-pointer">About</li>
              <li className="hover:text-white transition cursor-pointer">Pricing</li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white transition cursor-pointer">Help Center</li>
              <li className="hover:text-white transition cursor-pointer">Community</li>
              <li className="hover:text-white transition cursor-pointer">Guidelines</li>
              <li className="hover:text-white transition cursor-pointer">Privacy Policy</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a className="hover:text-white transition cursor-pointer">
                <Facebook size={20} />
              </a>
              <a className="hover:text-white transition cursor-pointer">
                <Twitter size={20} />
              </a>
              <a className="hover:text-white transition cursor-pointer">
                <Github size={20} />
              </a>
              <a className="hover:text-white transition cursor-pointer">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-400">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} BrightTech Blog. All rights reserved.
          </p>
          <p className="text-center sm:text-right">
            Built with ❤️ by BrightTech
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
