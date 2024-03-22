import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";

function Footer() {
    return(
        <>
        <div
          className="container-fluid bg-dark text-white-50 footer pt-5 mt-5 wow fadeIn"
          data-wow-delay="0.1s"
        >
          <div className="container py-5">
            <div className="row g-5">
              <div className="col-lg-3 col-md-6">
                <h5 className="text-white mb-4">Contact Us</h5>
                <p className="mb-2">
                  <i className="fa fa-map-marker-alt me-3"></i>Ibadan, Oyo State</p>
                <p className="mb-2">
                  <i className="fa fa-phone-alt me-3"></i>+2348149473231</p>
                <p className="mb-2">
                  <i className="fa fa-envelope me-3"></i>info@example.com
                </p>
                <div className="d-flex pt-2">
                  <a className="btn btn-outline-light btn-social" href="">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a className="btn btn-outline-light btn-social" href="">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a className="btn btn-outline-light btn-social" href="">
                    <i className="fab fa-youtube"></i>
                  </a>
                  <a className="btn btn-outline-light btn-social" href="">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <h5 className="text-white mb-4">Quick Links</h5>
                
                <Link to="/About" className="btn btn-link text-white-50">About Us</Link>
                
                <Link to="/Services" className="btn btn-link text-white-50">Our Services</Link>
              
                <p className=" btn-link text-white-50">
                 <span className='fs-5'><FaArrowLeft /></span>  Contact Us
                </p>
              </div>
              <div className="col-lg-3 col-md-6">
                <h5 className="text-white mb-4">Photo Gallery</h5>
                <div className="row g-2 pt-2">
                  <div className="col-4">
                    <img
                      className="img-fluid rounded bg-light p-1"
                      src="./src/img/property-1.jpg"
                      alt=""
                    />
                  </div>
                  <div className="col-4">
                    <img
                      className="img-fluid rounded bg-light p-1"
                      src="./src/img/property-2.jpg"
                      alt=""
                    />
                  </div>
                  <div className="col-4">
                    <img
                      className="img-fluid rounded bg-light p-1"
                      src="./src/img/property-3.jpg"
                      alt=""
                    />
                  </div>
                  <div className="col-4">
                    <img
                      className="img-fluid rounded bg-light p-1"
                      src="./src/img/property-4.jpg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <h5 className="text-white mb-4">THEME</h5>
                <p>BIH|ARBITRUM BLOCKCHAIN HACKATON </p>
                <div
                  className="position-relative mx-auto"
                  style={{ maxWidth: "400px" }}
                >
                  <input
                    className="form-control bg-transparent w-100 py-3 ps-4 pe-5"
                    type="text"
                    placeholder="Your email"
                  />
                  <button
                    type="button"
                    className="btn btn-secondary py-2 position-absolute top-0 end-0 mt-2 me-2"
                  >
                    SignUp
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="container">  
            <div className="copyright">
              <div className="row">
                <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                  &copy;{" "}
                  <p className="border-bottom" href="#">
                    TOBA|DASLAW|PRECIOUS
                  </p>
                  All Right Reserved. Designed By{" "}
                  <p className="border-bottom" >
                    TEAM DAIMOND
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
    );
}

export default Footer;
