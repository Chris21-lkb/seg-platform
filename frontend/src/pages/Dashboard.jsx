import { AppProvider } from "../state/store"
import ModeTabs from "../components/ModeTabs"
import UploadPanel from "../components/UploadPanel"
import CanvasViewer from "../components/CanvasViewer"

export default function Dashboard() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-950 text-gray-100">

        <header className="border-b border-gray-800 p-4">
          <h1 className="text-2xl font-bold">
            Segmentation Platform
          </h1>
        </header>

        <ModeTabs />

        <div className="grid grid-cols-12 gap-4 p-4">
          <div className="col-span-3">
            <UploadPanel />
          </div>

          <div className="col-span-9">
            <CanvasViewer />
          </div>
        </div>

      </div>
    </AppProvider>
  )
}