import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { dateFormate } from "../../utils";
import SocialLink from "../../data/social/SocialLink.json";
import MenuData from "../../data/menu/HeaderMenu.json";
import OffcanvasMenu from "./OffcanvasMenu";

const HeaderOne = ({ searchValue = "", setSearchValue = () => {} }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    // safe dropdown toggle: only attach listeners if menuRef exists
    const menuEl = menuRef.current;
    if (!menuEl) return;
    const items = Array.from(menuEl.childNodes || []).filter((n) => n.classList && n.classList.contains("has-dropdown"));
    const handlers = [];

    items.forEach((el) => {
      const link = el.children[0];
      const fn = (e) => {
        e.preventDefault();
        if (el.classList.contains("active")) {
          el.classList.remove("active");
          el.childNodes[1]?.classList?.remove("opened");
        } else {
          items.forEach((s) => {
            s.classList.remove("active");
            s.childNodes[1]?.classList?.remove("opened");
          });
          el.classList.add("active");
          el.childNodes[1]?.classList?.add("opened");
        }
      };
      link?.addEventListener("click", fn);
      handlers.push({ link, fn });
    });

    return () => {
      // cleanup listeners
      handlers.forEach(({ link, fn }) => link?.removeEventListener("click", fn));
    };
  }, []);

  const [show, setShow] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [local, setLocal] = useState(searchValue || "");

  useEffect(() => {
    // keep local input in sync when parent updates searchValue
    setLocal(searchValue || "");
  }, [searchValue]);

  const headerSearchShow = () => setSearchOpen(true);
  const headerSearchClose = () => {
    setSearchOpen(false);
    setLocal("");
    setSearchValue("");
  };

  const handleSearchChange = (e) => {
    const v = e.target.value;
    setLocal(v);
    setSearchValue(v);
  };

  const [mobileToggle, setMobileToggle] = useState(false);
  const MobileMenuToggler = () => {
    setMobileToggle(!mobileToggle);
    const HtmlTag = document.querySelector("html");
    if (HtmlTag) {
      if (HtmlTag.classList.contains("main-menu-opened")) HtmlTag.classList.remove("main-menu-opened");
      else setTimeout(() => HtmlTag.classList.add("main-menu-opened"), 200);
    }
  };

  return (
    <>
      <OffcanvasMenu ofcshow={show} ofcHandleClose={() => setShow(false)} />
      <header className="page-header sticky-top">
        <div className="header-top bg-grey-dark-one">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md">
                <ul className="header-top-nav list-inline justify-content-center justify-content-md-start">
                  <li className="current-date">{dateFormate()}</li>
                  <li><Link href="/about-us">About</Link></li>
                  <li><Link href="/contact">Contact</Link></li>
                  <li><Link href="/advertise-with-us">Advertise With Us</Link></li>
                </ul>
              </div>
              <div className="col-md-auto">
                <ul className="ml-auto social-share header-top__social-share">
                  {Object.values(SocialLink).map((s, i) => (
                    <li key={i}><a href={s.url}><i className={s.icon} /></a></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <nav className="navbar bg-white">
          <div className="container">
            <div className="navbar-inner">
              <div className="brand-logo-container">
                <Link href="/"><Image src="/logos/logo-primary.png" alt="brand-logo" width={300} height={100} style={{ objectFit: "contain" }} /></Link>
              </div>

              <div className="main-nav-wrapper">
                <ul className="main-navigation list-inline" ref={menuRef}>
                  {MenuData.map((item, i) => item.submenu ? (
                    <li className="has-dropdown" key={i}>
                      <Link href={item.path}>{item.label}</Link>
                      <ul className="submenu">
                        {item.submenu.map((s, idx) => <li key={idx}><Link href={s.subpath}>{s.sublabel}</Link></li>)}
                      </ul>
                    </li>
                  ) : <li key={i}><Link href={item.path}>{item.label}</Link></li>)}
                </ul>
              </div>

              <div className="navbar-extra-features ml-auto">
                <div className={`navbar-search ${searchOpen ? "show-nav-search" : ""}`}>
                  <div className="search-field">
                    <input
                      type="text"
                      className="navbar-search-field"
                      placeholder="Search magazines..."
                      value={local}
                      onChange={handleSearchChange}
                      onFocus={() => setSearchOpen(true)}
                    />
                  </div>
                  <span className="navbar-search-close" onClick={headerSearchClose}><i className="fal fa-times" /></span>
                </div>

                <button className="nav-search-field-toggler" onClick={headerSearchShow}><i className="far fa-search" /></button>
                <button className="side-nav-toggler" onClick={() => setShow(true)}><span/><span/><span/></button>
              </div>

              <div className={`main-nav-toggler d-block d-lg-none ${mobileToggle ? "expanded" : ""}`}>
                <div className="toggler-inner" onClick={MobileMenuToggler}><span/><span/><span/></div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default HeaderOne;
