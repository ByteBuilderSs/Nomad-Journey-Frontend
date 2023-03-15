
import RandomBox from "../components/MainPage/RandomSec";
import ProfileBox from "../components/MainPage/ProfileSec";
import ProgressBox from "../components/MainPage/ProgressSec"

function MainPageFunc() {
    return (

        <div>
            
            <div style={{display: "inline"}}>
                <ProfileBox />
                <ProgressBox />
            </div>

            <div><RandomBox /></div>
            
            
            
        </div>
    
    );
}

export default MainPageFunc;  