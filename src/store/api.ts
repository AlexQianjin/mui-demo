// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// interface Company {
//   name: string;
//   catchPhrase: string;
//   bs: string;
// }

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   company: Company;
//   role: string;
// }

// interface PaginatedResponse {
//   users: User[];
//   total: number;
// }

// export const api = createApi({
//   baseQuery: fetchBaseQuery({ 
//     baseUrl: 'https://jsonplaceholder.typicode.com' 
//   }),
//   endpoints: (builder) => ({
//     getUsers: builder.query<PaginatedResponse, { page: number; limit: number }>({
//       query: ({ page, limit }) => `/users?_page=${page}&_limit=${limit}`,
//       transformResponse(users: User[], meta) {
//         // Transform the response to include role and extract company name
//         const transformedUsers = users.map(user => ({
//           ...user,
//           role: 'User', // Add a default role since the API doesn't provide one
//           company: user.company // Keep the full company object
//         }));
        
//         return {
//           users: transformedUsers,
//           total: 1000, // Set fixed total to 1000
//         };
//       },
//     }),
//   }),
// });

// export const { useGetUsersQuery } = api;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  company: Company;
  role: string;
}

interface PaginatedResponse {
  users: User[];
  total: number;
}

// Generate a deterministic set of mock users
const generateMockUsers = (page: number, limit: number): User[] => {
  const users: User[] = [];
  const start = (page - 1) * limit;
  
  for (let i = 0; i < limit && start + i < 1000; i++) {
    const id = start + i + 1;
    users.push({
      id,
      name: `User ${id}`,
      email: `user${id}@example.com`,
      company: {
        name: `Company ${Math.floor(id / 10) + 1}`,
        catchPhrase: "Mock catchphrase",
        bs: "Mock bs"
      },
      role: id % 3 === 0 ? 'Admin' : id % 2 === 0 ? 'Editor' : 'User'
    });
  }
  
  return users;
};

// Simulate API delay with Promise
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = createApi({
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://jsonplaceholder.typicode.com' 
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<PaginatedResponse, { page: number; limit: number }>({
      queryFn: async ({ page, limit }) => {
        // Add 3-second delay
        await delay(3000);
        
        // Generate mock data
        const users = generateMockUsers(page, limit);
        
        return {
          data: {
            users,
            total: 1000
          }
        };
      }
    }),
  }),
});

export const { useGetUsersQuery } = api;