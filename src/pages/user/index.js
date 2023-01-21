import React, { useEffect, useState } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://gorest.co.in/public/v2',
  headers: {
    Authorization: `Bearer 9ed7ccc4449cdc30bed4013cdd109fea24efd0f2231b3e6e6c790c56ccb6094c`,
  },
});

export default function User() {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState('female');
  const [selectedStatus, setSelectedStatus] = useState('active');
  const [edit, setEdit] = useState(false);
  const [field, setField] = useState({
    email: '',
    name: '',
  });
  const [editField, setEditField] = useState({
    email: '',
    name: '',
  });

  const [search, setSearch] = useState('');

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    try {
      const response = await api.get('/users');
      const result = response.data;
      result.sort((a, b) => b.id - a.id);
      setUsers(result);
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/users', {
        ...field,
        gender: selected,
        status: selectedStatus,
      });

      getUser();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    setField({
      ...field,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeEdit = (e) => {
    setEditField({
      ...editField,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      alert(`Berhasil delete data dengan ID ${id}`);
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      await api.patch(`/users/${edit.id}`, editField);
      alert(`Berhasil edit data dengan ID ${edit.id}`);
    } catch (error) {
      console.log(error);
    } finally {
      getUser();
      setEdit(false);
    }
  };

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  return (
    <div>
      <div>
        Search
        <div>
          <input
            className="border"
            placeholder="search ..."
            onChange={handleSearch}
            value={search}
          />
        </div>
      </div>
      <div>
        {users
          .filter((user) => {
            if (search === '') return user;
            return user.name.toLowerCase().includes(search.toLocaleLowerCase());
          })
          .map((user) => (
            <div
              key={user.id}
              className="flex items-baseline space-x-4 space-y-4"
            >
              <div>
                {edit.id === user.id ? (
                  <form onSubmit={handleEdit}>
                    <label>
                      Name
                      <input
                        type="text"
                        className="border px-4 py-2 rounded"
                        name="name"
                        onChange={handleChangeEdit}
                        placeholder={user.name}
                      />
                    </label>
                    <label>
                      Email
                      <input
                        type="text"
                        className="border px-4 py-2 rounded"
                        name="email"
                        onChange={handleChangeEdit}
                        placeholder={user.email}
                      />
                    </label>
                    <button
                      className="px-4 py-2 border rounded-lg"
                      type="submit"
                    >
                      Simpan Perubahan
                    </button>
                  </form>
                ) : (
                  <>
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                  </>
                )}
              </div>

              <button className=" text-blue-500" onClick={() => setEdit(user)}>
                edit
              </button>
              <button
                className="text-lg text-red-400 font-bold"
                onClick={() => handleDelete(user.id)}
              >
                X
              </button>
            </div>
          ))}
      </div>
      <hr />
      <div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              className="border px-4 py-2 rounded"
              name="name"
              onChange={handleChange}
            />
          </label>
          <label>
            Email
            <input
              type="text"
              className="border px-4 py-2 rounded"
              name="email"
              onChange={handleChange}
            />
          </label>
          <label>
            Status
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="active">active</option>
              <option value="inactive">inactive</option>
            </select>
          </label>
          <label>
            Gender
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
            >
              <option value="female">female</option>
              <option value="male">male</option>
            </select>
          </label>
          <button type="submit" className="px-4 py-2 rounded-lg border">
            submit
          </button>
        </form>
      </div>
    </div>
  );
}
