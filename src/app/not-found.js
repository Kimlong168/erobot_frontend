import React from "react";
import Link from "next/link";
const Error404 = () => {
  return (
    <div>
      <div className="bg-errorPage flex items-center justify-center min-h-screen  bg-fixed bg-cover bg-bottom error-bg">
        <div className="container">
          <div className="row">
            <div className="col-sm-8 offset-sm-2 text-center -mt-52">
              <div className="relative ">
                <h1 className="relative text-9xl tracking-tighter-less text-shadow font-sans font-bold text-secondary ">
                  <span>4</span>
                  <span>0</span>
                  <span>4</span>
                </h1>
                <span className="absolute  top-0  -ml-12  font-semibold">
                  Oops!
                </span>
              </div>
              <h5 className="font-semibold -mr-10 -mt-3">Page not found</h5>
              <p className="mt-2 mb-10">
                We are sorry, but the page you requested was not found.
              </p>
              <Link
                href="/donation"
                className=" bg-white border border-secondary px-5 py-3 text-sm shadow-sm font-medium tracking-wider text-secondary rounded-full hover:shadow-lg btn btn-sm "
              >
                ❤️ Donate Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error404;
