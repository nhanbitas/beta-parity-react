import NavigatorComponent from '@/src/components/doc/ContentNavigator';

export default function DocLayout({ children }: { children: React.ReactNode }) {
  return <NavigatorComponent>{children}</NavigatorComponent>;
}
