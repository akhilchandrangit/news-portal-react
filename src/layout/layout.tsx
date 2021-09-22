import NavBar from '../components/NavBar/NavBar';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }): JSX.Element => {
  return (
    <main>
      <NavBar />
      {children}
    </main>
  );
};

export default Layout;

