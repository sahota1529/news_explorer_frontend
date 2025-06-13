import "./Footer.css";
import github from "../../images/github.svg";
import linkedin from "../../images/linkedin.svg";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Footer = () => {
  const route = useLocation();

  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__content-copyright">
          &copy; Supersite, Powered by News API
        </p>
        <div className="footer__content-list-container">
          <ul className="footer__content-list">
            <li className="footer__content_list-item">
              <div className="footer__content_text-container">
                {route.pathname === "/saved-news" ? (
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <p className="footer__content_list-text">Home</p>
                  </Link>
                ) : (
                  <a
                    href="/"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <p className="footer__content_list-text">Home</p>
                  </a>
                )}
                <a
                  href="https://tripleten.com"
                  rel="noopener noreferer"
                  target="_blank"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <p className="footer__content_list-text">TripleTen</p>
                </a>
              </div>
            </li>
            <li className="footer__content-list-item">
              <div className="footer__content_buttons-container">
                <a
                  rel="noopener noreferer"
                  target="_blank"
                  href="https://github.com/sahota1529"
                >
                  <img
                    src={github}
                    className="footer__content_list-img"
                    alt="Github Log"
                  />
                </a>
                <a
                  rel="noopener noreferer"
                  target="_blank"
                  href="https://www.linkedin.com/in/vipanpreet-sahota-047983206/"
                >
                  <img
                    src={linkedin}
                    className="footer__content_list-img"
                    alt="LinkedIn Logo"
                  />
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
