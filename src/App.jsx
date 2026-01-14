import Header from './components/layout/Header'
import SimulatorPanel from './components/simulator/SimulatorPanel'
import GuideSection from './components/guide/GuideSection'
import { guideContent, guideOrder } from './data/guideContent'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Learn more about driving <span className="text-orange-500">Stick Shift</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Learn more about manual transmissions with our interactive RPM simulator and quick reference driving guides.
            Perfect for beginners!
          </p>
        </div>

        {/* Simulator Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-8 w-1 bg-orange-500 rounded-full" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              RPM Simulator
            </h2>
          </div>
          <SimulatorPanel />
        </section>

        {/* Guide Section */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <div className="h-8 w-1 bg-orange-500 rounded-full" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Driving Guide
            </h2>
          </div>

          <div className="space-y-4">
            {guideOrder.map(key => (
              <GuideSection
                key={key}
                title={guideContent[key].title}
                icon={guideContent[key].icon}
                sections={guideContent[key].sections}
              />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 py-8 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <p className="mb-2">
              Built with React, Tailwind CSS, D3.js, and Three.js
            </p>
            <p className="text-sm">
              Made with passion for manual transmission enthusiasts
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
