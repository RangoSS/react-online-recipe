import React, { useState } from 'react';
import AddRecipe from './AddRecipe';
import RecipeList from './RecipeList';
import UpdateRecipe from './UpdateRecipe';
import SearchRecipe from './SearchRecipe';
import axios from 'axios';

function MainResipe() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleRecipeAdded = () => {
    // Refresh the recipe list
  };

  const handleEditRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleUpdateComplete = () => {
    setSelectedRecipe(null);
  };

  const handleDeleteRecipe = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/recipes/${id}`);
      alert('Recipe deleted successfully');
      // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  return (
    <div>
      <AddRecipe onRecipeAdded={handleRecipeAdded} />
      <SearchRecipe />
      <RecipeList onEdit={handleEditRecipe} onDelete={handleDeleteRecipe} />
      {selectedRecipe && <UpdateRecipe selectedRecipe={selectedRecipe} onUpdateComplete={handleUpdateComplete} />}
    </div>
  );
}

export default MainResipe;
