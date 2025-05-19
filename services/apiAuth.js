import supabase from './supabase.js';

// export async function getCurrentUser(userId) {
//   console.log('Getting current user...');
//   const res = await fetch(`${url}/user/${userId}`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   const data = await res.json();
//   console.log('Current user:', data);

//   if (data.error) {
//     return { data: null, error: data.error };
//   }

//   return { data: data.user, error: null };
// }

export async function loginWithEmail(email, password) {
  const { data: user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { user, error };
}

export async function signUpWithEmail(email, password, userName, mobile) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (!error) {
    const { user } = data;
    await insertUserApi(user.id, userName, mobile);
  }
  return { data, error };
}

export async function insertUserApi(userId, userName, mobile) {
  const { data, error } = await supabase
    .from('users')
    .insert({ id: userId, user_name: userName, mobile_number: mobile })
    .select();

  return { data, error };
}

export async function checkUserApi(userId) {
  const { data, error } = await supabase.from('users').select('*').eq('id', userId);
  return error ? { error } : { data };
}

// Add auth state change listener
export const subscribeToAuthChanges = (callback) => {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user ?? null, event);
  });
};

export async function getUserById(userId) {
  console.log('Getting user by ID:', userId);
  const { data, error } = await supabase.from('users').select('*').eq('id', userId);
  console.log('User data:', data);
  return error ? { error } : { data };
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  return error;
}
