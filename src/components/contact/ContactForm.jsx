import FormGroup from "./FormGroup";
import emailjs from "@emailjs/browser";
import Alert from "react-bootstrap/Alert";
import { useEffect, useRef, useState } from "react";

const Result = () => {
  return (
    <Alert variant="success" className="success-msg">
      Your message has been successfully sent.
    </Alert>
  );
};

const ContactForm = () => {
  const form = useRef();
  const [result, showResult] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_8tg2gsa",
        "template_zmxkd45",
        form.current,
        "QYncFYwURx7oPBVab"
      )
      .then(
        () => showResult(true),
        () => showResult(false)
      );

    form.current.reset();
  };

  useEffect(() => {
    if (!result) return;
    const timer = setTimeout(() => showResult(false), 2000);
    return () => clearTimeout(timer);
  }, [result]);

  return (
    <div className="axil-contact-form-block m-b-xs-30 contact-form-card">
      <div className="section-title d-block">
        <h2 className="h3 axil-title m-b-xs-20">Send Us a Message</h2>
        <p className="contact-form-note">
          Your email address will not be published. All fields are required.
        </p>
      </div>
      <div className="axil-contact-form-wrapper p-t-xs-10">
        <form className="axil-contact-form row no-gutters" ref={form} onSubmit={sendEmail}>
          <FormGroup
            pClass="col-12"
            type="text"
            name="contact-name"
            placeholder="Enter your full name"
          />
          <FormGroup
            pClass="col-12"
            type="text"
            name="contact-phone"
            placeholder="Enter your phone number"
          />
          <FormGroup
            pClass="col-12"
            type="email"
            name="contact-email"
            placeholder="Enter your email address"
          />
          <FormGroup
            pClass="col-12"
            type="textarea"
            name="contact-message"
            placeholder="Enter your message here"
          />
          <div className="col-12">
            <button className="btn btn-primary m-t-xs-0 m-t-lg-20">SUBMIT</button>
          </div>
          <div className="col-12 form-group">{result ? <Result /> : null}</div>
        </form>
      </div>

      <style jsx global>{`
        .contact-form-card {
          background: linear-gradient(180deg, #0d1116 0%, #090c11 100%) !important;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
        }

        .contact-form-card .section-title .axil-title {
          color: #f3f6fa !important;
        }

        .contact-form-card .contact-form-note {
          color: #b9c4cf;
        }

        .contact-form-card .axil-contact-form input,
        .contact-form-card .axil-contact-form textarea,
        .contact-form-card .axil-contact-form .form-control {
          background: #0a0d12 !important;
          color: #eef2f6 !important;
          border: 1px solid rgba(212, 175, 55, 0.5) !important;
          border-radius: 8px;
          padding: 12px 15px;
        }

        .contact-form-card .axil-contact-form input::placeholder,
        .contact-form-card .axil-contact-form textarea::placeholder {
          color: #a3afbc !important;
          opacity: 1 !important;
        }

        .contact-form-card .axil-contact-form input:focus,
        .contact-form-card .axil-contact-form textarea:focus,
        .contact-form-card .axil-contact-form .form-control:focus {
          background: #0a0d12 !important;
          color: #eef2f6 !important;
          border-color: #d4af37 !important;
          box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.2);
          outline: none;
        }

        .contact-form-card .axil-contact-form label {
          color: #e3e8ee !important;
        }
      `}</style>
    </div>
  );
};

export default ContactForm;
