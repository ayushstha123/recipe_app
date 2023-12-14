import React, { useState } from 'react';
import axios from "axios";
import userGetId from '../hooks/userGetId.js';

const CreateRecipe = () => {
  const userID=userGetId();

  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: [''], // Initialize with an array containing an empty string
    instructions: '',
    imageUrl: '',
    cookingTime: 0,
    owner: userID
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  }

  const handleIngredientChange = (e, index) => {
    const { value } = e.target;
    const ingredients = [...recipe.ingredients]; // Create a copy of the array
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  }

  const addIngredients = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ''] });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/recipes', recipe);
      alert("Recipe added");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>Name: <input type='text' name='name' onChange={handleChange} /></label><br />
        <label>Ingredients:</label><br />
        {
          recipe.ingredients.map((ingredient, index) => (
            <input key={index} type='text' name='ingredients' value={ingredient} onChange={(e) => { handleIngredientChange(e, index) }} />
          ))
        }
        <button onClick={addIngredients} type='button'>Add</button><br />
        <label>Instructions:<textarea type='text' name='instructions' onChange={handleChange}></textarea></label><br />
        <label>Image:<input type='text' name='imageUrl' onChange={handleChange} /></label><br />
        <label>Cooking time:<input type='number' name='cookingTime' onChange={handleChange} /></label><br />
        <button type='submit'>Enter</button>
      </form>
    </div>
  )
}

export default CreateRecipe;
