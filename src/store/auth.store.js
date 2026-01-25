
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "../../src/api/auth.api";
import api from "../api/axios";

// 🔹 LOGIN THUNK
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await loginApi(credentials);
      return res.data.data; // { user, token }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

/* 🔹 FETCH LOGGED-IN USER */
export const fetchMyProfile = createAsyncThunk(
  "auth/fetchMyProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/users/me");
      return res.data.data; 
    } catch (err) {
      console.error("PROFILE ERROR ", err.response?.data || err.message);
      return rejectWithValue("Failed to fetch profile");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),
    loading: true,
    error: null,
  },
  reducers: {
    // ✅ Login success action
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.token);
    },

    // ✅ Restore authentication from token
    restoreAuth: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },

    // ✅ Logout action
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },

    // ✅ Save address
    saveAddress: (state, action) => {
      if (!state.user) return;
      state.user.addresses = [
        ...(state.user.addresses || []),
        action.payload,
      ];
    },

    // ✅ Set default address
    setDefaultAddress: (state, action) => {
      if (!state.user?.addresses) return;
      state.user.addresses = state.user.addresses.map((addr) => ({
        ...addr,
        isDefault: addr._id === action.payload,
      }));
    },

    // ✅ Set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // ✅ Clear error
    clearError: (state) => {
      state.error = null;
    }
  },

  // 🔹 ASYNC STATES
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch profile cases
      .addCase(fetchMyProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchMyProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // If profile fetch fails, clear invalid token
        if (action.payload === "Failed to fetch profile") {
          state.token = null;
          state.isAuthenticated = false;
          localStorage.removeItem("token");
        }
      });
  },
});

export const {
  loginSuccess,
  logout,
  saveAddress,
  restoreAuth,
  setDefaultAddress,
  setLoading,
  clearError
} = authSlice.actions;

export default authSlice.reducer;