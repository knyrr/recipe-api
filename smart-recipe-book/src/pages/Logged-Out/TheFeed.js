import React from 'react';
import {Grid} from '@mui/material';
import axios from 'axios';

import NavLoggedOut from '../../components/Logged-Out/NavLoggedOut';
import MakeCard from '../../components/Logged-Out/MakeCard';

function TheFeed() {
    
    const [recipes, setRecipes] = React.useState([]);
    React.useEffect(() => {
        axios.get('http://localhost:5000/recipe/')
            .then(res => {
                setRecipes(res.data);
            })
            .catch(err => console.log(err));
    }, []);
    
    return (
        <>
            <NavLoggedOut />
            
            <Grid sx={{display: "grid", gridTemplateColumns: "repeat(auto-fill, 350px)", justifyContent: "center", gridGap: "30px", paddingTop: "50px"}}>
                {recipes.map(recipe => (
                    
                <MakeCard 
                    key={recipe._id}
                    id={recipe._id}
                    name={recipe.name}
                    instructions={recipe.instructions}
                    ingredients={recipe.ingredients}
                    description={recipe.description}
                    username={recipe.username}
                    picture={recipe.picture}
                />
            ))}
            </Grid>
        </>
    );
}

export default TheFeed;