"use client";
import React from "react";
import Link from "next/link";
import { X } from "lucide-react";
const SearchFormReset = () => {
  const reset = () => {
    const form = document.querySelector(".search-form");

    if (form) {
      form.reset();
    }
  };
  return (
    <button type="reset" onClick={reset} className="search-button">
      <Link href="/articles" className="search-btn text-white">
        <X className="size-5" />
      </Link>
    </button>
  );
};

export default SearchFormReset;
