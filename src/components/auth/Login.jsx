import React from 'react'

const Login = () => {
  
  return (
    <section className="h-screen">
      <div className="container h-full px-6 py-24">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          {/* <!-- Left column container with background--> */}
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-full"
              alt="Phoneimage"
            />
          </div>

          {/* <!-- Right column container with form --> */}
          <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
            <form>
            <div className="flex flex-row items-center justify-center lg:justify-start">
                <p className="mb-6 mr-4 text-3xl">Login</p>
              </div>
              <div className='flex flex-col gap-4'>
              <input
                type="email"
                placeholder="Email address"
                className="px-6 py-2 rounded border"
              />
              <input
                type="password"
                placeholder="Password"
                className="px-6 py-2 rounded border"
              />
              </div>
              <div className="mb-6 flex items-center justify-end">
                <a
                  href="#!"
                  className="transition duration-150 ease-in-out"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="button"
                className="inline-block w-full rounded bg-blue-600 text-white px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal border"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login;