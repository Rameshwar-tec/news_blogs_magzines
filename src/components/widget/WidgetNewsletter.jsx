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
      className="newsletter-widget weekly-newsletter m-b-xs-40"
      style={{
        background:
          "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2a2a2a 100%)",
        border: "1px solid rgba(174, 134, 37, 0.2)",
        borderRadius: "15px",
        padding: "2rem",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(174, 134, 37, 0.1) 0%, rgba(0, 0, 0, 0.8) 50%, rgba(174, 134, 37, 0.05) 100%)",
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
          <i className="feather icon-send" style={{ color: "#000", fontSize: "1.5rem" }} />
        </div>

        <div className="section-title" style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h3
            className="axil-title"
            style={{
              color: "#ffffff",
              fontSize: "1.8rem",
              fontWeight: "700",
              marginBottom: "1rem",
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)"
            }}
          >
            Subscribe To Our Weekly Newsletter
          </h3>
          <p
            className="mid"
            style={{
              color: "#cccccc",
              fontSize: "1rem",
              lineHeight: "1.6",
              margin: 0
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
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "2px solid rgba(174, 134, 37, 0.3)",
                  borderRadius: "50px",
                  color: "#ffffff",
                  fontSize: "1rem",
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
                  background: "linear-gradient(45deg, #ae8625, #f4d03f)",
                  border: "none",
                  padding: "1rem 2.5rem",
                  borderRadius: "50px",
                  color: "#000",
                  fontSize: "1rem",
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
                <i className="feather icon-send" style={{ marginRight: "0.5rem" }}></i>
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
                        ? "#7CFC00"
                        : "#ff6b6b",
                    fontWeight: 600
                  }}
                >
                  {submitMessage}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WidgetNewsletter;
