export default function getCookieName() {
    let cookieName = "";
  
    if (process.env.NODE_ENV === "development") {
      cookieName = "next-auth.session-token";
    }
  
    if (process.env.NODE_ENV === "production") {
      cookieName = "__Secure-next-auth.session-token";
    }
  
    return cookieName;
  };