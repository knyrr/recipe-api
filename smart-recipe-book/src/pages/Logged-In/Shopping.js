import React from "react";
import { Typography, Box, Button, Grid } from "@mui/material";
import axios from "axios";

import NavLoggedIn from "../../components/Logged-In/NavLoggedIn";

function Shopping() {
    const [recipes, setRecipes] = React.useState([]);

    React.useEffect(() => {
        let recipe_ids = [];
        axios.get("http://localhost:5000/shoppinglist/user/" + sessionStorage.getItem("id"))
            .then((response) => response.data)
            .then((data) => {
                data.forEach((item) => {
                    recipe_ids.push(item.recipeId);
                });
            })
            .then(() => {
                recipe_ids.forEach((id) => {
                    axios.get("http://localhost:5000/recipe/" + id)
                        .then((response) => response.data)
                        .then((data) => {
                            setRecipes((oldArray) => [...oldArray, data]);
                        });
                });
            })
    }, []);

    const removeRecipe = (props) => {
        axios.delete("http://localhost:5000/shoppinglist/user/" + sessionStorage.getItem("id") + "/recipe/" + props)
            .then((response) => {
                window.location.reload();
                console.log(props);

            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            <NavLoggedIn />
            <Box sx={{display: "flex"}}>
                
                
            </Box>
            
            <Grid sx={{marginLeft: "3%", display: "flex", flexDirection: "column"}}>
            <Typography variant="h4" sx={{margin: "20px", paddingTop: "70px", color: "grey"}}>Selected recipes:</Typography>
                <Box sx={{display: "flex", flexDirection: "column", width: "fit-content", color: "rgb(105, 105, 105)"}}>
                    {recipes.map(recipe => (
                        <span
                            style={{margin: "5px", backgroundColor: "#6692be5e", paddingRight: "8px", borderRadius: "5px"}} 
                            key={recipe._id} 
                            id={recipe._id}
                        >
                        <Button sx={{minWidth: "25px", color: "rgb(105, 105, 105)"}} id={recipe._id} onClick={() => removeRecipe(recipe._id)}>x</Button>
                        {recipe.name}     
                        </span>
                    ))}
                </Box>

                <Typography variant="h4" sx={{margin: "20px", paddingTop: "70px", paddingLeft: "20%", color: "grey"}}>Shopping list:</Typography>
                <Box sx={{marginLeft: "40%"}}>
                    {recipes.map(recipe => (
                        <span key={recipe._id}>
                            {recipe.ingredients}
                            <br />
                        </span>
                    ))}
                </Box>
            </Grid>
        </>
    );
};

export default Shopping;

/*{recipes.map(recipe => (
    <AddSelectedRecipe 
        key={recipe._id}
        id={recipe._id}
        name={recipe.name}
        ingredients={recipe.ingredients}
    />
))}
*/