import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

export default function Header() {
  console.log("test");
  return (
    <header class="header">
      <ul class="header_item">
        <Link to='home'>
          <li class="header_item_list">打刻</li>
        </Link>
        <Link to='attendancepage'>
          <li class="header_item_list">勤怠一覧</li>
        </Link>
        <li class="header_item_list">社員名</li>

      </ul>
    </header>
  )
}
