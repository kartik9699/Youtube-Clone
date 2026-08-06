import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { lazy, Suspense } from 'react'
import './index.css'
import App from './App.jsx'
import Error from './Component/Error.jsx'
import Layout from './Component/Layout.jsx'

// Lazy-load page components for code-splitting
const Home = lazy(() => import('./Component/Home'))
const VideoSection = lazy(() => import('./Component/VideoSection'))
const Channel = lazy(() => import('./Component/Channel'))

// Loading fallback shown while a lazy chunk is fetching
function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className="w-8 h-8 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin" />
    </div>
  )
}

const approuter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "/",
            element: (
              <Suspense fallback={<Loading />}>
                <Home />
              </Suspense>
            ),
          },
          {
            path: "/watch/:videoID",
            element: (
              <Suspense fallback={<Loading />}>
                <VideoSection />
              </Suspense>
            ),
          },
          {
            path: "/channel",
            element: (
              <Suspense fallback={<Loading />}>
                <Channel />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={approuter}></RouterProvider>
)
