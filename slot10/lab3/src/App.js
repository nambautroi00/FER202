import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import MyNavBar from "./components/NavBar/NavBar";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AccountPage from "./pages/AccountPage";
import FavouritesPage from "./pages/FavouritesPage";
import FooterPage from "./pages/FooterPage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'home'
    };
  }

  handleNavigate = (page) => {
    this.setState({ currentPage: page });
  };

  renderPage = () => {
    const { currentPage } = this.state;
    switch(currentPage) {
      case 'home':
        return <HomePage />;
      case 'movies':
        return <MoviePage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'account':
        return <AccountPage />;
      case 'favourites':
        return <FavouritesPage />;
      default:
        return <HomePage />;
    }
  };

  render() {
    return (
      <div className="App">
        <MyNavBar onNavigate={this.handleNavigate} />
        <div className="main-content">
          {this.renderPage()}
        </div>
        <FooterPage />
      </div>
    );
  }
}

export default App;
