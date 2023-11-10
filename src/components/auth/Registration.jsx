import React from 'react'

const Registration = () => {


  return (
    <section className="h-screen">
      <div className="h-full justify-between">
        {/* <!-- Left column container with background--> */}
        <div className="g-4 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="SampleImage"
            />
          </div>

          {/* <!-- Right column container --> */}
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <form>
              <div className="flex flex-row items-center justify-center lg:justify-start">
                <p className="mb-6 mr-4 text-3xl">Sign In</p>
              </div>

              <div className='flex flex-col'>
                <input
                  type="text"
                  placeholder="Username"
                  className="mb-6 py-4 px-4 border border-black rounded"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  className="mb-6 py-4 px-4 border border-black rounded"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="mb-6 py-4 px-4 border border-black rounded"
                />
                <input
                  type="text"
                  placeholder="role"
                  className="mb-6 py-4 px-4 border border-black rounded"
                />
              </div>

              <div className="mb-6 flex items-center justify-end">
               <p>Already have an account? <a href="#!" className='text-blue-800'>Login</a></p>
              </div>

              <div className="text-center lg:text-left">
                <button
                  type="button"
                  className="rounded-lg border px-6 py-2 bg-blue-500 text-white"
                >
                  SignIn
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Registration;