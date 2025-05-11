export const users = [
    // Data dummy pengguna yang sudah terdaftar
    { id: 1, name: 'John Doe', email: 'john.doe@gmail.com', status: 'Terkonfirmasi' },
    { id: 2, name: 'Jane Doe', email: 'jane.doe@gmail.com', status: 'Sembuh' },
  ];
  
  export const addUser = (user) => {
    users.push(user);
  };
  