import FormGroup from "../../../contact/FormGroup";

const PostComment = () => {

  return (
    <div className="post-comment-area">
      <style jsx global>{`
        .post-comment-area .comment-box h2 {
          color: #f1f5fa !important;
          font-size: clamp(2.2rem, 3vw, 3rem);
          margin-bottom: 0.5rem;
        }

        .post-comment-area .comment-box p {
          color: #b9c5d2 !important;
          font-size: 1.5rem;
          line-height: 2.4rem;
        }

        .comment-form input[type="text"],
        .comment-form input[type="email"],
        .comment-form textarea {
          color: #ffffff !important;
          background: #0a0d12 !important;
          border-color: rgba(212, 175, 55, 0.75) !important;
          border-width: 1px !important;
        }
        .comment-form input[type="text"]::placeholder,
        .comment-form input[type="email"]::placeholder,
        .comment-form textarea::placeholder {
          color: #999999 !important;
          opacity: 1 !important;
        }
        .comment-form input[type="text"]:focus,
        .comment-form input[type="email"]:focus,
        .comment-form textarea:focus {
          color: #ffffff !important;
          background: #0a0d12 !important;
          border-color: #D4AF37 !important;
          box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.2) !important;
        }
        .comment-form .form-group label {
          color: #ffffff !important;
          background: transparent !important;
        }
        .comment-form .form-group:not(.focused) label {
          opacity: 0 !important;
          pointer-events: none !important;
          z-index: -1 !important;
        }
        .comment-form .form-group.focused label {
          background: #0a0d12 !important;
          color: #D4AF37 !important;
          opacity: 1 !important;
          z-index: 10 !important;
        }
        .comment-form .form-group.focused input::placeholder,
        .comment-form .form-group.focused textarea::placeholder {
          opacity: 0 !important;
          color: transparent !important;
        }

        .post-comment-area .comment-form .btn.btn-primary {
          min-width: 170px;
        }
      `}</style>
      <div className="comment-box">
        <h2>Leave A Reply</h2>
        <p>
          Your email address will not be published.
          <span className="primary-color">*</span>
        </p>
      </div>
      {/* End of .comment-box */}
      <form action="#" className="comment-form row m-b-xs-60">
        <div className="col-12">
          <FormGroup pClass="comment-message-field" label="Comment" type="textarea" name="comment-message" rows={6} placeholder="Enter comment" />
        </div>
        <div className="col-md-4">
			<FormGroup type="text" name="name" label="Name" placeholder="Enter name" />
        </div>
        <div className="col-md-4">
			<FormGroup type="text" name="email" label="Email" placeholder="Enter email" />
        </div>
        <div className="col-md-4">
		<FormGroup type="text" name="website" label="Website" placeholder="Enter website" />
        </div>
        <div className="col-12">
          <button className="btn btn-primary">POST COMMENT</button>
        </div>
      </form>
    </div>
  );
};

export default PostComment;
