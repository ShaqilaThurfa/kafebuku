import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";



export const novelSlice = createSlice({
  name: "novel",
  initialState: {
    items: [],
    errors: null,
    loading: false,
    // generatedStory: "",
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.errors = null;
    },
    fetchSuccess: (state, action) => {
      state.items = action.payload;
      state.loading = false;
    },
    fetchFailure: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    setGeneratedStory: (state, action) => {
      state.generatedStory = action.payload;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure, setGeneratedStory } = novelSlice.actions;
export default novelSlice.reducer;

export const fetchNovels = () => {
  return async (dispatch) => {
    dispatch(fetchStart()); 
    try {
      const { data } = await axios.get("https://api.nytimes.com/svc/books/v3/lists/current/young-adult.json?api-key=5AVZw7kp8E82YLegXtL2WyiiVcbmMr94");
      dispatch(fetchSuccess(data.results.books));
    } catch (error) {
      console.error("Error fetching data: ", error);
      dispatch(fetchFailure(error?.message));
    }
  };
};

export const fetchNovelById = (novelId) => {
  return async (dispatch) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.get("https://api.nytimes.com/svc/books/v3/lists/current/young-adult.json?api-key=5AVZw7kp8E82YLegXtL2WyiiVcbmMr94");
      const books = data.results.books;

      let book = books.find(b => b.rank === novelId)

      if (book) {
        dispatch(fetchSuccess([book])); 
      } else {
        dispatch(fetchFailure("Book not found."));
      }
      
    } catch (error) {
      console.error("Error fetching data: ", error);
      dispatch(fetchFailure(error?.message));
    }
  };
};

export const fetchNovelByUserId = () => async (dispatch) => {
  dispatch(fetchStart());
  try {
    const { data } = await axios.get("http://localhost:3001/user/mybooklist", {
      headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
    });

    if (data && data.length > 0) {
      dispatch(fetchSuccess(data)); 
    } else {
      dispatch(fetchFailure("No borrowed books found."));
    }
  } catch (error) {
    console.error("Error fetching user borrowed books: ", error);
    dispatch(fetchFailure(error.message || "Error fetching user borrowed books"));
  }
};

export const generateStoryWithAI = (title, author, description) => async (dispatch) => {

  dispatch(fetchStart());
  try {

    // if (!title && author && description) {
    //   throw new Error("Novel not found");
    // }

    const prompt = `Write a story about the novel titled "${title}" written by ${author}. The story should revolve around the theme: "${description}".`;
    console.log(prompt);
    

    const genAI = new GoogleGenerativeAI("AIzaSyD4yrciJlQ4vU0HKgWo8x4PQBL6mWhrmVk" );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent( prompt );

    console.log('di novel slice', result);
    
    
    const generatedStory = result?.data?.text || "No story generated.";
    
    console.log(generatedStory);
    

    dispatch(setGeneratedStory(generatedStory));
  } catch (error) {
    console.error("Error generating story with AI:", error);
    dispatch(fetchFailure(error.message || "Error generating story with AI"));
  }
};