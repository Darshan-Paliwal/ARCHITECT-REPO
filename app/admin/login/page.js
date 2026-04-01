"use client";
import { useState } from "react";

export default function Login() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const handleLogin=async()=>{
    await fetch("/api/auth/login",{
      method:"POST",
      body:JSON.stringify({email,password})
    });
    window.location.href="/admin";
  };

  return (
    <div className="p-10">
      <input onChange={e=>setEmail(e.target.value)} placeholder="email"/>
      <input onChange={e=>setPassword(e.target.value)} type="password"/>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
