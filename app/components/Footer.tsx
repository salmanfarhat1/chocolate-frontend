"use client";
import Image from "next/image";

export default function Footer() {
  return (
    <footer id="footer" style={{ background: "linear-gradient(to bottom, #48260D, #1e0d0b)", color: "#c8a97e"}}>
      <div style={{ height: "2px", background: "linear-gradient(to right, transparent, #c8a97e, transparent)" }} />

      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px 16px 32px",
        fontFamily: "'Georgia', 'Times New Roman', serif"
      }}>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "48px",
          marginBottom: "56px"
        }}>

          {/* Brand column */}
          <div>
            <div style={{ marginBottom: "16px" }}>
              <span style={{
                fontSize: "22px",
                fontWeight: "700",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontFamily: "'Georgia', serif"
              }}>
                Salman Farhat
              </span>
              <div style={{
                fontSize: "11px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                marginTop: "4px"
              }}>
                Artisan Chocolatier
              </div>
            </div>
            <p style={{
              fontSize: "14px",
              lineHeight: "1.8",
              maxWidth: "260px",
              margin: "0 0 24px"
            }}>
            Hey, it's me doing artisinal chocolate based on you customized choices. 
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
            {[
              { platform: "Instagram", href: "https://www.instagram.com/salmanfarhat_/", icon: "📷" },
              { platform: "YouTube",   href: "https://www.youtube.com/@Salman_in_The_Mold", icon: "▶️" },
            ].map(({ platform, href, icon }) => (
              <a key={platform} href={href} title={platform} target="_blank" rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 14px",
                  border: "1px solid #5a3528",
                  borderRadius: "20px",
                  fontSize: "13px",
                  fontWeight: "600",
                  textDecoration: "none",
                  fontFamily: "sans-serif",
                  color: "#c8a97e",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "#c8a97e"; e.currentTarget.style.color = "#1e0d0b"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#c8a97e"; }}
              >
                <span>{icon}</span>
                <span>{platform}</span>
              </a>
            ))}
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "sans-serif", fontWeight: "600", margin: "0 0 20px" }}>
              Collections
            </h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {["Ready-Made Collections", "Customize yours"].map(item => (
                <li key={item} style={{ marginBottom: "12px" }}>
                  <a href="#" style={{ color: "#9a7060", fontSize: "14px", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#f5e6d3"}
                    onMouseLeave={e => e.currentTarget.style.color = "#9a7060"}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Atelier */}
          <div>
            <h4 style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c8a97e", fontFamily: "sans-serif", fontWeight: "600", margin: "0 0 20px" }}>
              Atelier
            </h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {["My Story", "Courses"].map(item => (
                <li key={item} style={{ marginBottom: "12px" }}>
                  <a href="#" style={{ color: "#9a7060", fontSize: "14px", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#f5e6d3"}
                    onMouseLeave={e => e.currentTarget.style.color = "#9a7060"}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c8a97e", fontFamily: "sans-serif", fontWeight: "600", margin: "0 0 20px" }}>
              Visit Us
            </h4>
            <address style={{ fontStyle: "normal", color: "#9a7060", fontSize: "14px", lineHeight: "2" }}>
              <div>20 rue du 14 juillet</div>
              <div>Lille, France</div>
             
              <div>
                <a href="mailto:salmanfarhat098@gmail.com" style={{ color: "#9a7060", textDecoration: "none", fontSize: "13px" }}>chocolate@salman.com</a>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid #3a1f1a",
          paddingTop: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px", 
          color: "#c8a97e"
        }}>
          <p style={{ fontSize: "12px", margin: 0, fontFamily: "sans-serif", letterSpacing: "0.05em" }}>
            © {new Date().getFullYear()} Salman Farhat — Artisan Chocolatier. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            {["Privacy Policy", "Terms of Service", "Shipping"].map(link => (
              <a key={link} href="#" style={{ fontSize: "12px", textDecoration: "none", fontFamily: "sans-serif", letterSpacing: "0.05em", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#9a7060"}
                onMouseLeave={e => e.currentTarget.style.color = "#5a3528"}>
                {link}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}