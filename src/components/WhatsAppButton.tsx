import { MessageCircle } from "lucide-react";

const WA_LINK = "https://wa.me/6281249476778?text=Halo%20admin%20El%20Massa%2C%20saya%20ingin%20bertanya%20tentang%20program%20umrah.";

const WhatsAppButton = () => {
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      className="fixed z-50 rounded-full flex items-center justify-center text-primary-foreground transition-all hover:scale-110 active:scale-95 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
      style={{
        bottom: "max(1.25rem, env(safe-area-inset-bottom, 1.25rem))",
        right: "1rem",
        background: "linear-gradient(135deg, #25D366, #128C7E)",
        boxShadow: "0 4px 20px -2px rgba(37, 211, 102, 0.5)",
      }}
    >
      <MessageCircle size={22} fill="currentColor" className="sm:w-6 sm:h-6 md:w-7 md:h-7" />
    </a>
  );
};

export default WhatsAppButton;
