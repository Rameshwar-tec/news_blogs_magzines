import { useState } from "react";

const WidgetNewsletter = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!emailAddress) {
      setSubmitMessage("Please enter a valid email.");
      setTimeout(() => setSubmitMessage(""), 5000);
      return;
    }

    try {
      setLoading(true);
      setSubmitMessage("");

      const response = await fetch(
        "http://localhost:5000/api/newsletter/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email: emailAddress })
        }
      );

      const data = await response.json();

      setSubmitMessage(data.message || "Subscribed");
      setEmailAddress("");

      setTimeout(() => setSubmitMessage(""), 5000);
    } catch (error) {
      setSubmitMessage("Something went wrong. Try again.");
      setTimeout(() => setSubmitMessage(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="newsletter-widget weekly-newsletter"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-vector/grunge-background-with-ornamental-decoration_1048-2557.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        border: "1px solid rgba(240, 188, 52, 0.34)",
        borderRadius: "15px",
        padding: "2rem",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(240, 188, 52, 0.12) 0%, rgba(58, 42, 13, 0.14) 52%, rgba(255, 248, 235, 0.03) 100%)",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1
        }}
      ></div>

      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "5%",
          width: "80px",
          height: "80px",
          background:
            "radial-gradient(circle, rgba(174, 134, 37, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "float 6s ease-in-out infinite",
          zIndex: 1
        }}
      ></div>

      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: "5%",
          width: "60px",
          height: "60px",
          background:
            "radial-gradient(circle, rgba(174, 134, 37, 0.08) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "float 8s ease-in-out infinite reverse",
          zIndex: 1
        }}
      ></div>

      <div className="newsletter-content" style={{ position: "relative", zIndex: 2 }}>
        <div
          className="newsletter-icon"
          style={{
            background: "linear-gradient(45deg, #ae8625, #f4d03f)",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem",
            boxShadow: "0 4px 15px rgba(174, 134, 37, 0.3)",
            animation: "pulse 2s ease-in-out infinite"
          }}
        >
          <i className="feather icon-send" style={{ color: "#3f2c0d", fontSize: "var(--type-h5)" }} />
        </div>

        <div
          className="section-title"
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <h3
            className="axil-title"
            style={{
              color: "#ffffff",
              fontSize: "var(--type-h3)",
              fontFamily: "var(--primary-font)",
              fontWeight: "700",
              marginBottom: "1rem",
              textShadow: "none",
              display: "inline-block",
              background: "rgba(32, 22, 6, 0.58)",
              padding: "0.35rem 0.8rem",
              borderRadius: "10px"
            }}
          >
            Subscribe To Our Weekly Newsletter
          </h3>
          <p
            className="mid"
            style={{
              color: "#ffffff",
              fontSize: "var(--type-small)",
              fontFamily: "var(--secondary-font)",
              lineHeight: "1.6",
              margin: 0,
              display: "block",
              background: "rgba(32, 22, 6, 0.48)",
              padding: "0.35rem 0.8rem",
              borderRadius: "10px",
              textAlign: "center",
              maxWidth: "100%",
              letterSpacing: "0.02em"
            }}
          >
            No spam, notifications only about new magazines, updates.
          </p>
        </div>

        <div className="subscription-form-wrapper">
          <form className="subscription-form" onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: "1.5rem" }}>
              <input
                type="email"
                placeholder="Enter Email Address"
                required
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                style={{
                  width: "100%",
                  padding: "1rem 1.5rem",
                  background: "rgba(255, 248, 235, 0.14)",
                  border: "2px solid rgba(240, 188, 52, 0.3)",
                  borderRadius: "50px",
                  color: "#fffdf7",
                  fontSize: "var(--type-small)",
                  fontFamily: "var(--secondary-font)",
                  textAlign: "center",
                  letterSpacing: "0.02em",
                  outline: "none",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(10px)"
                }}
              />
            </div>

            <div style={{ textAlign: "center" }}>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{
                  background: "linear-gradient(45deg, #e6b13a, #f3cd68)",
                  border: "none",
                  padding: "1rem 2.5rem",
                  borderRadius: "50px",
                  color: "#ffffff",
                  fontSize: "var(--type-small)",
                  fontFamily: "var(--secondary-font)",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.7 : 1,
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(174, 134, 37, 0.3)",
                  minWidth: "150px"
                }}
                >
                  <i className="feather icon-send" style={{ marginRight: "0.5rem", fontSize: "var(--type-small)" }}></i>
                  {loading ? "SUBSCRIBING..." : "SUBSCRIBE"}
                </button>

              {submitMessage && (
                <div
                  role="status"
                  aria-live="polite"
                  style={{
                    marginTop: "0.75rem",
                    color:
                      submitMessage.toLowerCase().includes("success") ||
                      submitMessage.toLowerCase().includes("subscribed")
                        ? "#2e7d32"
                        : "#b42318",
                    fontWeight: 600,
                    fontSize: "var(--type-body)",
                    fontFamily: "var(--secondary-font)"
                  }}
                >
                  {submitMessage}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
      <style jsx>{`
        .newsletter-widget {
          font-family: var(--secondary-font);
        }

        .newsletter-widget,
        .newsletter-widget .axil-title,
        .newsletter-widget .mid,
        .newsletter-widget p,
        .newsletter-widget span,
        .newsletter-widget label,
        .newsletter-widget button,
        .newsletter-widget .btn,
        .newsletter-widget .btn-primary,
        .newsletter-widget input {
          color: #ffffff !important;
        }

        .newsletter-widget input::placeholder {
          color: rgba(255, 253, 247, 0.82);
          letter-spacing: 0.02em;
          text-align: center;
        }

        .newsletter-widget input:focus {
          border-color: rgba(243, 205, 104, 0.6) !important;
          box-shadow: 0 0 0 3px rgba(243, 205, 104, 0.14);
        }
      `}</style>
    </div>
  );
};

export default WidgetNewsletter;
