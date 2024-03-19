//get background image
import imagePurple from "../assets/imagePurple.jpg"
//styling
import "../Styling/Background.css"

function Background(){
  
    return <img className="background min-h-screen bg-cover bg-center bg-no-repeat" src={imagePurple} alt=""/>
}

export default Background;
