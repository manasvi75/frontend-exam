import './globals.css';

export const metadata = {
  title: 'Digital Health Hub',
  description: 'Patient and Clinic Management System',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  );
}
