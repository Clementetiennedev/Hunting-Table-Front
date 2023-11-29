import "./../scss/home.css";
import image from "./../assets/sanglier.jpg";

const Home = () => {
    return (
        <div>
            <img style={{ width: '100%', objectFit: 'cover'}} src={image} alt="Sanglier"></img>
            <div style={{ marginLeft: 'auto', marginRight: 'auto', alignItems: 'center', marginTop: '5%', padding:'2%', background: 'rgba(10, 49, 23, 0.75)', height: '20%', width: '60%', border: 'solid 2px black', borderRadius: '25px', color: 'white'}}>
                <h2>A quoi sert huntingTable ?</h2>
                <p>Le site HuntingTable est utile aux chasseurs et aux sociétés de chasses</p>
                <p>Les chasseurs vont pouvoir enregistrer leurs journées de chasses et pourront ainsi garder un historique de leur animaux tués. Ils pourront également venir consulter les sociétés de chasse et voir leurs quotas</p>
                <p>Les sociétés de chasse vont pouvoir enregistrer leurs journées de chasses et pourront ainsi garder un historique de leur animaux tués. Ils pourront également venir renseigner leur quota pour chaques espèce</p>
            </div>
            <br></br><br></br><br></br><br></br>
        </div>

    );
  };
  
  export default Home;