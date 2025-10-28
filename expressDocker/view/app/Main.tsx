import React, { useState, useEffect } from "react";

export function Main() {
  const [blogs, setBlogs] = useState<any>([]);
  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, []);
  return (
    <main className="w-screen bg-slate-950 p-20 h-screen  ">
      <header className="flex flex-col  gap-4">
        <h1 className="text-3xl text-gray-200">All blogs</h1>
        {blogs &&
          blogs.map((blog: any) => (
            <div className="text-slate-50 text-xl hover:text-slate-300 cursor-pointer" key={blog.id}>
              {blog.title}
            </div>
          ))}
      </header>
    </main>
  );
}
