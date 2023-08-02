'use client'
import React, { useState } from 'react';
import firebase from 'firebase';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      alert('Logged in successfully!');
    } catch (error) {
      console.error('Error during sign in:', error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      alert('Registered successfully!');
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div>

      <form onSubmit={handleRegister}>
        <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type='submit'>Register</button>
      </form>
    </div>
  );
}