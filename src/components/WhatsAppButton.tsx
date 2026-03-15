import { MessageCircle } from "lucide-react";

const WA_LINK = "https://wa.me/6281234567890?text=Halo%20admin%20El%20Massa%2C%20saya%20ingin%20bertanya%20tentang%20program%20umrah.";

const WhatsAppButton = () => {
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-primary-foreground transition-all hover:scale-110 hover:shadow-lg"
      style={{
        background: "linear-gradient(135deg, #25D366, #128C7E)",
        boxShadow: "0 4px 20px -2px rgba(37, 211, 102, 0.5)",
      }}
    >
      <MessageCircle size={28} fill="currentColor" />
    </a>
  );
};

export default WhatsAppButton;
