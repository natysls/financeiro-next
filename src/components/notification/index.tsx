"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { removeNotification } from "../../store/notificationSlice";

export default function Notification() {
  const dispatch = useDispatch<AppDispatch>();
  const notifications = useSelector((state: RootState) => state.notification.list);

  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        dispatch(removeNotification(notifications[0].id));
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [notifications, dispatch]);

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`px-4 py-2 rounded shadow-md text-white ${
            n.type === "success"
              ? "bg-green-500"
              : n.type === "error"
              ? "bg-red-500"
              : "bg-blue-500"
          }`}
        >
          {n.message}
        </div>
      ))}
    </div>
  );
}
