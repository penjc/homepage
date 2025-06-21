import NavigationWrapperServer from './NavigationWrapperServer';
import Footer from './Footer';
import SuspenseWrapper from './SuspenseWrapper';
import BackToTop from './BackToTop';

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      {/* Navigation */}
      <NavigationWrapperServer />

      {/* Main Content */}
      <main className="flex-1 pt-16">
        <SuspenseWrapper loadingText="页面加载中..." variant="spinner" size="lg">
          {children}
        </SuspenseWrapper>
      </main>

      {/* Footer */}
      <Footer />
      
      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
} 