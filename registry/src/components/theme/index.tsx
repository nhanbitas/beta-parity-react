import './index.css';

type Props = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: Props) {
  return children;
}
