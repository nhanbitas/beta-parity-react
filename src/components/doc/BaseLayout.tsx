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
    <>
      {children}
      <NavigatorComponent dev={dev} spec={spec} />
    </>
  );
}
