import NavigatorComponent from '@/src/components/doc/ContentNavigator';

export default function DocLayout({
  children,
  dev,
  spec
}: {
  children: React.ReactNode;
  dev: React.ReactNode;
  spec: React.ReactNode;
}) {
  return (
    <main id='main' className='prose relative flex min-h-screen flex-1 flex-col gap-8 p-8 sm:px-12 md:px-24 2xl:px-48'>
      {children}
      <NavigatorComponent dev={dev} spec={spec} />
    </main>
  );
}
