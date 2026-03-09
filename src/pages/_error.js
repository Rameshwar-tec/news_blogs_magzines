import NextErrorComponent from "next/error";
import Link from "next/link";

const CustomError = ({ statusCode }) => {
  const code = statusCode || 500;
  const message =
    code === 404
      ? "The page you are looking for could not be found."
      : "Something went wrong while loading this page.";

  return (
    <div className="error-page">
      <h1>{code}</h1>
      <p>{message}</p>
      <Link href="/" className="error-home-link">
        Go Back Home
      </Link>

      <style jsx>{`
        .error-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 20px;
          background: #070a0e;
          color: #eef3f8;
        }

        h1 {
          margin: 0 0 10px;
          font-size: 4rem;
          line-height: 1;
          color: #d4af37;
        }

        p {
          margin: 0 0 24px;
          font-size: 1.2rem;
          color: #c7d1dd;
        }

        .error-home-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 44px;
          padding: 0 18px;
          border-radius: 999px;
          text-decoration: none;
          background: #d4af37;
          color: #111315;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

CustomError.getInitialProps = async (contextData) => {
  const errorInitialProps = await NextErrorComponent.getInitialProps(contextData);
  return errorInitialProps;
};

export default CustomError;
