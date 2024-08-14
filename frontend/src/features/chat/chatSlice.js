import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import chatService from "./chatService"; // Assumes you have a service for API calls

export const getMessages = createAsyncThunk(
  "chat/getMessages",
  async (_, thunkAPI) => {
    try {
      return await chatService.getMessages();
    } catch (error) {
      const message =
        (error.response.data && error.response.data.err) ||
        error.message ||
        error.toString;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createMessage = createAsyncThunk(
  "chat/createMessage",
  async (messageData, thunkAPI) => {
    try {
      return await chatService.createMessage(messageData);
    } catch (error) {
      const message =
        (error.response.data && error.response.data.err) ||
        error.message ||
        error.toString;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch messages";
      })
      .addCase(createMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.messages.push(action.payload);
      })
      .addCase(createMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { addMessage, reset } = chatSlice.actions;
export default chatSlice.reducer;
