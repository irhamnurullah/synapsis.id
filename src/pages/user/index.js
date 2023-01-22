import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserCard from '@/components/userCard';
import { Dialog } from '@headlessui/react';
import Loading from '@/components/loading';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    try {
      const response = await api.get('/users');
      const result = response.data;
      setLoading(true);
      result.sort((a, b) => b.id - a.id);
      setUsers(result);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
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
      setLoading(true);
      getUser();
      setIsOpen(false);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
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

  const [isOpen, setIsOpen] = useState(false);

  if (loading) {
    return (
      <div className="h-screen w-full text-white flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <main className="p-8 space-y-4">
      <div className="flex justify-between items-center">
        <Dialog
          as="div"
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-10"
        >
          <div className="fixed inset-0 bg-slate-900 bg-opacity-25 backdrop-filter backdrop-blur" />
          <Dialog.Panel>
            <div className="fixed w-1/4 left-[39%] top-1/4 h-96 inset-0 p-5 bg-white z-30 rounded-2xl">
              <Dialog.Title className="font-bold mb-4">Add User</Dialog.Title>

              <form className="flex flex-col" onSubmit={handleSubmit}>
                <>
                  <label className="space-y-2 mb-2">
                    <span className="text-sm">Name</span>
                    <input
                      type="text"
                      className="form-input w-full rounded-lg border-gray-300 text-sm"
                      name="name"
                      onChange={handleChange}
                    />
                  </label>
                  <label className="space-y-2 mb-2">
                    <span className="text-sm">Email</span>
                    <input
                      type="email"
                      className="form-input w-full rounded-lg border-gray-300 text-sm"
                      name="email"
                      onChange={handleChange}
                    />
                  </label>
                </>
                <>
                  <label className="space-x-6 mb-2">
                    <span className="text-sm">Status</span>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="form-select rounded-lg border-gray-300 text-sm"
                    >
                      <option value="active">active</option>
                      <option value="inactive">inactive</option>
                    </select>
                  </label>
                  <label className="space-x-4 mb-2">
                    <span className="text-sm">Gender</span>
                    <select
                      value={selected}
                      onChange={(e) => setSelected(e.target.value)}
                      className="form-select rounded-lg border-gray-300 text-sm"
                    >
                      <option value="female">female</option>
                      <option value="male">male</option>
                    </select>
                  </label>
                </>
                <button type="submit" className="px-4 py-2 rounded-lg border">
                  {loading ? 'Loading' : 'Submit'}
                </button>
              </form>
            </div>
          </Dialog.Panel>
        </Dialog>

        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 rounded-lg font-semibold bg-blue-200 text-blue-700"
        >
          Add New User
        </button>

        <div className="text-sm text-gray-600">
          {loading ? 'Loading ....' : 'Last 10 Record'}
        </div>

        <div className="pr-3">
          <input
            className="form-input bg-white rounded-lg  border-none"
            placeholder="search ..."
            onChange={handleSearch}
            value={search}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {users
          .filter((user) => {
            if (search === '') return user;
            return user.name.toLowerCase().includes(search.toLocaleLowerCase());
          })
          .map((user) => (
            <div key={user.id} className="flex space-x-4 space-y-4">
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
                  <UserCard
                    email={user.email}
                    gender={user.gender}
                    name={user.name}
                    status={user.status}
                  />
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
    </main>
  );
}
