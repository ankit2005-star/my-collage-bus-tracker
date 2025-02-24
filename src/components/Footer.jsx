const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 w-screen">
      <div className="text-center">
        <p className="text-sm">© 2025 Bus Tracker. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <a href="/terms" className="text-white hover:text-gray-300">
            Terms of Service
          </a>
          <a href="/privacy" className="text-white hover:text-gray-300">
            Privacy Policy
          </a>
          <a href="/contact" className="text-white hover:text-gray-300">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
