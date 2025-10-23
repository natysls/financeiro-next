"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

interface FloatingInputProps {
  readonly id?: string;
  readonly label: string;
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly isPassword?: boolean;
  readonly type?: string; // opcional, caso queira forçar "email", "number", etc.
}

export default function FloatingInput({
  id,
  label,
  value,
  onChange,
  isPassword = false,
  type = "text",
}: FloatingInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  useEffect(() => {
    setHasValue(value.trim().length > 0);
  }, [value]);

  return (
    <div className="relative w-full">
      <input
        id={id}
        type={inputType}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={label}
        className="peer w-full border border-gray-300 rounded-md px-3 pt-5 pb-2 text-sm 
                   placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 
                   focus:border-blue-500"
      />
      <label
        htmlFor={id}
        className={`absolute left-3 text-gray-500 text-sm transition-all duration-200
          ${hasValue ? "top-1 text-xs text-blue-500" : "top-3.5 text-base text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500"}
        `}
      >
        {label}
      </label>

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  );
}
