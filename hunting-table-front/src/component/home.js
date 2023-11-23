import "./../scss/home.css";
import image from "./../assets/sanglier.jpg";

const Home = () => {
    return (
        <div>
            <img style={{ width: '100%', height: '5%', objectFit: 'cover'}} src={image} alt="Sanglier"></img>
            <div style={{ marginLeft: 'auto', marginRight: 'auto', alignItems: 'center', marginTop: '5%', padding:'2%', background: 'rgba(10, 49, 23, 0.75)', height: '20%', width: '60%', border: 'solid 2px black', borderRadius: '25px', color: 'white'}}>
                <h2>A quoi sert huntingTable ?</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa </p>
            </div>
            <br></br><br></br><br></br><br></br>
        </div>

    );
  };
  
  export default Home;