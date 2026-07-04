import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AppProvider } from '@/hooks/use-app-store'
import { Layout } from './components/Layout'
import Index from './pages/Index'
import PathDetails from './pages/PathDetails'
import Lesson from './pages/Lesson'
import NotFound from './pages/NotFound'

const App = () => (
  <AppProvider>
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/path/:id" element={<PathDetails />} />
            {/* Catch-all for mockup links in layout */}
            <Route path="/my-paths" element={<Index />} />
            <Route path="/explore" element={<Index />} />
            <Route path="/profile" element={<Index />} />
          </Route>
          {/* Lesson view is outside the main layout container to maximize space,
              but we use a custom layout inside the Lesson component itself */}
          <Route path="/lesson/:pathId/:lessonId" element={<Lesson />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </AppProvider>
)

export default App
