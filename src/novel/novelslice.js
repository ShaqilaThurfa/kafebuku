import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import API_BASE_URL from "../config";


export const novelSlice = createSlice({
  name: "novel",
  initialState: {
    items: [],
    borrowedBooks: {},
    errors: null,
    loading: false,
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
    fetchBorrowedSuccess: (state, action) => {
      const borrowedBooks = action.payload; 
      state.borrowedBooks = {}; 
      borrowedBooks.forEach((book) => {
        state.borrowedBooks[book.bookId] = "borrowed"; 
      });
    },
    
  },
});



export const { fetchStart, fetchSuccess, fetchFailure, fetchBorrowedSuccess } = novelSlice.actions;
export default novelSlice.reducer;
const NytimesAPI = import.meta.env.VITE_NYTIMES_API_KEY;

export const fetchNovels = () => {
  return async (dispatch) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.get(
        `https://api.nytimes.com/svc/books/v3/lists/current/young-adult.json?api-key=${NytimesAPI}`
      );

      const response = await axios.get(`${API_BASE_URL}/user/mybooklist`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      const borrowedBooks = Array.isArray(response.data) ? response.data : [];
      
      const booksWithStatus = data.results.books.map((book) => {
        const isBorrowed = borrowedBooks.some(
          (borrowed) => borrowed.bookId === book.rank
        );
        return {
          ...book,
          status: isBorrowed ? "borrowed" : "available",
        };
      });

      dispatch(fetchSuccess(booksWithStatus));
    } catch (error) {
      console.error("Error fetching books: ", error);
      dispatch(fetchFailure(error?.message));
    }
  };
};



export const fetchNovelById = (novelId) => {
  return async (dispatch) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.get(`https://api.nytimes.com/svc/books/v3/lists/current/young-adult.json?api-key=${NytimesAPI}`);
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

// export const fetchNovelByUserId = () => async (dispatch) => {
//   dispatch(fetchStart()); 
//   try {
    
//     const { data } = await axios.get("http://localhost:3001/user/mybooklist", {
//       headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
//     });

//     console.log("Updated borrowed books: ", data);

//     if (data && data.length > 0) {
      
//       dispatch(fetchSuccess(data));
//     } else {
//       dispatch(fetchFailure("No borrowed books found."));
//     }
//   } catch (error) {
//     console.error("Error fetching user borrowed books: ", error);
//     dispatch(fetchFailure(error.message || "Error fetching user borrowed books"));
//   }
// };

export const fetchNovelByUserId = () => async (dispatch) => {
  dispatch(fetchStart());
  try {
    const { data } = await axios.get(`${API_BASE_URL}/user/mybooklist`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
    });

    console.log("Fetched user books:", data);

    if (Array.isArray(data)) {
      dispatch(fetchSuccess(data));
    } else {
      dispatch(fetchFailure("Unexpected response format. Expected an array."));
    }
  } catch (error) {
    console.error("Error fetching user borrowed books:", error);
    dispatch(fetchFailure(error.message || "Error fetching user borrowed books"));
  }
};

