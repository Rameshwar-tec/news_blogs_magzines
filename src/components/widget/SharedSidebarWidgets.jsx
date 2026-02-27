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
      key: "categories",
      title: "Categories",
      content: <WidgetCategory showTitle={false} />,
    },
    {
      key: "social-share",
      title: "Social Share",
      content: <WidgetSocialShare />,
    },
    {
      key: "web-profile",
      title: "Web Profile",
      content: <WidgetPost />,
    },
  ];

  return (
    <div className={className}>
      {sections.map((section, index) => (
        <div
          key={section.key}
          className={`shared-sidebar-widget ${animate ? (isVisible ? "animate-in" : "") : ""}`.trim()}
          style={animate ? { animationDelay: `${0.2 + index * 0.1}s` } : undefined}
        >
          <h4 className="section-title">{section.title}</h4>
          {section.content}
        </div>
      ))}
      <style jsx>{`
        .shared-sidebar-widget :global(.section-title) {
          color: #eceff3;
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
};

export default SharedSidebarWidgets;
