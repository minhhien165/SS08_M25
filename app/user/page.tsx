"use client";
import React, { useState } from "react";

export default function SearchUser() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError(""); // Reset lỗi
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/search?name=${encodeURIComponent(name)}`
      );
      const data = await response.json();

      if (response.ok) {
        setUsers(data.data); // Lưu danh sách người dùng đã tìm kiếm
      } else {
        setError(data.message); // Hiển thị thông báo lỗi nếu có
      }
    } catch (error) {
      setError("Đã xảy ra lỗi trong quá trình tìm kiếm.");
    }
  };

  return (
    <div>
      <h1>Tìm Kiếm Người Dùng</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nhập tên người dùng..."
      />
      <button onClick={handleSearch}>Tìm Kiếm</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} (Email: {user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}
