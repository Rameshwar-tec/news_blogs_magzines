import WidgetNewsletter from "./WidgetNewsletter";
import WidgetCategory from "./WidgetCategory";
import WidgetSocialShare from "./WidgetSocialShare";
import WidgetPost from "./WidgetPost";

const SharedSidebarWidgets = ({
  className = "",
  animate = false,
  isVisible = false,
}) => {
  const sections = [
    {
      key: "newsletter",
      title: "Subscribe To Our Weekly Newsletter",
      content: <WidgetNewsletter />,
    },
    {
      key: "social-share",
      title: "Social Share",
      content: <WidgetSocialShare />,
    },
    {
      key: "categories",
      title: "Categories",
      content: <WidgetCategory showTitle={true} />,
    },
    // {
    //   key: "web-profile",
    //   title: "Web Profile",
    //   content: <WidgetPost />,
    // },
  ];

  return (
    <div className={className}>
      <div
        className={`shared-sidebar-panel ${animate ? (isVisible ? "animate-in" : "") : ""}`.trim()}
      >
        {sections.map((section) =>
          section.key === "newsletter" ? (
            <div key={section.key} className="shared-sidebar-newsletter">
              {section.content}
            </div>
          ) : (
            <div
              key={section.key}
              className={`shared-sidebar-section shared-sidebar-section--${section.key}`}
            >
              {section.key !== "categories" ? (
                <h4 className="section-title">{section.title}</h4>
              ) : null}
              {section.content}
            </div>
          )
        )}
      </div>
      <style jsx>{`
        .shared-sidebar-panel :global(.section-title) {
          color: #1d2430;
          margin-bottom: 1rem;
          font-family: var(--primary-font);
          font-size: var(--type-h5);
          line-height: 1.35;
        }

        .shared-sidebar-panel {
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
          font-family: var(--secondary-font);
        }

        .shared-sidebar-section {
          padding-bottom: 1.2rem;
          border-bottom: 1px solid rgba(126, 92, 35, 0.12);
        }

        .shared-sidebar-section:last-child {
          padding-bottom: 0;
          border-bottom: none;
        }

        .shared-sidebar-newsletter {
          padding: 0;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default SharedSidebarWidgets;
