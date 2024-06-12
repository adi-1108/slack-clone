import Sidebar from "../components/Sidebar";
import Header from "./../components/Header";
import Main from "./../components/Main";

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className="flex items-center justify-between">
        <div className="flex-[0.3]">
          <Sidebar />
        </div>
        <div className="flex-1">
          <Main />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
