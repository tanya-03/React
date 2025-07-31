import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//createSlice -> includes the reducer, action creators, and initial state in a single object.
//createAsyncThunk -> handle async operations (e.g., API calls) and dispatch actions for pending, fulfilled, and rejected states.

export interface FullUserDetail {
  email: string;
  password: string; 
  role: "Admin" | "User"; 
  firstName: string;
  lastName: string;
  bio: string;
  profilePicture: string;
  lastLogin: string;
}

export interface AuthState {
  email: string;
  role: "Admin" | "User";
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  firstName?: string;
  lastName?: string;
  bio?: string;
  profilePicture?: string;
  lastLogin?: string;
}

const initialState: AuthState = {
  email: "",
  role: "User",
  isLoggedIn: false,
  loading: false,
  error: null,
};

export const allUsers = [
  {
    email: "admin@test.com",
    password: "12345",
    role: "Admin",
    firstName: "Admin",
    lastName: "User",
    bio: "System administrator with full access to manage the application and user data.",
    profilePicture: "https://placehold.co/100x100/FF5733/FFFFFF?text=AD",
    lastLogin: "2025-07-28 10:00 AM",
  },
  {
    email: "user@test.com",
    password: "12345",
    role: "User",
    firstName: "Regular",
    lastName: "User",
    bio: "A standard user with access to view movies and their details.",
    profilePicture: "https://placehold.co/100x100/3366FF/FFFFFF?text=RU",
    lastLogin: "2025-07-28 10:15 AM",
  },
  {
    email: "user1@test.com",
    password: "12345",
    role: "User",
    firstName: "Alice",
    lastName: "Smith",
    bio: "An enthusiastic movie watcher who loves exploring new genres.",
    profilePicture: "https://placehold.co/100x100/33FF57/FFFFFF?text=AS",
    lastLogin: "2025-07-27 09:30 PM",
  },
  {
    email: "user2@test.com",
    password: "12345",
    role: "User",
    firstName: "Bob",
    lastName: "Johnson",
    bio: "Loves action films and sci-fi. Always looking for the next blockbuster!",
    profilePicture: "https://placehold.co/100x100/FF33FF/FFFFFF?text=BJ",
    lastLogin: "2025-07-28 08:00 AM",
  },
  {
    email: "user3@test.com",
    password: "12345",
    role: "User",
    firstName: "Charlie",
    lastName: "Brown",
    bio: "A fan of classic cinema and independent films. Enjoys deep dives into movie history.",
    profilePicture: "https://placehold.co/100x100/33FFFF/FFFFFF?text=CB",
    lastLogin: "2025-07-26 05:00 PM",
  },
  {
    email: "user4@test.com",
    password: "12345",
    role: "User",
    firstName: "Diana",
    lastName: "Prince",
    bio: "Enjoys thought-provoking documentaries and heartfelt dramas.",
    profilePicture: "https://placehold.co/100x100/FFFF33/000000?text=DP",
    lastLogin: "2025-07-28 09:45 AM",
  },
  {
    email: "user5@test.com",
    password: "12345",
    role: "User",
    firstName: "Eve",
    lastName: "Adams",
    bio: "New to the platform, exploring various genres and finding new favorites.",
    profilePicture: "https://placehold.co/100x100/FF9933/FFFFFF?text=EA",
    lastLogin: "2025-07-27 11:00 AM",
  },
] as FullUserDetail[];

export const loginAsync = createAsyncThunk(
  "auth/loginAsync",
  async (
    { email, password, role }: { email: string; password: string; role: "Admin" | "User" },
    { rejectWithValue }
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const foundUser = allUsers.find( 
      (user) => user.email === email && user.password === password && user.role === role
    );

    if (foundUser) {
      return {
        email: foundUser.email,
        role: foundUser.role,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        bio: foundUser.bio,
        profilePicture: foundUser.profilePicture,
        lastLogin: foundUser.lastLogin,
      };
    } else {
      return rejectWithValue("Invalid email, password or Role ☹️");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.email = "";
      state.role = "User";
      state.isLoggedIn = false;
      state.error = null;
      state.firstName = "";
      state.lastName = "";
      state.bio = "";
      state.profilePicture = "";
      state.lastLogin = "";
    },

    updateUserDetails(state, action) {
      const { email, updatedDetails } = action.payload;
      const userIndex = allUsers.findIndex(user => user.email === email);
      if (userIndex !== -1) {
        allUsers[userIndex] = {
          ...allUsers[userIndex],
          firstName: updatedDetails.firstName,
          lastName: updatedDetails.lastName,
          bio: updatedDetails.bio,
          role: updatedDetails.role,
          profilePicture: updatedDetails.profilePicture,
          lastLogin: updatedDetails.lastLogin,
        };
        
        // If the updated user is the currently logged-in user, update the auth state too
        if (state.email === email) {
          state.firstName = updatedDetails.firstName;
          state.lastName = updatedDetails.lastName;
          state.bio = updatedDetails.bio;
          state.role = updatedDetails.role;
          state.profilePicture = updatedDetails.profilePicture;
          state.lastLogin = updatedDetails.lastLogin;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginAsync.fulfilled,
        (state, action) => {
          state.loading = false;
          state.isLoggedIn = true;
          state.email = action.payload.email;
          state.role = action.payload.role as "Admin" | "User";
          state.firstName = action.payload.firstName;
          state.lastName = action.payload.lastName;
          state.bio = action.payload.bio;
          state.profilePicture = action.payload.profilePicture;
          state.lastLogin = action.payload.lastLogin;
        }
      )
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Something went wrong!";
      });
  },
});

export const { logout, updateUserDetails } = authSlice.actions;
export default authSlice.reducer;