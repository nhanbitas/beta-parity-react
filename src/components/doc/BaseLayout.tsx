import NavigatorComponent from './DocNavigator';

export const revalidate = 0;
export const dynamic = 'no-cache';

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
    <>
      <h1 className='h-24 border-b border-gray-200 text-2xl'>{children}</h1>
      <NavigatorComponent dev={dev} spec={spec} />
    </>
  );
}
